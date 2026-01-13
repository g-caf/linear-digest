const requiredEnvVars = [
  'CRON_SECRET',
  'LINEAR_API_KEY',
  'TWILIO_ACCOUNT_SID',
  'TWILIO_AUTH_TOKEN',
  'TWILIO_FROM_NUMBER',
  'RESEND_API_KEY',
  'EMAIL_FROM',
  'DATABASE_URL',
] as const;

type EnvVarName = (typeof requiredEnvVars)[number] | 'PORT';

function getEnvVar(name: EnvVarName, required = true): string {
  const value = process.env[name];
  if (!value && required) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value || '';
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
    PORT: process.env.PORT || '3000',
    CRON_SECRET: getEnvVar('CRON_SECRET'),
    LINEAR_API_KEY: getEnvVar('LINEAR_API_KEY'),
    TWILIO_ACCOUNT_SID: getEnvVar('TWILIO_ACCOUNT_SID'),
    TWILIO_AUTH_TOKEN: getEnvVar('TWILIO_AUTH_TOKEN'),
    TWILIO_FROM_NUMBER: getEnvVar('TWILIO_FROM_NUMBER'),
    RESEND_API_KEY: getEnvVar('RESEND_API_KEY'),
    EMAIL_FROM: getEnvVar('EMAIL_FROM'),
    DATABASE_URL: getEnvVar('DATABASE_URL'),
  };
}

export const env = validateEnv();
