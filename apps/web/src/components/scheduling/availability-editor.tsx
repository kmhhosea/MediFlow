'use client';
import { useState } from 'react';
import { generateAvailability } from '@/lib/actions/availability.actions';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function AvailabilityEditor({ staffId }: { staffId: string }) {
  const [hours, setHours] = useState<Record<number, { start: string; end: string } | null>>({});
  return (
    <div>
      {DAYS.map((label, i) => (
        <div key={label}>
          <label>
            <input type="checkbox" onChange={(e) => setHours((h) => ({ ...h, [i]: e.target.checked ? { start: '09:00', end: '17:00' } : null }))} />
            {label}
          </label>
        </div>
      ))}
      <button onClick={() => generateAvailability(staffId, hours)}>Save availability</button>
    </div>
  );
}
