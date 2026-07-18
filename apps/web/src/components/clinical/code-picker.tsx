'use client';
import { Command, CommandInput, CommandList, CommandItem } from '@/components/ui/command';

export function CodePicker({ type, onSelect }: { type: 'icd10' | 'cpt'; onSelect: (code: string) => void }) {
  return (
    <Command>
      <CommandInput placeholder={`Search ${type.toUpperCase()} codes...`} />
      <CommandList>{/* filtered results */}</CommandList>
    </Command>
  );
}
