import { FieldContext } from '@/object-record/record-field/ui/contexts/FieldContext';
import { FieldInputEventContext } from '@/object-record/record-field/ui/contexts/FieldInputEventContext';
import { PhonesFieldInput } from '@/object-record/record-field/ui/meta-types/input/components/PhonesFieldInput';
import { RecordFieldComponentInstanceContext } from '@/object-record/record-field/ui/states/contexts/RecordFieldComponentInstanceContext';
import { usePushFocusItemToFocusStack } from '@/ui/utilities/focus/hooks/usePushFocusItemToFocusStack';
import { FocusComponentType } from '@/ui/utilities/focus/types/FocusComponentType';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createStore, Provider } from 'jotai';
import { useEffect } from 'react';
import { FieldMetadataType } from '~/generated-metadata/graphql';
import { messages } from '~/locales/generated/sv-SE';

i18n.load({ 'sv-SE': messages });
i18n.activate('sv-SE');

const INSTANCE_ID = 'phones-field-input';

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

const openPhoneInputOfContactWithoutNumber = () => {
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
                fieldMetadataId: 'phones',
                label: 'Telefon',
                type: FieldMetadataType.PHONES,
                iconName: 'IconPhone',
                metadata: { fieldName: 'phones' },
                defaultValue: { primaryPhoneCountryCode: "'SE'" },
              },
              recordId: 'person-id',
              isLabelIdentifier: false,
              isRecordFieldReadOnly: false,
            }}
          >
            <FieldInputEventContext.Provider
              value={{ onSubmit, onClickOutside }}
            >
              <OpenedFieldInputFocusEffect />
              <PhonesFieldInput />
            </FieldInputEventContext.Provider>
          </FieldContext.Provider>
        </RecordFieldComponentInstanceContext.Provider>
        <button>Elsewhere</button>
      </Provider>
    </I18nProvider>,
  );

  return { onSubmit, onClickOutside, input: screen.getByRole('textbox') };
};

const clickElsewhere = () =>
  userEvent.click(screen.getByRole('button', { name: 'Elsewhere' }));

const savedPhone = (number: string, callingCode = '+46', country = 'SE') => ({
  primaryPhoneNumber: number,
  primaryPhoneCallingCode: callingCode,
  primaryPhoneCountryCode: country,
  additionalPhones: [],
});

describe.each([
  { entered: 'typed', enter: userEvent.type },
  {
    entered: 'pasted',
    enter: (_input: Element, text: string) => userEvent.paste(text),
  },
])('a number $entered into the emptied field', ({ enter }) => {
  it.each([
    { text: '0701234567', saved: savedPhone('701234567') },
    { text: '070-123 45 67', saved: savedPhone('701234567') },
    { text: '08-123 456 78', saved: savedPhone('812345678') },
    { text: '+46 70 123 45 67', saved: savedPhone('701234567') },
    { text: '+33 6 42 64 62 74', saved: savedPhone('642646274', '+33', 'FR') },
  ])(
    'saves $text when the seller clicks elsewhere',
    async ({ text, saved }) => {
      const { input, onClickOutside } = openPhoneInputOfContactWithoutNumber();

      await userEvent.clear(input);
      await enter(input, text);
      await clickElsewhere();

      expect(onClickOutside).toHaveBeenCalledWith(
        expect.objectContaining({ newValue: saved }),
      );
    },
  );
});

it('saves the typed number from the Spara button on a contact with no number', async () => {
  const { input, onSubmit } = openPhoneInputOfContactWithoutNumber();

  await userEvent.type(input, '0701234567');
  await userEvent.click(screen.getByRole('button', { name: 'Spara' }));

  expect(onSubmit).toHaveBeenCalledWith({
    newValue: savedPhone('701234567'),
    skipClose: true,
  });
});

it('keeps a number that is one digit short in the field and says why it was refused', async () => {
  const { input, onSubmit, onClickOutside } =
    openPhoneInputOfContactWithoutNumber();

  await userEvent.clear(input);
  await userEvent.type(input, '070123456');
  await clickElsewhere();

  expect(
    screen.getByText(
      'Numret är inte ett giltigt telefonnummer. Kontrollera siffrorna.',
    ),
  ).toBeVisible();
  expect(input).toHaveValue('070-123 45 6');
  expect(onSubmit).not.toHaveBeenCalled();
  expect(onClickOutside).not.toHaveBeenCalled();
});
