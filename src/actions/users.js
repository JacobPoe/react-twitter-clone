export const RECEIVE_USERS = 'RECEIVE_TWEETS';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}
