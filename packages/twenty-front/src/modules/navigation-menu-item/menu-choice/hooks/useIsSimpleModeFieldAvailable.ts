import { MENU_CHOICE_OBJECT_NAME_SINGULAR } from '@/navigation-menu-item/menu-choice/constants/MenuChoiceObjectNameSingular';
import { SIMPLE_MODE_FIELD_NAME } from '@/navigation-menu-item/menu-choice/constants/SimpleModeFieldName';
import { useObjectMetadataItems } from '@/object-metadata/hooks/useObjectMetadataItems';

// The field arrives with an application release; until then the menu choice loads without it.
export const useIsSimpleModeFieldAvailable = () => {
  const { objectMetadataItems } = useObjectMetadataItems();

  return objectMetadataItems.some(
    (item) =>
      item.nameSingular === MENU_CHOICE_OBJECT_NAME_SINGULAR &&
      item.fields.some((field) => field.name === SIMPLE_MODE_FIELD_NAME),
  );
};
