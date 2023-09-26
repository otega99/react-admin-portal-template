export interface RightsI {
  rightid: string;
  rightname: string;
  status: boolean;
}

export interface PermissionI {
  roleid: string;
  rolename: string;
  authority: string;
  countofusers: number;
  permissions: RightsI[];
}

export const PermissionData: PermissionI[] = [
  {
    roleid: '1',
    rolename: 'Administrator',
    authority: 'Low',
    countofusers: 2,
    permissions: [
      { rightid: '1', rightname: 'Edit Currency', status: false },
      { rightid: '2', rightname: 'View Currency', status: true }
    ]
  },
  {
    roleid: '2',
    rolename: 'Super Admin',
    authority: 'Mid',
    countofusers: 2,
    permissions: [
      { rightid: '1', rightname: 'Edit Currency', status: false },
      { rightid: '2', rightname: 'View Currency', status: true }
    ]
  },
  {
    roleid: '3',
    rolename: 'Manager',
    authority: 'High',
    countofusers: 4,
    permissions: [
      { rightid: '2', rightname: 'Add Currency', status: true },
      { rightid: '1', rightname: 'View Currency', status: false },
      { rightid: '3', rightname: 'Edit Currency', status: false },
      { rightid: '23', rightname: 'Add Admin', status: true },
      { rightid: '4', rightname: 'View Admin', status: true },
      { rightid: '12', rightname: 'Edit Admin', status: false },
      { rightid: '14', rightname: 'Add Permission', status: false },
      { rightid: '33', rightname: 'Edit Permission', status: false },
      { rightid: '42', rightname: 'View Permission', status: true },
      { rightid: '39', rightname: 'Add Customer', status: false },
      { rightid: '28', rightname: 'View Customer', status: true },
      { rightid: '39', rightname: 'Edit Customer', status: false },
      { rightid: '43', rightname: 'Add Referral', status: true },
      { rightid: '47', rightname: 'Edit Referral', status: true },
      { rightid: '41', rightname: 'View Referral', status: true }
    ]
  }
];

export const PermissionDemoData = { data: PermissionData, pageInfo: undefined };
