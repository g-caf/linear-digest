import { LinearIssue, getOpenIssuesForUserByEmail } from './linearService.js';
import { sendDigestEmail } from './emailService.js';
import { sendDigestSms } from './smsService.js';
import { Teammate } from '../config/teammates.js';

export async function sendDigestForTeammate(teammate: Teammate): Promise<{ issueCount: number }> {
  const issues = await getOpenIssuesForUserByEmail(teammate.linearEmail);

  const sortedIssues = issues.sort((a, b) => {
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;
    return 0;
  });

  if (sortedIssues.length === 0) {
    const congratsMessage = "Congrats! Inbox zero - you're all caught up!";
    await sendDigestEmail(teammate.email, 'Daily Digest', congratsMessage);
    await sendDigestSms(teammate.phoneE164, congratsMessage);
    return { issueCount: 0 };
  }

  const emailHtml = buildEmailHtml(sortedIssues);
  await sendDigestEmail(teammate.email, 'Daily Digest', emailHtml);

  const smsMessage = buildSmsMessage(sortedIssues);
  await sendDigestSms(teammate.phoneE164, smsMessage);

  return { issueCount: sortedIssues.length };
}

function buildEmailHtml(issues: LinearIssue[]): string {
  const listItems = issues.map(issue => {
    const dueDate = issue.dueDate ? ` - Due: ${issue.dueDate}` : '';
    return `<li><a href="${issue.url}">${issue.identifier}: ${issue.title}</a>${dueDate} [${issue.stateName}]</li>`;
  }).join('\n');

  return `<ul>\n${listItems}\n</ul>`;
}

function buildSmsMessage(issues: LinearIssue[]): string {
  const count = issues.length;
  const top3 = issues.slice(0, 3).map(issue => {
    const truncatedTitle = issue.title.length > 30 ? issue.title.substring(0, 30) + '...' : issue.title;
    return `${issue.identifier}: ${truncatedTitle}`;
  }).join(', ');

  return `You have ${count} open issue${count !== 1 ? 's' : ''}. Top: ${top3}. Check email for full list.`;
}
