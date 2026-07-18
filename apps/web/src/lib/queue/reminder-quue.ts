import { Queue } from 'bullmq';
import { connection } from './redis-connection';

export const reminderQueue = new Queue('appointment-reminder', { connection, defaultJobOptions: { attempts: 3, backoff: { type: 'exponential', delay: 5000 } } });"
