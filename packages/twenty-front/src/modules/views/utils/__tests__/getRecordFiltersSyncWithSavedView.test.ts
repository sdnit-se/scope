import { type ViewFilter } from '@/views/types/ViewFilter';
import { getRecordFiltersSyncWithSavedView } from '@/views/utils/getRecordFiltersSyncWithSavedView';
import { ViewFilterOperand } from 'twenty-shared/types';

const ownerFilter = (value: string): ViewFilter => ({
  id: 'filter-1',
  fieldMetadataId: 'owner-field',
  operand: ViewFilterOperand.CONTAINS,
  value,
});

describe('getRecordFiltersSyncWithSavedView', () => {
  it('follows the saved filters when the page loaded a stale copy without them', () => {
    expect(
      getRecordFiltersSyncWithSavedView({
        loadedViewFilters: [],
        savedViewFilters: [ownerFilter('second')],
        viewFiltersFromCurrentRecordFilters: [],
      }),
    ).toBe('follow');
  });

  it('follows a changed saved value while the user has not edited the filters', () => {
    expect(
      getRecordFiltersSyncWithSavedView({
        loadedViewFilters: [ownerFilter('first')],
        savedViewFilters: [ownerFilter('second')],
        viewFiltersFromCurrentRecordFilters: [ownerFilter('first')],
      }),
    ).toBe('follow');
  });

  it('follows a saved filter that was removed', () => {
    expect(
      getRecordFiltersSyncWithSavedView({
        loadedViewFilters: [ownerFilter('first')],
        savedViewFilters: [],
        viewFiltersFromCurrentRecordFilters: [ownerFilter('first')],
      }),
    ).toBe('follow');
  });

  it('keeps an unsaved change when the saved filters change underneath it', () => {
    expect(
      getRecordFiltersSyncWithSavedView({
        loadedViewFilters: [ownerFilter('first')],
        savedViewFilters: [ownerFilter('second')],
        viewFiltersFromCurrentRecordFilters: [ownerFilter('draft')],
      }),
    ).toBe('keep-unsaved');
  });

  it('keeps an unsaved removal when the saved filters change underneath it', () => {
    expect(
      getRecordFiltersSyncWithSavedView({
        loadedViewFilters: [ownerFilter('first')],
        savedViewFilters: [ownerFilter('second')],
        viewFiltersFromCurrentRecordFilters: [],
      }),
    ).toBe('keep-unsaved');
  });

  it('does nothing while the saved filters are the ones the page loaded', () => {
    expect(
      getRecordFiltersSyncWithSavedView({
        loadedViewFilters: [ownerFilter('first')],
        savedViewFilters: [{ ...ownerFilter('first'), displayValue: 'first' }],
        viewFiltersFromCurrentRecordFilters: [ownerFilter('draft')],
      }),
    ).toBe('none');
  });

  it('does nothing when it is unknown what the record filters were loaded from', () => {
    expect(
      getRecordFiltersSyncWithSavedView({
        loadedViewFilters: undefined,
        savedViewFilters: [ownerFilter('second')],
        viewFiltersFromCurrentRecordFilters: [],
      }),
    ).toBe('none');
  });
});
