import twilio from 'twilio';
import { env } from '../config/env.js';

const client = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);

export async function sendDigestSms(to: string, body: string): Promise<void> {
  await client.messages.create({
    to,
    from: env.TWILIO_FROM_NUMBER,
    body,
  });
}
