import { FieldContext } from '@/object-record/record-field/ui/contexts/FieldContext';
import { FieldInputEventContext } from '@/object-record/record-field/ui/contexts/FieldInputEventContext';
import { RecordFieldComponentInstanceContext } from '@/object-record/record-field/ui/states/contexts/RecordFieldComponentInstanceContext';
import { type FieldDefinition } from '@/object-record/record-field/ui/types/FieldDefinition';
import { type FieldMetadata } from '@/object-record/record-field/ui/types/FieldMetadata';
import { usePushFocusItemToFocusStack } from '@/ui/utilities/focus/hooks/usePushFocusItemToFocusStack';
import { FocusComponentType } from '@/ui/utilities/focus/types/FocusComponentType';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createStore, Provider } from 'jotai';
import { type ReactNode, useEffect } from 'react';
import { ToastProvider } from 'twenty-ui/components/feedback';
import { messages } from '~/locales/generated/sv-SE';

i18n.load({ 'sv-SE': messages });
i18n.activate('sv-SE');

const INSTANCE_ID = 'field-input';

const OpenedFieldInputFocusEffect = () => {
  const { pushFocusItemToFocusStack } = usePushFocusItemToFocusStack();

  useEffect(() => {
    pushFocusItemToFocusStack({
      focusId: INSTANCE_ID,
      component: {
        type: FocusComponentType.OPENED_FIELD_INPUT,
        instanceId: INSTANCE_ID,
      },
    });
  }, [pushFocusItemToFocusStack]);

  return null;
};

export const openFieldInputOfRecordWithoutValue = (
  field: Pick<FieldDefinition<FieldMetadata>, 'type' | 'defaultValue'>,
  fieldInput: ReactNode,
) => {
  const onSubmit = jest.fn();
  const onClickOutside = jest.fn();

  render(
    <I18nProvider i18n={i18n}>
      <Provider store={createStore()}>
        <RecordFieldComponentInstanceContext.Provider
          value={{ instanceId: INSTANCE_ID }}
        >
          <FieldContext.Provider
            value={{
              fieldDefinition: {
                ...field,
                fieldMetadataId: 'field',
                label: 'Field',
                iconName: 'IconForms',
                metadata: { fieldName: 'field' },
              },
              recordId: 'record-id',
              isLabelIdentifier: false,
              isRecordFieldReadOnly: false,
            }}
          >
            <FieldInputEventContext.Provider
              value={{ onSubmit, onClickOutside }}
            >
              <OpenedFieldInputFocusEffect />
              <ToastProvider>{fieldInput}</ToastProvider>
            </FieldInputEventContext.Provider>
          </FieldContext.Provider>
        </RecordFieldComponentInstanceContext.Provider>
        <button>Elsewhere</button>
      </Provider>
    </I18nProvider>,
  );

  return { onSubmit, onClickOutside, input: screen.getByRole('textbox') };
};

export const clickElsewhere = () =>
  userEvent.click(screen.getByRole('button', { name: 'Elsewhere' }));
