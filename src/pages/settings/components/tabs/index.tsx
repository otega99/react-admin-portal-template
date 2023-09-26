import React,{useState} from 'react'
import { Box, Container, Skeleton, Text, Button } from 'components';
import AccountTable from '../accountTable'
import './tabs.scss'
import { useAuth } from 'contexts/AuthProvider';
import { useGetAccounts } from 'hooks/queries/accounts';

export interface AccountI{
    id: number;
    userId: number;
    currency: string;
    accountNo: string;
    accountName: string;
    bankName: string;
    bankCode: string;
    logo: string,
    status: string;
    dateCreated: string;
    dateUpdated: string;
  }

const Tabs=()=>{
    const { user,token } = useAuth();
    const {
        data,
        isLoading,
        error,
        refetch
      } = useGetAccounts({token});
    const [datalist, setdata] = useState(data?.data);
    return (
        <div className="tabs">
            <input type="radio" className="tabs__radio" name="tabs-example" id="tab1" defaultChecked/>
            <label htmlFor="tab1" className="tabs__label">Bank Accounts</label>
            <div className="tabs__content">
                <AccountTable user={user} 
                error={error}
                refetch={refetch}
                isTableLoading={isLoading}
                data={datalist || []}/>
            </div>
            <input type="radio" className="tabs__radio" name="tabs-example" id="tab2"/>
            <label htmlFor="tab2" className="tabs__label">Mobile Banner</label>
            <div className="tabs__content">
                CONTENT for Tab #2
            </div>
            <input type="radio" className="tabs__radio" name="tabs-example" id="tab3"/>
            <label htmlFor="tab3" className="tabs__label">Push Notification</label>
            <div className="tabs__content">
                CONTENT for Tab #3
            </div>
        </div>
    );

};

export default Tabs;