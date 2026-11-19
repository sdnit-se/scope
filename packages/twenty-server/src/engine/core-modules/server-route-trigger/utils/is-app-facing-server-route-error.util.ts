import { ServerRouteTriggerException } from 'src/engine/core-modules/server-route-trigger/exceptions/server-route-trigger.exception';

export const isAppFacingServerRouteError = (
  error: unknown,
): error is ServerRouteTriggerException =>
  error instanceof ServerRouteTriggerException;
