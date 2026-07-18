import { describe, it, expect } from 'vitest';
import { patientSchema } from './patient';

describe('patientSchema', () => {
  it('rejects a future dob', () => {
    const result = patientSchema.safeParse({ firstName: 'A', lastName: 'B', dob: new Date(Date.now() + 86400000), sex: 'other' });
    expect(result.success).toBe(false);
  });
});
