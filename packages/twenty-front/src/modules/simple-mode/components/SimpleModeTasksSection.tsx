import { styled } from '@linaria/react';
import { isNonEmptyString } from '@sniptt/guards';
import { Temporal } from 'temporal-polyfill';
import { useState } from 'react';
import { CoreObjectNameSingular } from 'twenty-shared/types';
import { isDefined } from 'twenty-shared/utils';
import { Button, Checkbox } from 'twenty-ui/primitives/input';
import { themeCssVariables } from 'twenty-ui/theme';

import { currentWorkspaceMemberState } from '@/auth/states/currentWorkspaceMemberState';
import { useCreateOneRecord } from '@/object-record/hooks/useCreateOneRecord';
import { useFindManyRecords } from '@/object-record/hooks/useFindManyRecords';
import { useUpdateOneRecord } from '@/object-record/hooks/useUpdateOneRecord';
import { type ObjectRecord } from '@/object-record/types/ObjectRecord';
import { SimpleModeInlineForm } from '@/simple-mode/components/SimpleModeInlineForm';
import {
  StyledSimpleModeEmpty,
  SimpleModeRecordRow,
  StyledSimpleModeRowList,
} from '@/simple-mode/components/SimpleModeRows';
import { SimpleModeSection } from '@/simple-mode/components/SimpleModeSection';
import { SIMPLE_MODE_LABELS } from '@/simple-mode/constants/SimpleModeLabels';
import { type SimpleModeNoteTarget } from '@/simple-mode/types/SimpleModeNoteTarget';
import { getMiddayInstant } from '@/simple-mode/utils/getMiddayInstant';
import { useUserTimezone } from '@/ui/input/components/internal/date/hooks/useUserTimezone';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { getToastOptionsFromError } from '@/error-handler/utils/getToastOptionsFromError';
import { useToast } from 'twenty-ui/components/feedback';

const StyledCheckbox = styled.span`
  display: flex;
  padding-right: ${themeCssVariables.spacing[1]};
`;

type Task = ObjectRecord & {
  title: string | null;
  status: string | null;
  dueAt: string | null;
};

type TaskTarget = ObjectRecord & { task: Task | null };

type SimpleModeTasksSectionProps = {
  target: SimpleModeNoteTarget;
};

const TASK_TARGET_FIELD_NAME = {
  targetCompanyId: 'targetCompanyId',
  targetPersonId: 'targetPersonId',
} as const;

// Open tasks first, then by due date; a new task is the signed-in person's and is linked to this record.
export const SimpleModeTasksSection = ({
  target,
}: SimpleModeTasksSectionProps) => {
  const currentWorkspaceMember = useAtomStateValue(currentWorkspaceMemberState);
  const { userTimezone } = useUserTimezone();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [pendingTask, setPendingTask] = useState<ObjectRecord | null>(null);

  const { records, loading, refetch, hasNextPage, fetchMoreRecords } =
    useFindManyRecords<TaskTarget>({
      objectNameSingular: CoreObjectNameSingular.TaskTarget,
      filter: {
        [TASK_TARGET_FIELD_NAME[target.noteTargetFieldName]]: {
          eq: target.recordId,
        },
      },
      recordGqlFields: {
        id: true,
        task: { id: true, title: true, status: true, dueAt: true },
      },
      limit: 60,
      fetchPolicy: 'network-only',
    });

  const tasks = records
    .map((record) => record.task)
    .filter(isDefined)
    .filter(
      (task, index, all) =>
        all.findIndex((other) => other.id === task.id) === index,
    )
    .toSorted(
      (left, right) =>
        Number(left.status === 'DONE') - Number(right.status === 'DONE') ||
        (left.dueAt ?? '9999').localeCompare(right.dueAt ?? '9999'),
    );

  const { createOneRecord: createTask } = useCreateOneRecord({
    objectNameSingular: CoreObjectNameSingular.Task,
  });
  const { createOneRecord: createTaskTarget } = useCreateOneRecord({
    objectNameSingular: CoreObjectNameSingular.TaskTarget,
  });
  const { updateOneRecord } = useUpdateOneRecord();
  const { enqueueToast } = useToast();

  const handleCreate = async (values: Record<string, string>) => {
    const fields = {
      title: values.title ?? '',
      dueAt: isNonEmptyString(values.dueAt)
        ? getMiddayInstant(values.dueAt, userTimezone)
        : null,
    };

    // A retry after a failed link updates the task already created instead of making a second one.
    const task = isDefined(pendingTask)
      ? ((await updateOneRecord({
          objectNameSingular: CoreObjectNameSingular.Task,
          idToUpdate: pendingTask.id,
          updateOneRecordInput: fields,
        })) ?? pendingTask)
      : await createTask({
          ...fields,
          status: 'TODO',
          ...(isDefined(currentWorkspaceMember)
            ? { assigneeId: currentWorkspaceMember.id }
            : {}),
        });

    setPendingTask(task);
    await createTaskTarget({
      taskId: task.id,
      [target.noteTargetFieldName]: target.recordId,
    });
    setPendingTask(null);
    setIsFormOpen(false);
    void refetch();
  };

  const handleToggleDone = async (task: Task) => {
    try {
      await updateOneRecord({
        objectNameSingular: CoreObjectNameSingular.Task,
        idToUpdate: task.id,
        updateOneRecordInput: {
          status: task.status === 'DONE' ? 'TODO' : 'DONE',
        },
      });
      void refetch();
    } catch (error) {
      enqueueToast(getToastOptionsFromError({ error }));
    }
  };

  return (
    <SimpleModeSection
      title={SIMPLE_MODE_LABELS.tasks}
      action={
        !isFormOpen && (
          <Button
            size="md"
            variant="outline"
            onClick={() => setIsFormOpen(true)}
          >
            {SIMPLE_MODE_LABELS.newTask}
          </Button>
        )
      }
    >
      {isFormOpen && (
        <SimpleModeInlineForm
          fields={[
            {
              name: 'title',
              label: SIMPLE_MODE_LABELS.taskTitle,
              isRequired: true,
            },
            { name: 'dueAt', label: SIMPLE_MODE_LABELS.dueAt, type: 'date' },
          ]}
          onSubmit={handleCreate}
          onCancel={() => {
            setPendingTask(null);
            setIsFormOpen(false);
          }}
        />
      )}
      {!loading && tasks.length === 0 ? (
        <StyledSimpleModeEmpty>
          {SIMPLE_MODE_LABELS.noTasks}
        </StyledSimpleModeEmpty>
      ) : (
        <StyledSimpleModeRowList>
          {tasks.map((task) => (
            <SimpleModeRecordRow
              key={task.id}
              objectNameSingular={CoreObjectNameSingular.Task}
              recordId={task.id}
              label={task.title ?? ''}
              detail={
                task.dueAt
                  ? `${SIMPLE_MODE_LABELS.dueAt} ${Temporal.Instant.from(task.dueAt).toZonedDateTimeISO(userTimezone).toPlainDate().toString()}`
                  : undefined
              }
              leading={
                <StyledCheckbox>
                  <Checkbox
                    checked={task.status === 'DONE'}
                    aria-label={SIMPLE_MODE_LABELS.markDone}
                    onCheckedChange={() => void handleToggleDone(task)}
                  />
                </StyledCheckbox>
              }
            />
          ))}
        </StyledSimpleModeRowList>
      )}
      {hasNextPage && (
        <Button
          size="md"
          variant="ghost"
          onClick={() => void fetchMoreRecords()}
        >
          {SIMPLE_MODE_LABELS.showMore}
        </Button>
      )}
    </SimpleModeSection>
  );
};
