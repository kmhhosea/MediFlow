'use client';
import { useEffect, useRef } from 'react';

export function useVisitTranscript() {
  const bufferRef = useRef('');
  useEffect(() => {
    const rec = new (window as any).webkitSpeechRecognition();
    rec.continuous = true;
    rec.onresult = (e: any) => { bufferRef.current += e.results[e.results.length - 1][0].transcript + ' '; };
    rec.start();
    return () => rec.stop();
  }, []);
  return bufferRef;
}
