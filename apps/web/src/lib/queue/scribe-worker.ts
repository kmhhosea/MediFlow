import { Worker } from 'bullmq';
import { connection } from './redis-connection';
import { generateSoapNote } from '@/lib/ai/generate-soap-note';
import { getStoredTranscript } from '@/lib/data/transcripts';
import { db } from '@/lib/db';

new Worker('scribe', async (job) => {
  const { appointmentId } = job.data;
  const transcript = await getStoredTranscript(appointmentId);
  const draft = await generateSoapNote(transcript);
  await db.clinicalNote.update({ where: { appointmentId }, data: { aiDraftText: JSON.stringify(draft) } });
}, { connection });
