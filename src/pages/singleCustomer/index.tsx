import { Box, BreadCrumbBox, Container, Text } from 'components';
import { TRANSACTIONS_PAGE_SIZE } from 'constants/index';
import { useAuth } from 'contexts/AuthProvider';
import { useGetTransactionsByOwnerId, usePaginationBackend } from 'hooks';
import { useGetCustomerById } from 'hooks';
import { ContentMgtLayout } from 'layouts';
import { Path } from 'navigations/routes';
import React from 'react';
import { useParams } from 'react-router-dom';
// import Activities from './components/activities';
import InfoSection from './components/infoSection';
import TransactionTable from './components/transactionTable';
import './singleCustomer.scss';

export interface TransactionI {
  description: string;
  paymentId: string;
  sell: string;
  buy: string;
  amount: string;
  rate: string;
  status: string;
}

const SingleCustomer = () => {
  const params = useParams<{ id: string }>();
  const { token } = useAuth();
  const { page } = usePaginationBackend({
    updateFromQuery: true
  });

  const {
    data: customer,
    isLoading: customerLoading,
    error: customerError,
    refetch: refetchCustomer
  } = useGetCustomerById({
    id: params.id || '',
    token
  });
  const {
    data,
    isLoading: transactionsLoading,
    error: transactionsError,
    refetch: refetchTransactions
  } = useGetTransactionsByOwnerId({
    id: params.id || '',
    PageNumber: Number(page) || 1,
    PageSize: TRANSACTIONS_PAGE_SIZE,
    token
  });
  return (
    <ContentMgtLayout backPath={Path.Customers} isPrevBtn header="Customers">
      <Box className="singleCustomer">
        <Container className="singleCustomer__container">
          <Box className="singleCustomer__head">
            <BreadCrumbBox
              firstTextLink={Path.Customers}
              firstText="Customer"
              secondText={customer?.data.name || ''}
              isLoading={customerLoading}
            />
          </Box>
          <Box className="singleCustomer__info">
            <InfoSection
              error={customerError}
              refetch={refetchCustomer}
              customer={customer}
              isLoading={customerLoading}
            />
            {/* <Activities /> */}
          </Box>
          <Box>
            <Text as="h6" variant="h6" className="singleCustomer__header">
              Transactions
            </Text>
            <TransactionTable
              isLoading={transactionsLoading}
              pageInfo={data?.pageInfo}
              data={data?.data}
              error={transactionsError}
              refetch={refetchTransactions}
            />
          </Box>
        </Container>
      </Box>
    </ContentMgtLayout>
  );
};

export default SingleCustomer;
