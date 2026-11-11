import { PhonesFieldInput } from '@/object-record/record-field/ui/meta-types/input/components/PhonesFieldInput';
import {
  clickElsewhere,
  openFieldInputOfRecordWithoutValue,
} from '@/object-record/record-field/ui/meta-types/input/components/__tests__/utils/openFieldInputOfRecordWithoutValue';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FieldMetadataType } from '~/generated-metadata/graphql';

const openPhoneInputOfContactWithoutNumber = () =>
  openFieldInputOfRecordWithoutValue(
    {
      type: FieldMetadataType.PHONES,
      defaultValue: { primaryPhoneCountryCode: "'SE'" },
    },
    <PhonesFieldInput />,
  );

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
