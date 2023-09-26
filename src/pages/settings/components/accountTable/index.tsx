import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { Box,  Button, Container, Dialog,ErrorBox, EmptyDataBox, Skeleton, Text,useAlert } from 'components';
import { ACCOUNTS_PAGE_SIZE } from 'constants/index';
import AddAccount, { AddAccountI } from '../addAccount'
import './accounts.scss'
import { FormikHelpers } from 'formik';
import Api from 'types/client';
import { useAuth } from 'contexts/AuthProvider';
import { useAddAccount,useGetAccounts } from 'hooks/queries/accounts';
import AccountRow from '../accountRow';

interface Props {
    user: Api.AdminI | undefined;
    data:Api.Accounts.GetAccounts.AccountI[];
    isTableLoading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: AxiosError<Api.Responses.Error, any> | null;
    refetch: () => void;
}

const AccountTable=({ user ,data, isTableLoading, error, refetch}: Props)=>{

    const [showModal, setShowModal] = useState(false);

    const alert = useAlert();
    const { token } = useAuth();
    const { mutate, isLoading } = useAddAccount({
        onSuccess: () => {
          alert({
            message: 'Personal Information updated'
          });
    
          handleCloseModal();
        },
        onError: (error) => {
        console.log(error)
          alert({
            type: 'ERROR',
            message: error.response?.data.message || 'Something went wrong'
          });
        }
      });

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const handleSubmit = (values: AddAccountI, _formikHelpers: FormikHelpers<AddAccountI>) => {
      const payload: Api.Accounts.AddAccount.Request = {
        id: values.id,
        userId: values.userId,
        currency: values.currency,
        accountNo: values.accountNo,
        accountName: values.accountName,
        bankName:values.bankName,
        bankCode: values.bankCode,
        logo: values.logo,
        status: values.status,
        dateCreated: values.dateCreated,
        dateUpdated: values.dateUpdated
      };
      mutate(payload);
    };

    return (
        <>
            <Box className='add'>
                <Button onClick={handleOpenModal}>Add Account</Button>
            </Box>
            <Box className='accountTable'>
                <Box className='accountTable_tableHead'>
                    <Box className='accountTable_tableHeadItem'>Banner</Box>
                    <Box className='accountTable_tableHeadItem'>Bank</Box>
                    <Box className='accountTable_tableHeadItem'>Account Name</Box>
                    <Box className='accountTable_tableHeadItem'>Account Number</Box>
                    <Box className='accountTable_tableHeadItem'>Currency</Box>
                    <Box className='accountTable_tableHeadItem'>Bank Code</Box>
                </Box>
                {!isTableLoading && error && <ErrorBox handleRetry={refetch} />}
                {!error && (
                  <>
                    {isTableLoading && (
                      <Box className="accounts__skeletonBox">
                        {[...Array(ACCOUNTS_PAGE_SIZE)].map((item, index) => (
                          <Skeleton key={index} className="accounts__skeleton" />
                        ))}
                      </Box>
                    )}
                    {!isTableLoading && data.length
                      ? data.map((item, index) => <AccountRow item={item} key={index} />)
                      : ''}
        
                    {!isTableLoading && !data.length ? <EmptyDataBox /> : ''}
                  </>
                )}
            </Box>
            
            <Dialog handleClose={handleCloseModal} state={showModal} header="Add Bank Account">
            <AddAccount isLoading={isLoading} handleSubmit={handleSubmit} user={user} />
            </Dialog>
        </>
    );
}
export default AccountTable;