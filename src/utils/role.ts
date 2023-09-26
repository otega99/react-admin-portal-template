export type Role = 0 | 1;
export const specifyRole = (role: Role) => {
  if (role === 1) {
    return 'Super Administrator';
  } else if (role === 0) {
    return 'Administrator';
  }
};
