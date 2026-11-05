import { type FieldRichTextValue } from '@/object-record/record-field/ui/types/FieldMetadata';

export type SimpleModeNote = {
  id: string;
  title: string | null;
  bodyV2: FieldRichTextValue | null;
  createdAt: string;
  createdBy: { name: string | null } | null;
};
