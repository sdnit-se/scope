import { renderHook } from '@testing-library/react';

import { useLoadRecordIndexStates } from '@/object-record/record-index/hooks/useLoadRecordIndexStates';
import { anyFieldFilterValueComponentState } from '@/object-record/record-filter/states/anyFieldFilterValueComponentState';
import { recordIndexGroupLoadLimitComponentState } from '@/object-record/record-index/states/recordIndexGroupLoadLimitComponentState';
import { jotaiStore } from '@/ui/utilities/state/jotai/jotaiStore';
import { DEFAULT_VIEW_GROUP_LOAD_LIMIT } from 'twenty-shared/constants';
import { loadedViewFiltersComponentFamilyState } from '@/views/states/loadedViewFiltersComponentFamilyState';
import { type View } from '@/views/types/View';
import { ViewFilterOperand } from 'twenty-shared/types';
import { act } from 'react';
import { ViewType, ViewVisibility } from '~/generated-metadata/graphql';
import { getJestMetadataAndApolloMocksWrapper } from '~/testing/jest/getJestMetadataAndApolloMocksWrapper';
import { getMockObjectMetadataItemOrThrow } from '~/testing/utils/getMockObjectMetadataItemOrThrow';

const recordIndexId = 'record-table-widget-record-index-id';
const objectMetadataItem = getMockObjectMetadataItemOrThrow('company');

// View-scoped states resolve against the wrapper's ViewComponentInstanceContext, not recordIndexId
const viewInstanceId = 'instanceId';

const makeView = (
  anyFieldFilterValue: string | null,
  groupLoadLimit: number = DEFAULT_VIEW_GROUP_LOAD_LIMIT,
): View => ({
  id: 'view-id',
  name: 'Widget view',
  type: ViewType.TABLE,
  objectMetadataId: objectMetadataItem.id,
  isCompact: false,
  viewFields: [],
  viewGroups: [],
  viewFilters: [],
  viewFilterGroups: [],
  viewSorts: [],
  shouldHideEmptyGroups: false,
  groupLoadLimit,
  position: 0,
  icon: 'IconTable',
  anyFieldFilterValue,
  visibility: ViewVisibility.WORKSPACE,
  isActive: true,
});

const renderUseLoadRecordIndexStates = () =>
  renderHook(() => useLoadRecordIndexStates(), {
    wrapper: getJestMetadataAndApolloMocksWrapper({
      apolloMocks: [],
      objectMetadataItems: [objectMetadataItem],
    }),
  });

describe('useLoadRecordIndexStates', () => {
  it('records the saved filters the record filters were loaded from', () => {
    const { result } = renderUseLoadRecordIndexStates();
    const viewFilters = [
      {
        id: 'filter-id',
        fieldMetadataId: objectMetadataItem.fields[0].id,
        operand: ViewFilterOperand.CONTAINS,
        value: 'saved',
      },
    ];

    act(() => {
      result.current.loadRecordIndexStates(
        { ...makeView(null), viewFilters },
        objectMetadataItem,
        {
          skipGlobalIndexStates: true,
          recordIndexId,
        },
      );
    });

    expect(
      jotaiStore.get(
        loadedViewFiltersComponentFamilyState.atomFamily({
          instanceId: recordIndexId,
          familyKey: { viewId: 'view-id' },
        }),
      ),
    ).toEqual(viewFilters);
  });

  it('hydrates the scoped any-field filter from the loaded view', () => {
    const { result } = renderUseLoadRecordIndexStates();

    act(() => {
      result.current.loadRecordIndexStates(
        makeView('Acme'),
        objectMetadataItem,
        {
          skipGlobalIndexStates: true,
          recordIndexId,
        },
      );
    });

    expect(
      jotaiStore.get(
        anyFieldFilterValueComponentState.atomFamily({
          instanceId: recordIndexId,
        }),
      ),
    ).toBe('Acme');
  });

  it('clears a stale scoped any-field filter when the loaded view has none', () => {
    const anyFieldFilterValueAtom =
      anyFieldFilterValueComponentState.atomFamily({
        instanceId: recordIndexId,
      });

    const { result } = renderUseLoadRecordIndexStates();

    act(() => {
      jotaiStore.set(anyFieldFilterValueAtom, 'stale value');
      result.current.loadRecordIndexStates(makeView(null), objectMetadataItem, {
        skipGlobalIndexStates: true,
        recordIndexId,
      });
    });

    expect(jotaiStore.get(anyFieldFilterValueAtom)).toBe('');
  });

  it('hydrates the group load limit from the loaded view', () => {
    const { result } = renderUseLoadRecordIndexStates();

    act(() => {
      result.current.loadRecordIndexStates(
        makeView(null, 50),
        objectMetadataItem,
        {
          skipGlobalIndexStates: true,
          recordIndexId,
        },
      );
    });

    expect(
      jotaiStore.get(
        recordIndexGroupLoadLimitComponentState.atomFamily({
          instanceId: viewInstanceId,
        }),
      ),
    ).toBe(50);
  });

  it('falls back to the default group load limit when the view has none', () => {
    const { result } = renderUseLoadRecordIndexStates();

    const viewWithoutGroupLoadLimit = {
      ...makeView(null),
      groupLoadLimit: undefined,
    };

    act(() => {
      result.current.loadRecordIndexStates(
        viewWithoutGroupLoadLimit,
        objectMetadataItem,
        {
          skipGlobalIndexStates: true,
          recordIndexId,
        },
      );
    });

    expect(
      jotaiStore.get(
        recordIndexGroupLoadLimitComponentState.atomFamily({
          instanceId: viewInstanceId,
        }),
      ),
    ).toBe(DEFAULT_VIEW_GROUP_LOAD_LIMIT);
  });
});
