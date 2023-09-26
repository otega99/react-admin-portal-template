export interface ReferralI {
  id: string;
  referralcode: string;
  transactiondate: string;
  amount: string;
  bounus: string;
  status: string;
  transactionid: string;
  customername: string;
  referrername: string;
}

export const ReferralData: ReferralI[] = [
  {
    id: '1',
    referralcode: 'EXDFGH',
    transactiondate: '2022/07/23 08:23:43 AM',
    amount: '300,000',
    bounus: '30,000',
    status: 'pending',
    transactionid: '393462973472347',
    customername: 'Ekpeleka Iwuchukwu',
    referrername: 'My Beloved'
  },
  {
    id: '2',
    referralcode: 'MGHDYH',
    transactiondate: 'May 7th 2021 @ 8:35 am',
    amount: '720,000',
    bounus: '72,000',
    status: 'pending',
    transactionid: '92372894762362',
    customername: 'Martin Agboola',
    referrername: 'Yusuf Ayieola'
  }
];

export const ReferralDemoData = { data: ReferralData, pageInfo: undefined };
