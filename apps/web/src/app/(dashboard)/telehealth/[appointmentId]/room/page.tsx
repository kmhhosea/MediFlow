'use client';
import { useRef, useEffect } from 'react';
import { useWebRtcRoom } from '@/hooks/use-webrtc-room';

function VideoTile({ stream }: { stream?: MediaStream }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current && stream) videoRef.current.srcObject = stream;
  }, [stream]);
  return <video ref={videoRef} autoPlay className="w-full h-full bg-black" />;
}

export default function VisitRoomPage({ params }: any) {
  const { remoteStream } = useWebRtcRoom(params.appointmentId);
  return (
    <div className="grid grid-cols-[1fr_360px] h-screen">
      <VideoTile stream={remoteStream} />
      {/* ClinicalNoteEditor mounted here once built in Module 9 */}
    </div>
  );
}
