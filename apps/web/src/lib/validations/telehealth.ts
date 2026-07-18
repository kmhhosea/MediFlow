import { z } from 'zod';

export const signalMessageSchema = z.object({
  type: z.enum(['offer', 'answer', 'ice-candidate', 'chat']),
  payload: z.unknown(),
});
