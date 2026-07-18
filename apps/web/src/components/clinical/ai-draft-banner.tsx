'use client';
export function AiDraftBanner({ draft, onApply }: any) {
  if (!draft) return null;
  return (
    <div className="bg-brand-50 border p-3 flex justify-between">
      <span>An AI-drafted note is ready for your review.</span>
      <button onClick={() => onApply(draft)}>Apply Draft</button>
    </div>
  );
}
