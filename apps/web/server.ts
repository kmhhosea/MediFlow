import { createServer } from 'http';
import next from 'next';
import { createSignalingServer } from './src/server/telehealth-ws';

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => handle(req, res));
  createSignalingServer(server);
  server.listen(3000);
});
