import { isDefined, isSafeInternalPath } from 'twenty-shared/utils';
import { z } from 'zod';

const message = z.object({ hostedPage: z.literal(1) });

const hostedPageMessageSchema = z.discriminatedUnion('type', [
  message.extend({ type: z.literal('ready') }),
  message.extend({
    type: z.literal('navigate'),
    path: z.string().refine(isSafeInternalPath),
    replace: z.boolean().default(false),
  }),
  message.extend({ type: z.literal('title'), title: z.string() }),
  message.extend({
    type: z.literal('key'),
    key: z.string(),
    code: z.string(),
    ctrlKey: z.boolean(),
    metaKey: z.boolean(),
    shiftKey: z.boolean(),
    altKey: z.boolean(),
  }),
]);

export const parseHostedPageMessage = (
  event: Pick<MessageEvent, 'data' | 'origin' | 'source'>,
  frameWindow: Window | null | undefined,
): z.infer<typeof hostedPageMessageSchema> | null => {
  if (
    !isDefined(frameWindow) ||
    event.source !== frameWindow ||
    event.origin !== window.location.origin
  ) {
    return null;
  }

  return hostedPageMessageSchema.safeParse(event.data).data ?? null;
};
