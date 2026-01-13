const requiredEnvVars = [
  'PORT',
  'CRON_SECRET',
  'LINEAR_API_KEY',
  'TWILIO_ACCOUNT_SID',
  'TWILIO_AUTH_TOKEN',
  'TWILIO_FROM_NUMBER',
  'SENDGRID_API_KEY',
  'EMAIL_FROM',
] as const;

type EnvVarName = (typeof requiredEnvVars)[number];

function getEnvVar(name: EnvVarName): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function validateEnv(): Record<EnvVarName, string> {
  const missing: string[] = [];

  for (const name of requiredEnvVars) {
    if (!process.env[name]) {
      missing.push(name);
    }
  }

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return {
    PORT: getEnvVar('PORT'),
    CRON_SECRET: getEnvVar('CRON_SECRET'),
    LINEAR_API_KEY: getEnvVar('LINEAR_API_KEY'),
    TWILIO_ACCOUNT_SID: getEnvVar('TWILIO_ACCOUNT_SID'),
    TWILIO_AUTH_TOKEN: getEnvVar('TWILIO_AUTH_TOKEN'),
    TWILIO_FROM_NUMBER: getEnvVar('TWILIO_FROM_NUMBER'),
    SENDGRID_API_KEY: getEnvVar('SENDGRID_API_KEY'),
    EMAIL_FROM: getEnvVar('EMAIL_FROM'),
  };
}

export const env = validateEnv();
