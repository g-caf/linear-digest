import { teammates } from '../config/teammates.js';
import { sendDigestForTeammate } from '../services/digestService.js';
import { logger } from '../services/logger.js';

export async function runDailyDigestJob(): Promise<void> {
  const activeTeammates = teammates.filter(t => t.active);
  logger.info(`Starting daily digest job for ${activeTeammates.length} teammates`);

  for (const teammate of activeTeammates) {
    try {
      const result = await sendDigestForTeammate(teammate);
      logger.info(`Sent digest to ${teammate.name}: ${result.issueCount} issues`);
    } catch (error) {
      logger.error({ message: `Failed to send digest to ${teammate.name}`, error: String(error) });
    }
  }

  logger.info('Daily digest job completed');
}
