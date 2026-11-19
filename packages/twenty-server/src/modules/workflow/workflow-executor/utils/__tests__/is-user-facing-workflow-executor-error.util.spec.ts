import {
  AiException,
  AiExceptionCode,
} from 'src/engine/metadata-modules/ai/ai.exception';
import {
  LogicFunctionException,
  LogicFunctionExceptionCode,
} from 'src/engine/metadata-modules/logic-function/logic-function.exception';
import {
  WorkflowStepExecutorException,
  WorkflowStepExecutorExceptionCode,
} from 'src/modules/workflow/workflow-executor/exceptions/workflow-step-executor.exception';
import { isUserFacingWorkflowExecutorError } from 'src/modules/workflow/workflow-executor/utils/is-user-facing-workflow-executor-error.util';

describe('isUserFacingWorkflowExecutorError', () => {
  it('returns false for internal workflow step executor errors', () => {
    const error = new WorkflowStepExecutorException(
      'Internal error',
      WorkflowStepExecutorExceptionCode.INTERNAL_ERROR,
    );

    expect(isUserFacingWorkflowExecutorError(error)).toBe(false);
  });

  it.each([
    AiExceptionCode.API_KEY_NOT_CONFIGURED,
    AiExceptionCode.INVALID_AGENT_INPUT,
    AiExceptionCode.EVALUATION_MODEL_NOT_FOUND,
    AiExceptionCode.EVALUATION_QUESTION_UNSUPPORTED,
    AiExceptionCode.INVALID_EVALUATION_REQUEST,
  ])('returns true for user-facing AI code %s', (code) => {
    const error = new AiException('Misconfigured step', code);

    expect(isUserFacingWorkflowExecutorError(error)).toBe(true);
  });

  it('returns false for an AI failure the user cannot resolve', () => {
    const error = new AiException(
      'Agent execution failed',
      AiExceptionCode.AGENT_EXECUTION_FAILED,
    );

    expect(isUserFacingWorkflowExecutorError(error)).toBe(false);
  });

  it('returns true for a code step pointing at a function it may not run', () => {
    const error = new LogicFunctionException(
      'Forbidden',
      LogicFunctionExceptionCode.LOGIC_FUNCTION_FORBIDDEN,
    );

    expect(isUserFacingWorkflowExecutorError(error)).toBe(true);
  });

  it('returns false for a logic function failure the user cannot resolve', () => {
    const error = new LogicFunctionException(
      'Not ready',
      LogicFunctionExceptionCode.LOGIC_FUNCTION_NOT_READY,
    );

    expect(isUserFacingWorkflowExecutorError(error)).toBe(false);
  });

  it('returns false for a plain error', () => {
    expect(isUserFacingWorkflowExecutorError(new Error('boom'))).toBe(false);
  });
});
