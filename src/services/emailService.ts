import sgMail from '@sendgrid/mail';
import { env } from '../config/env.js';

sgMail.setApiKey(env.SENDGRID_API_KEY);

export async function sendDigestEmail(to: string, subject: string, htmlBody: string): Promise<void> {
  await sgMail.send({
    to,
    from: env.EMAIL_FROM,
    subject,
    html: htmlBody,
  });
}
