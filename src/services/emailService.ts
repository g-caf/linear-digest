import { Resend } from 'resend';
import { env } from '../config/env.js';

let resend: Resend | null = null;

function getClient() {
  if (!resend) {
    resend = new Resend(env.RESEND_API_KEY);
  }
  return resend;
}

export async function sendDigestEmail(to: string, subject: string, htmlBody: string): Promise<void> {
  await getClient().emails.send({
    to,
    from: env.EMAIL_FROM,
    subject,
    html: htmlBody,
  });
}
