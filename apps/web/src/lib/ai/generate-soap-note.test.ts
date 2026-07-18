import { describe, it, expect, vi } from 'vitest';
vi.mock('ai', () => ({ generateObject: vi.fn().mockResolvedValue({ object: { subjective: 's', objective: 'o', assessment: 'a', plan: 'p' } }) }));
import { generateSoapNote } from './generate-soap-note';

it('returns all four SOAP fields', async () => {
  const note = await generateSoapNote('patient reports mild headache...');
  expect(Object.keys(note)).toEqual(['subjective', 'objective', 'assessment', 'plan']);
});
