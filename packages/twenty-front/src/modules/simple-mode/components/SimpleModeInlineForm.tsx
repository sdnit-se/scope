import { styled } from '@linaria/react';
import { useState, type FormEvent } from 'react';
import { Button } from 'twenty-ui/primitives/input';
import { themeCssVariables } from 'twenty-ui/theme';

import { useSimpleModeTypingFocus } from '@/simple-mode/hooks/useSimpleModeTypingFocus';
import { SIMPLE_MODE_LABELS } from '@/simple-mode/constants/SimpleModeLabels';
import { getToastOptionsFromError } from '@/error-handler/utils/getToastOptionsFromError';
import { useToast } from 'twenty-ui/components/feedback';

const StyledForm = styled.form`
  border: 1px solid ${themeCssVariables.border.color.strong};
  border-radius: ${themeCssVariables.border.radius.md};
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[2]};
  padding: ${themeCssVariables.spacing[3]};
`;

const StyledLabel = styled.label`
  color: ${themeCssVariables.font.color.primary};
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[1]};
`;

const StyledInput = styled.input`
  border: 1px solid ${themeCssVariables.border.color.strong};
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${themeCssVariables.font.color.primary};
  font-family: inherit;
  font-size: ${themeCssVariables.font.size.lg};
  padding: ${themeCssVariables.spacing[2]};
`;

const StyledActions = styled.div`
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
`;

export type SimpleModeInlineFormField = {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'date';
  isRequired?: boolean;
};

type SimpleModeInlineFormProps = {
  fields: SimpleModeInlineFormField[];
  onSubmit: (values: Record<string, string>) => Promise<void>;
  onCancel: () => void;
};

// The few fields a seller fills in, in the page itself; nothing slides in or opens elsewhere.
export const SimpleModeInlineForm = ({
  fields,
  onSubmit,
  onCancel,
}: SimpleModeInlineFormProps) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const { enqueueToast } = useToast();
  const typingFocus = useSimpleModeTypingFocus(
    `simple-mode-form-${fields.map((field) => field.name).join('-')}`,
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSaving(true);

    // A failed save keeps what was typed and says why.
    try {
      await onSubmit(values);
    } catch (error) {
      enqueueToast(getToastOptionsFromError({ error }));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <StyledForm onSubmit={(event) => void handleSubmit(event)}>
      {fields.map((field, index) => (
        <StyledLabel key={field.name}>
          {field.label}
          <StyledInput
            type={field.type ?? 'text'}
            required={field.isRequired}
            autoFocus={index === 0}
            value={values[field.name] ?? ''}
            onChange={(event) =>
              setValues({ ...values, [field.name]: event.target.value })
            }
            onFocus={typingFocus.onFocus}
            onBlur={typingFocus.onBlur}
          />
        </StyledLabel>
      ))}
      <StyledActions>
        <Button
          type="submit"
          size="md"
          variant="solid"
          color="accent"
          loading={isSaving}
        >
          {SIMPLE_MODE_LABELS.save}
        </Button>
        <Button type="button" size="md" variant="ghost" onClick={onCancel}>
          {SIMPLE_MODE_LABELS.cancel}
        </Button>
      </StyledActions>
    </StyledForm>
  );
};
