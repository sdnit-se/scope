import { useObjectMetadataItems } from '@/object-metadata/hooks/useObjectMetadataItems';
import { CoreObjectNameSingular } from 'twenty-shared/types';

// Activity type is a field of this workspace's application, not of Twenty itself.
export const useIsNoteActivityTypeAvailable = () => {
  const { objectMetadataItems } = useObjectMetadataItems();

  return objectMetadataItems.some(
    (item) =>
      item.nameSingular === CoreObjectNameSingular.Note &&
      item.fields.some((field) => field.name === 'activityType'),
  );
};
