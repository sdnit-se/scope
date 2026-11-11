import { EmailsFieldInput } from '@/object-record/record-field/ui/meta-types/input/components/EmailsFieldInput';
import { LinksFieldInput } from '@/object-record/record-field/ui/meta-types/input/components/LinksFieldInput';
import {
  clickElsewhere,
  openFieldInputOfRecordWithoutValue,
} from '@/object-record/record-field/ui/meta-types/input/components/__tests__/utils/openFieldInputOfRecordWithoutValue';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FieldMetadataType } from '~/generated-metadata/graphql';

const openEmailInput = () =>
  openFieldInputOfRecordWithoutValue(
    { type: FieldMetadataType.EMAILS },
    <EmailsFieldInput />,
  );

const openLinkInput = () =>
  openFieldInputOfRecordWithoutValue(
    { type: FieldMetadataType.LINKS },
    <LinksFieldInput />,
  );

const savedEmail = {
  primaryEmail: 'anna.prov@example.org',
  additionalEmails: [],
};

describe.each([
  {
    field: 'e-mail',
    open: openEmailInput,
    accepted: 'anna.prov@example.org',
    saved: savedEmail,
    refused: 'anna.prov@',
    reason: 'Det är inte en giltig e-postadress. Kontrollera stavningen.',
  },
  {
    field: 'link',
    open: openLinkInput,
    accepted: 'linkedin.com/in/anna-prov',
    saved: {
      primaryLinkUrl: 'linkedin.com/in/anna-prov',
      primaryLinkLabel: null,
      secondaryLinks: [],
    },
    refused: 'anna prov',
    reason: 'Det är inte en giltig webbadress. Kontrollera stavningen.',
  },
])(
  'the $field field of a contact with no value',
  ({ open, accepted, saved, refused, reason }) => {
    it('saves what the seller typed from the Spara button', async () => {
      const { input, onSubmit } = open();

      await userEvent.type(input, accepted);
      await userEvent.click(screen.getByRole('button', { name: 'Spara' }));

      expect(onSubmit).toHaveBeenCalledWith({
        newValue: saved,
        skipClose: true,
      });
    });

    it('keeps a refused value in the field and says why', async () => {
      const { input, onSubmit, onClickOutside } = open();

      await userEvent.type(input, refused);
      await clickElsewhere();

      expect(screen.getByText(reason)).toBeVisible();
      expect(input).toHaveValue(refused);
      expect(onSubmit).not.toHaveBeenCalled();
      expect(onClickOutside).not.toHaveBeenCalled();
    });
  },
);

it.each(['anna.prov@example.org', 'Anna Prov <anna.prov@example.org>'])(
  'saves the address of a pasted %s when the seller clicks elsewhere',
  async (pasted) => {
    const { onClickOutside } = openEmailInput();

    await userEvent.paste(pasted);
    await clickElsewhere();

    expect(onClickOutside).toHaveBeenCalledWith(
      expect.objectContaining({ newValue: savedEmail }),
    );
  },
);

it('refuses a pasted name whose address is not one', async () => {
  const { onClickOutside } = openEmailInput();

  await userEvent.paste('Anna Prov <anna.prov@>');
  await clickElsewhere();

  expect(screen.getByRole('alert')).toBeVisible();
  expect(onClickOutside).not.toHaveBeenCalled();
});
