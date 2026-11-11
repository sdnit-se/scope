import { t } from '@lingui/core/macro';
import { LightButton } from 'twenty-ui/components/input';

type MultiItemFieldSaveButtonProps = {
  onClick: () => void;
};

export const MultiItemFieldSaveButton = ({
  onClick,
}: MultiItemFieldSaveButtonProps) => (
  <LightButton onClick={onClick}>{t`Save`}</LightButton>
);
