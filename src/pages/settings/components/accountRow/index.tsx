import React from 'react';
import Api from 'types/client';
import { Box, StatusBox, Text } from 'components';
import './accountRow.scss'

interface Props{
    item: Api.Accounts.GetAccounts.AccountI
}

const AccountRow :React.FC<Props>=({item})=>{
    return (
        <Box className="accountRow">
        <Text variant="caption" className="accountRow__item">
            {item.logo}
        </Text>
        <Text variant="caption" className="accountRow__item">
            {item.bankName}
        </Text>
        <Text variant="caption" className="accountRow__item">
            {item.accountName}
        </Text>
        <Text variant="caption" className="accountRow__item">
            {item.accountNo}
        </Text>
        <Text variant="caption" className="accountRow__item">
            {item.currency}
        </Text>
        <Text variant="caption" className="accountRow__item">
            {item.bankCode}
        </Text>
        </Box>
  );
}

export default AccountRow