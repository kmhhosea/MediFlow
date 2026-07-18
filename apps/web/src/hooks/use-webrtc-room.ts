'use client';
import { useEffect, useRef, useState } from 'react';

export function useWebRtcRoom(roomId: string) {
  const pcRef = useRef<RTCPeerConnection | undefined>(undefined);
  const [localStream, setLocalStream] = useState<MediaStream | undefined>();
  const [remoteStream, setRemoteStream] = useState<MediaStream | undefined>();
  const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  useEffect(() => {
    const ws = new WebSocket(`/ws/telehealth?room=${roomId}`);
    const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
    pcRef.current = pc;
    pc.ontrack = (e) => setRemoteStream(e.streams[0]);
    pc.onconnectionstatechange = () => setStatus(pc.connectionState === 'connected' ? 'connected' : pc.connectionState === 'disconnected' ? 'disconnected' : 'connecting');
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setLocalStream(stream);
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));
    });
    // ...offer/answer negotiation over ws
    return () => { ws.close(); pc.close(); localStream?.getTracks().forEach((t) => t.stop()); };
  }, [roomId]);
  return { localStream, remoteStream, status };
}
