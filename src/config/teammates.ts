export interface Teammate {
  id: string;
  name: string;
  email: string;
  phoneE164: string;
  linearUserId: string;
  active?: boolean;
}

// TODO: Fill in your teammates here
export const teammates: Teammate[] = [
  // Example teammate:
  // {
  //   id: 'teammate-1',
  //   name: 'Jane Doe',
  //   email: 'jane@example.com',
  //   phoneE164: '+15551234567',
  //   linearUserId: 'linear-user-id-here',
  //   active: true,
  // },
];
