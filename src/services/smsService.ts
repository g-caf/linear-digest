import twilio from 'twilio';
import { env } from '../config/env.js';

let client: ReturnType<typeof twilio> | null = null;

function getClient() {
  if (!client) {
    client = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
  }
  return client;
}

export async function sendDigestSms(to: string, body: string): Promise<void> {
  await getClient().messages.create({
    to,
    from: env.TWILIO_FROM_NUMBER,
    body,
  });
}
