import { generateObject } from 'ai';
import { scribeModel, SCRIBE_SYSTEM_PROMPT } from './anthropic-client';
import { z } from 'zod';

const soapSchema = z.object({ subjective: z.string(), objective: z.string(), assessment: z.string(), plan: z.string() });

export async function generateSoapNote(transcript: string) {
  const { object } = await generateObject({
    model: scribeModel,
    system: SCRIBE_SYSTEM_PROMPT,
    schema: soapSchema,
    prompt: transcript,
  });
  return object;
}
