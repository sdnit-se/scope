import { lastShowPageRecordIdState } from '@/object-record/record-field/ui/states/lastShowPageRecordId';
import { recordIndexAllRecordIdsComponentSelector } from '@/object-record/record-index/states/selectors/recordIndexAllRecordIdsComponentSelector';
import { RECORD_TABLE_ROW_HEIGHT } from '@/object-record/record-table/constants/RecordTableRowHeight';
import { useScrollTableToPosition } from '@/object-record/record-table/hooks/useScrollTableToPosition';
import { useProcessScrollTop } from '@/object-record/record-table/virtualization/hooks/useProcessScrollTop';
import { useTriggerFetchPages } from '@/object-record/record-table/virtualization/hooks/useTriggerFetchPages';
import { useTriggerInitialRecordTableDataLoad } from '@/object-record/record-table/virtualization/hooks/useTriggerInitialRecordTableDataLoad';
import { scrollTopToRestoreComponentState } from '@/object-record/record-table/virtualization/states/scrollTopToRestoreComponentState';
import { useScrollWrapperHTMLElement } from '@/ui/utilities/scroll/hooks/useScrollWrapperHTMLElement';
import { useAtomComponentSelectorValue } from '@/ui/utilities/state/jotai/hooks/useAtomComponentSelectorValue';
import { useAtomComponentStateCallbackState } from '@/ui/utilities/state/jotai/hooks/useAtomComponentStateCallbackState';
import { isNonEmptyString } from '@sniptt/guards';
import { useStore } from 'jotai';
import { useEffect, useState } from 'react';
import {
  NavigationType,
  useLocation,
  useNavigationType,
} from 'react-router-dom';
import { isDefined } from 'twenty-shared/utils';

export const RecordTableNoRecordGroupScrollToPreviousRecordEffect = () => {
  const store = useStore();

  const lastShowPageRecordIdAtom = useAtomComponentStateCallbackState(
    lastShowPageRecordIdState,
  );

  const { getScrollWrapperElement, scrollWrapperHTMLElement } =
    useScrollWrapperHTMLElement();

  const allRecordIds = useAtomComponentSelectorValue(
    recordIndexAllRecordIdsComponentSelector,
  );

  const [hasInitializedScroll, setHasInitializedScroll] = useState(false);

  const scrollTopToRestoreAtom = useAtomComponentStateCallbackState(
    scrollTopToRestoreComponentState,
  );

  const navigationType = useNavigationType();
  const { key: historyEntryKey } = useLocation();

  // Only the browser's back and forward buttons return to an old position; a list opened anew is a new history
  // entry and starts at the top.
  const readScrollTopOnReturn = () =>
    navigationType === NavigationType.Pop
      ? store.get(scrollTopToRestoreAtom)[historyEntryKey]
      : undefined;

  const [scrollTopOnReturn, setScrollTopOnReturn] = useState(
    readScrollTopOnReturn,
  );

  // Going from one list to another from the menu keeps this table mounted and switches it to the other list's
  // positions a render later, so coming back is read again once both have changed.
  const [readFor, setReadFor] = useState({
    historyEntryKey,
    scrollTopToRestoreAtom,
  });

  if (
    readFor.historyEntryKey !== historyEntryKey ||
    readFor.scrollTopToRestoreAtom !== scrollTopToRestoreAtom
  ) {
    setReadFor({ historyEntryKey, scrollTopToRestoreAtom });
    setScrollTopOnReturn(readScrollTopOnReturn());
  }

  useEffect(() => {
    if (!isDefined(scrollWrapperHTMLElement)) {
      return;
    }

    const listPathname = window.location.pathname;

    // Opening a record resets the table to the top on its way out; that is not where the person was.
    const rememberScrollTop = () => {
      if (window.location.pathname === listPathname) {
        store.set(scrollTopToRestoreAtom, (scrollTops) => ({
          ...scrollTops,
          [historyEntryKey]: scrollWrapperHTMLElement.scrollTop,
        }));
      }
    };

    scrollWrapperHTMLElement.addEventListener('scroll', rememberScrollTop);

    return () =>
      scrollWrapperHTMLElement.removeEventListener('scroll', rememberScrollTop);
  }, [
    scrollWrapperHTMLElement,
    scrollTopToRestoreAtom,
    store,
    historyEntryKey,
  ]);

  const { scrollTableToPosition } = useScrollTableToPosition();

  const { triggerInitialRecordTableDataLoad } =
    useTriggerInitialRecordTableDataLoad();

  const { processScrollTop } = useProcessScrollTop();

  const { triggerFetchPagesWithoutDebounce } = useTriggerFetchPages();

  useEffect(() => {
    // Read from the store directly: useAtom's useReducer can desync under high-frequency updates.
    const lastShowPageRecordId = store.get(lastShowPageRecordIdAtom);

    if (
      !isNonEmptyString(lastShowPageRecordId) &&
      isDefined(scrollTopOnReturn) &&
      scrollTopOnReturn > 0
    ) {
      const restore = async () => {
        setScrollTopOnReturn(undefined);

        await triggerInitialRecordTableDataLoad();

        scrollTableToPosition({
          horizontalScrollInPx: 0,
          verticalScrollInPx: scrollTopOnReturn,
        });

        processScrollTop(scrollTopOnReturn);

        await triggerFetchPagesWithoutDebounce();
      };

      restore();

      return;
    }

    if (!isNonEmptyString(lastShowPageRecordId)) {
      return;
    }

    const run = async () => {
      store.set(lastShowPageRecordIdAtom, null);

      const recordPosition = allRecordIds.findIndex(
        (recordId) => recordId === lastShowPageRecordId,
      );

      await triggerInitialRecordTableDataLoad();

      const { scrollWrapperElement } = getScrollWrapperElement();

      const tableScrollWrapperHeight = scrollWrapperElement?.clientHeight ?? 0;

      const numberOfRowsDisplayedInTable = Math.min(
        Math.floor(tableScrollWrapperHeight / (RECORD_TABLE_ROW_HEIGHT + 1)),
        30,
      );

      const halfNumberOfRowsVisible = Math.floor(
        numberOfRowsDisplayedInTable / 2,
      );

      const recordPositionInPx = recordPosition * (RECORD_TABLE_ROW_HEIGHT + 1);

      const targetScrollPositionInPx = Math.max(
        0,
        recordPositionInPx -
          halfNumberOfRowsVisible * (RECORD_TABLE_ROW_HEIGHT + 1),
      );

      scrollTableToPosition({
        horizontalScrollInPx: 0,
        verticalScrollInPx: targetScrollPositionInPx,
      });

      processScrollTop(targetScrollPositionInPx);

      setHasInitializedScroll(true);

      await triggerFetchPagesWithoutDebounce();
    };

    run();
  }, [
    store,
    lastShowPageRecordIdAtom,
    hasInitializedScroll,
    scrollTableToPosition,
    allRecordIds,
    triggerInitialRecordTableDataLoad,
    processScrollTop,
    getScrollWrapperElement,
    triggerFetchPagesWithoutDebounce,
    scrollTopOnReturn,
  ]);

  return <></>;
};
