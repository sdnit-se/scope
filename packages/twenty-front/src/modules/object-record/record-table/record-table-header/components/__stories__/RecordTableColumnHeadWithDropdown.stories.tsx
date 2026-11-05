import { RecordTableWithWrappers } from '@/object-record/record-table/components/RecordTableWithWrappers';
import { RecordTableColumnHeadWithDropdown } from '@/object-record/record-table/record-table-header/components/RecordTableColumnHeadWithDropdown';
import { currentRecordFiltersComponentState } from '@/object-record/record-filter/states/currentRecordFiltersComponentState';
import { type RecordFilter } from '@/object-record/record-filter/types/RecordFilter';
import { isRecordTableColumnHeadersReadOnlyComponentState } from '@/object-record/record-table/states/isRecordTableColumnHeadersReadOnlyComponentState';
import { recordTableFocusPositionComponentState } from '@/object-record/record-table/states/recordTableFocusPositionComponentState';
import { jotaiStore } from '@/ui/utilities/state/jotai/jotaiStore';
import { ViewBarDetails } from '@/views/components/ViewBarDetails';
import { ViewFilterOperand } from 'twenty-shared/types';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { graphql, HttpResponse } from 'msw';
import { act } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Button } from 'twenty-ui/primitives/input';
import { ComponentDecorator } from 'twenty-ui/testing';
import { ContextStoreDecorator } from '~/testing/decorators/ContextStoreDecorator';
import { FileUploadDecorator } from '~/testing/decorators/FileUploadDecorator';
import { MemoryRouterDecorator } from '~/testing/decorators/MemoryRouterDecorator';
import { ObjectMetadataItemsDecorator } from '~/testing/decorators/ObjectMetadataItemsDecorator';
import { RecordTableDecorator } from '~/testing/decorators/RecordTableDecorator';
import { ToastDecorator } from '~/testing/decorators/ToastDecorator';
import { graphqlMocks } from '~/testing/graphqlMocks';
import { mockedCompanyRecords } from '~/testing/mock-data/generated/data/companies/mock-companies-data';
import { mockedWorkspaceMemberRecords } from '~/testing/mock-data/generated/data/workspaceMembers/mock-workspaceMembers-data';
import { mockedViews } from '~/testing/mock-data/generated/metadata/views/mock-views-data';
import { getMockFieldMetadataItemOrThrow } from '~/testing/utils/getMockFieldMetadataItemOrThrow';
import { getMockObjectMetadataItemOrThrow } from '~/testing/utils/getMockObjectMetadataItemOrThrow';

const companyView = mockedViews.find((view) => view.name === 'All Companies')!;
const RECORD_INDEX_ID = `companies-${companyView.id}`;

const meta: Meta = {
  title: 'Modules/ObjectRecord/RecordTable/RecordTableColumnHeadWithDropdown',
  component: RecordTableColumnHeadWithDropdown,
  decorators: [
    ComponentDecorator,
    MemoryRouterDecorator,
    FileUploadDecorator,
    RecordTableDecorator,
    ContextStoreDecorator,
    ToastDecorator,
    ObjectMetadataItemsDecorator,
  ],
  render: () => (
    <>
      <Button>Outside table</Button>
      <ViewBarDetails
        viewBarId={RECORD_INDEX_ID}
        objectNamePlural="companies"
      />
      <RecordTableWithWrappers
        recordTableId={RECORD_INDEX_ID}
        viewBarId={RECORD_INDEX_ID}
        objectNameSingular="company"
      />
    </>
  ),
  parameters: {
    recordTableObjectNameSingular: 'company',
    msw: {
      handlers: [
        graphql.query('AggregateCompanies', () =>
          HttpResponse.json({
            data: {
              companies: {
                __typename: 'CompanyConnection',
                totalCount: mockedCompanyRecords.length,
                maxEmployees: 0,
                percentageEmptyLinkedinLink: 0,
                countNotEmptyAddress: 0,
              },
            },
          }),
        ),
        graphql.query('FindOneWorkspaceMember', ({ variables }) =>
          HttpResponse.json({
            data: {
              workspaceMember:
                mockedWorkspaceMemberRecords.find(
                  (record) => record.id === variables.objectRecordId,
                ) ?? null,
            },
          }),
        ),
        ...graphqlMocks.handlers,
      ],
    },
  },
};

