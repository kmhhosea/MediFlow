import { anthropic } from '@ai-sdk/anthropic';

export const scribeModel = anthropic('claude-sonnet-4-6');

export const SCRIBE_SYSTEM_PROMPT = `You are a clinical documentation assistant. Produce a SOAP note using only information present in the transcript. Never invent vitals, diagnoses, or findings that were not stated.`;
