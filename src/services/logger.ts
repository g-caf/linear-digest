export const logger = {
  info(obj: object | string): void {
    const entry = {
      level: 'info',
      timestamp: new Date().toISOString(),
      ...(typeof obj === 'string' ? { message: obj } : obj),
    };
    console.log(JSON.stringify(entry));
  },

  warn(obj: object | string): void {
    const entry = {
      level: 'warn',
      timestamp: new Date().toISOString(),
      ...(typeof obj === 'string' ? { message: obj } : obj),
    };
    console.warn(JSON.stringify(entry));
  },

  error(obj: object | string): void {
    const entry = {
      level: 'error',
      timestamp: new Date().toISOString(),
      ...(typeof obj === 'string' ? { message: obj } : obj),
    };
    console.error(JSON.stringify(entry));
  },
};