export default meta;
type Story = StoryObj;

export const KeyboardOpenAndDismiss: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = await canvas.findByRole('button', { name: 'Domain Name' });
    const scroll = canvasElement.querySelector(
      `#scroll-wrapper-record-table-scroll-${RECORD_INDEX_ID}`,
    );
    const focusState = recordTableFocusPositionComponentState.atomFamily({
      instanceId: RECORD_INDEX_ID,
    });
    const initialFocusPosition = jotaiStore.get(focusState);

    expect(trigger).toHaveAttribute('tabindex', '0');
    trigger.focus();
    await userEvent.keyboard('{ArrowDown}');
    const menu = await body.findByRole('menu');
    expect(jotaiStore.get(focusState)).toEqual(initialFocusPosition);
    expect(scroll).not.toHaveClass('scroll-wrapper-x-enabled');
    expect(scroll).not.toHaveClass('scroll-wrapper-y-enabled');

    expect(menu).toBeVisible();
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(menu).not.toBeInTheDocument());
    expect(scroll).toHaveClass('scroll-wrapper-x-enabled');
    expect(scroll).toHaveClass('scroll-wrapper-y-enabled');

    await userEvent.click(trigger);
    await body.findByRole('menu');
    await userEvent.click(
      canvas.getByRole('button', { name: 'Outside table' }),
    );
    await waitFor(() =>
      expect(body.queryByRole('menu')).not.toBeInTheDocument(),
    );
    expect(scroll).toHaveClass('scroll-wrapper-x-enabled');
    expect(scroll).toHaveClass('scroll-wrapper-y-enabled');

    await userEvent.click(trigger);
    const openMenu = await body.findByRole('menu');
    expect(scroll).not.toHaveClass('scroll-wrapper-x-enabled');
    expect(scroll).not.toHaveClass('scroll-wrapper-y-enabled');
    const readOnlyState =
      isRecordTableColumnHeadersReadOnlyComponentState.atomFamily({
        instanceId: RECORD_INDEX_ID,
      });
    await act(async () => {
      jotaiStore.set(readOnlyState, true);
    });
    await waitFor(() => expect(openMenu).not.toBeInTheDocument());
    expect(trigger).not.toBeInTheDocument();
    expect(scroll).toHaveClass('scroll-wrapper-x-enabled');
    expect(scroll).toHaveClass('scroll-wrapper-y-enabled');

    await act(async () => {
      jotaiStore.set(readOnlyState, false);
    });
    expect(
      await canvas.findByRole('button', {
        name: 'Domain Name',
        expanded: false,
      }),
    ).toBeVisible();
  },
};

export const FilterFromHeader: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = await canvas.findByRole('button', { name: 'Name' });

    // The header opens straight onto the column's filter, its input focused.
    await userEvent.click(trigger);
    const input = await body.findByPlaceholderText('Name');
    await waitFor(() => expect(input).toHaveFocus());
    expect(body.queryByText('Contains')).toBeNull();
    expect(body.queryByRole('menuitem')).toBeNull();
    await userEvent.type(input, 'Acme');
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(input).not.toBeInTheDocument());

    await userEvent.click(trigger);
    const existingInput = await body.findByPlaceholderText('Name');
    expect(existingInput).toHaveValue('Acme');
    expect(canvas.getByText('Reset')).toBeVisible();

    await userEvent.clear(existingInput);
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(existingInput).not.toBeInTheDocument());
    await waitFor(() => expect(canvas.queryByText('Reset')).toBeNull());
  },
};

