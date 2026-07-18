'use client';
import form from 'next/dist/client/form';
import { useState } from 'react';
import { text } from 'stream/consumers';

function ChatInput({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState('');
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSend(text); setText(''); }}>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  );
}

export function CallChat({ send, messages }: any) {
  return (
    <div className="flex flex-col">
      {messages.map((m: any, i: number) => <p key={i}>{m.text}</p>)}
      <ChatInput onSend={(text) => send({ type: 'chat', payload: { text } })} />
    </div>
  );
}
