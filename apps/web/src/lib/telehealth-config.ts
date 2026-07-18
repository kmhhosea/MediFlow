export function getIceServers() {
  return [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: process.env.TURN_SERVER_URL!, username: process.env.TURN_USERNAME, credential: process.env.TURN_CREDENTIAL },
  ];
}
