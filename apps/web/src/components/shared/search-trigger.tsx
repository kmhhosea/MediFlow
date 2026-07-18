'use client';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export function SearchTrigger() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen((o) => !o); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return (
    <>
      <button onClick={() => setOpen(true)}><Search size={16} /> Search</button>
      {/* opens a real CommandPalette once the search module (Module 18) builds one */}
    </>
  );
}