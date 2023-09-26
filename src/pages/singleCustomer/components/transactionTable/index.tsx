import { AxiosError } from 'axios';
import { Box, EmptyDataBox, ErrorBox, PaginationBackend } from 'components';
import { TRANSACTIONS_PAGE_SIZE } from 'constants/index';
import { usePaginationBackend } from 'hooks';
import React from 'react';
import Api from 'types/client';
import TransactionRow from '../transactionRow';
import './transactionTable.scss';

interface Props {
  pageInfo: Api.PageInfo | undefined;
  data: Api.Transactions.GetTransactionsByOwnerId.TransactionI[] | undefined;
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: AxiosError<Api.Responses.Error, any> | null;
  refetch: () => void;
}

const TransactionTable: React.FC<Props> = ({ data, pageInfo, isLoading, error, refetch }) => {
  const { handlePageRoute } = usePaginationBackend({});
  return (
    <>
      <Box className="scTransactions__table">
        <Box className="scTransactions__tableHead">
          <Box className="scTransactions__tableHeadItem">Description</Box>
          <Box className="scTransactions__tableHeadItem">Payment ID</Box>
          <Box className="scTransactions__tableHeadItem">Sell</Box>
          <Box className="scTransactions__tableHeadItem">Buy</Box>
          <Box className="scTransactions__tableHeadItem">Amount</Box>
          <Box className="scTransactions__tableHeadItem">Rate</Box>
          <Box className="scTransactions__tableHeadItem">Status</Box>
        </Box>
        {!isLoading && error && <ErrorBox handleRetry={refetch} />}
        {!error && (
          <>
            {!isLoading && data && data.length
              ? data.map((item, index) => <TransactionRow item={item} key={index} />)
              : ''}
            {!isLoading && data && !data.length ? <EmptyDataBox /> : ''}
          </>
        )}
      </Box>
      <Box className="scTransactions__pagination">
        <PaginationBackend
          currentPage={pageInfo?.currentPage || 1}
          currentPageFunc={handlePageRoute}
          dataLength={pageInfo?.totalCount || 0}
          isLoading={isLoading}
          postsPerPage={TRANSACTIONS_PAGE_SIZE}
        />
      </Box>
    </>
  );
};

export default TransactionTable;