export const SortFromHeaderArrow: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const findHeaderCell = async (name: string) =>
      (await canvas.findByRole('button', { name, expanded: false })).closest(
        '.header-cell',
      ) as HTMLElement;
    const nameHeader = await findHeaderCell('Name');
    const domainHeader = await findHeaderCell('Domain Name');

    await userEvent.click(
      within(nameHeader).getByRole('button', { name: 'Sort Name ascending' }),
    );
    expect(body.queryByRole('menu')).toBeNull();
    expect(
      await within(nameHeader).findByRole('button', {
        name: 'Sort Name descending',
      }),
    ).toBeVisible();

    await userEvent.click(
      within(domainHeader).getByRole('button', {
        name: 'Sort Domain Name ascending',
      }),
    );
    expect(
      await within(domainHeader).findByRole('button', {
        name: 'Sort Domain Name descending',
      }),
    ).toBeVisible();
    expect(
      within(nameHeader).getByRole('button', { name: 'Sort Name ascending' }),
    ).toBeInTheDocument();
  },
};

export const HeaderLeavesOtherNameFiltersAlone: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = await canvas.findByRole('button', {
      name: 'Name',
      expanded: false,
    });
    const nameField = getMockFieldMetadataItemOrThrow({
      objectMetadataItem: getMockObjectMetadataItemOrThrow('company'),
      fieldName: 'name',
    });
    const savedFilter = (
      id: string,
      operand: ViewFilterOperand,
      value: string,
    ): RecordFilter => ({
      id,
      fieldMetadataId: nameField.id,
      value,
      displayValue: value,
      type: 'TEXT',
      operand,
      label: 'Name',
    });
    const filtersState = currentRecordFiltersComponentState.atomFamily({
      instanceId: RECORD_INDEX_ID,
    });
    const isEmptyFilter = savedFilter(
      'saved-is-empty',
      ViewFilterOperand.IS_EMPTY,
      '',
    );
    const doesNotContainFilter = savedFilter(
      'saved-does-not-contain',
      ViewFilterOperand.DOES_NOT_CONTAIN,
      'Old',
    );
    await act(async () => {
      jotaiStore.set(filtersState, [isEmptyFilter, doesNotContainFilter]);
    });

    await userEvent.click(trigger);
    const input = await body.findByPlaceholderText('Name');
    await waitFor(() => expect(input).toHaveFocus());
    expect(input).toHaveValue('');
    await userEvent.type(input, 'Acme');
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(input).not.toBeInTheDocument());

    const filters = jotaiStore.get(filtersState);
    expect(filters).toContainEqual(isEmptyFilter);
    expect(filters).toContainEqual(doesNotContainFilter);
    expect(filters).toContainEqual(
      expect.objectContaining({
        fieldMetadataId: nameField.id,
        operand: ViewFilterOperand.CONTAINS,
        value: 'Acme',
      }),
    );
  },
};

export const HeaderRelationPickerIgnoresSavedIsNot: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = await canvas.findByRole('button', {
      name: 'Account Owner',
      expanded: false,
    });
    const ownerField = getMockFieldMetadataItemOrThrow({
      objectMetadataItem: getMockObjectMetadataItemOrThrow('company'),
      fieldName: 'accountOwner',
    });
    const excludedMember = mockedWorkspaceMemberRecords[0];
    const filtersState = currentRecordFiltersComponentState.atomFamily({
      instanceId: RECORD_INDEX_ID,
    });
    await act(async () => {
      jotaiStore.set(filtersState, [
        {
          id: 'saved-is-not-owner',
          fieldMetadataId: ownerField.id,
          value: JSON.stringify({
            isCurrentWorkspaceMemberSelected: false,
            selectedRecordIds: [excludedMember.id],
          }),
          displayValue: excludedMember.name.firstName,
          type: 'RELATION',
          operand: ViewFilterOperand.IS_NOT,
          label: 'Account Owner',
        },
      ]);
    });

    await userEvent.click(trigger);
    const excludedOption = await body.findByRole('option', {
      name: new RegExp(excludedMember.name.firstName),
    });
    expect(excludedOption).toHaveAttribute('aria-selected', 'false');
  },
};
