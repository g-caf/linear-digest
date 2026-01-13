import { env } from '../config/env.js';

export interface LinearIssue {
  identifier: string;
  title: string;
  dueDate: string | null;
  url: string;
  stateName: string;
}

interface LinearGraphQLResponse {
  data?: {
    issues: {
      nodes: Array<{
        identifier: string;
        title: string;
        dueDate: string | null;
        url: string;
        state: { name: string };
      }>;
    };
  };
  errors?: Array<{ message: string }>;
}

export async function getOpenIssuesForUser(linearUserId: string): Promise<LinearIssue[]> {
  const query = `
    query GetOpenIssues($userId: ID!) {
      issues(
        filter: {
          assignee: { id: { eq: $userId } }
          completedAt: { null: true }
          canceledAt: { null: true }
        }
        first: 100
      ) {
        nodes {
          identifier
          title
          dueDate
          url
          state {
            name
          }
        }
      }
    }
  `;

  const response = await fetch('https://api.linear.app/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: env.LINEAR_API_KEY,
    },
    body: JSON.stringify({
      query,
      variables: { userId: linearUserId },
    }),
  });

  if (!response.ok) {
    throw new Error(`Linear API request failed: ${response.status} ${response.statusText}`);
  }

  const result: LinearGraphQLResponse = await response.json();

  if (result.errors && result.errors.length > 0) {
    throw new Error(`Linear GraphQL errors: ${result.errors.map((e) => e.message).join(', ')}`);
  }

  if (!result.data) {
    throw new Error('Linear API returned no data');
  }

  return result.data.issues.nodes.map((issue) => ({
    identifier: issue.identifier,
    title: issue.title,
    dueDate: issue.dueDate,
    url: issue.url,
    stateName: issue.state.name,
  }));
}
