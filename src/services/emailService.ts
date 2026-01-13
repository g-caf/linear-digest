import sgMail from '@sendgrid/mail';
import { env } from '../config/env.js';

let initialized = false;

function initSendGrid() {
  if (!initialized) {
    sgMail.setApiKey(env.SENDGRID_API_KEY);
    initialized = true;
  }
}

export async function sendDigestEmail(to: string, subject: string, htmlBody: string): Promise<void> {
  initSendGrid();
  await sgMail.send({
    to,
    from: env.EMAIL_FROM,
    subject,
    html: htmlBody,
  });
}
