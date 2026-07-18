'use client';
import { useEffect, useRef, useState } from 'react';

function DevicePreview() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => { if (videoRef.current) videoRef.current.srcObject = stream; })
      .catch(() => setError('Camera/microphone access denied'));
  }, []);
  return error ? <p>{error}</p> : <video ref={videoRef} autoPlay muted className=""w-64 rounded"" />;
}

export default function WaitingRoomPage({ params }: any) {
  return (
    <div>
      <DevicePreview />
      <p>Waiting for your provider to join...</p>
    </div>
  );
}
