# Linear Digest

A service that sends daily digest notifications (via email and SMS) summarizing Linear activity for your team.

## Setup

### Environment Variables

Set the following environment variables:

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (e.g., `3000`) |
| `CRON_SECRET` | Secret token to authenticate cron job requests |
| `LINEAR_API_KEY` | Your Linear API key |
| `TWILIO_ACCOUNT_SID` | Twilio account SID for SMS |
| `TWILIO_AUTH_TOKEN` | Twilio auth token |
| `TWILIO_FROM_NUMBER` | Twilio phone number to send SMS from (E.164 format) |
| `SENDGRID_API_KEY` | SendGrid API key for emails |
| `EMAIL_FROM` | Email address to send from |

### Adding Teammates

Edit `src/config/teammates.ts` and add your teammates to the array:

```typescript
export const teammates: Teammate[] = [
  {
    id: 'teammate-1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    phoneE164: '+15551234567',
    linearUserId: 'your-linear-user-id',
    active: true,
  },
];
```

## Development

```bash
npm install
npm run dev
```

## Deploy to Render

1. Push this repository to GitHub
2. Create a new Blueprint on Render and connect your repo
3. Render will use `render.yaml` to configure the web service and cron job
4. Add all required environment variables in the Render dashboard
5. Update the cron job URL in `render.yaml` with your actual Render service URL
