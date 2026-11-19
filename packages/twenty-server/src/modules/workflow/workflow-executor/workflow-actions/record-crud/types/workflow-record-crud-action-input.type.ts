import { type CreateRecordInput } from 'src/engine/core-modules/record-crud/types/record-crud-input.type';

export type WorkflowCreateRecordActionInput = CreateRecordInput;
export type { UpdateRecordInput as WorkflowUpdateRecordActionInput } from 'src/engine/core-modules/record-crud/types/record-crud-input.type';
export type { DeleteRecordInput as WorkflowDeleteRecordActionInput } from 'src/engine/core-modules/record-crud/types/record-crud-input.type';
export type { FindRecordsInput as WorkflowFindRecordsActionInput } from 'src/engine/core-modules/record-crud/types/record-crud-input.type';
export type { UpsertRecordInput as WorkflowUpsertRecordActionInput } from 'src/engine/core-modules/record-crud/types/record-crud-input.type';
