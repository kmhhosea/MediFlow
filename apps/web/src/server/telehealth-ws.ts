import { WebSocketServer } from 'ws';

export function createSignalingServer(server: import('http').Server) {
  const wss = new WebSocketServer({ server, path: '/ws/telehealth' });
  const rooms = new Map<string, Set<WebSocket>>();
  wss.on('connection', (ws, req) => {
    const roomId = new URL(req.url!, 'http://x').searchParams.get('room')!;
    (rooms.get(roomId) ?? rooms.set(roomId, new Set()).get(roomId)!).add(ws);
    ws.on('message', (msg) => {
      for (const peer of rooms.get(roomId) ?? []) if (peer !== ws) peer.send(msg.toString());
    });
  });
}
