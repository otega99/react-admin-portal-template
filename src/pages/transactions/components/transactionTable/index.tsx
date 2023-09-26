import { AxiosError } from 'axios';
import { Box, EmptyDataBox, ErrorBox, PaginationBackend, Skeleton, Text } from 'components';
import { TRANSACTIONS_PAGE_SIZE } from 'constants/index';
import { usePaginationBackend } from 'hooks';
import React, { useState } from 'react';
import Api from 'types/client';
import TransactionRow from '../transactionRow';
import SortIcon from '../sort.svg'

interface Props {
  data: Api.Transactions.GetTransactions.TransactionI[] | undefined;
  pageInfo: Api.PageInfo | undefined;
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: AxiosError<Api.Responses.Error, any> | null;
  refetch: () => void;
}

const TransactionTable: React.FC<Props> = ({ data, isLoading, pageInfo, error, refetch }) => {
  const [sort, setSort] = useState<{
    column: string;
    direction: 'asc' | 'desc';
  }>({ column: '', direction: 'asc' });

  const handleSort = (column: string) => {
    if (sort.column === column) {
      setSort({ ...sort, direction: sort.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      setSort({ column, direction: 'asc' });
    }
  };

  const sortedData =
    data &&
    [...data].sort((a, b) => {
      let comparison = 0;
      switch (sort.column) {
        case 'Name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'Sell':
          comparison = a.sell.localeCompare(b.sell);
          break;
        case 'Buy':
          comparison = a.buy.localeCompare(b.buy);
          break;
        default:
          break;
      }
      return sort.direction === 'asc' ? comparison : -comparison;
    });

  const { handlePageRoute } = usePaginationBackend({});


  return (
    <>
      <Box className="transactions__table">
        <Box className="transactions__tableHead">
          <Text variant="caption" className="transactions__tableHeadItem">
            Name
            <img src={SortIcon} onClick={() => handleSort('Name')} />
          </Text>
          <Text variant="caption" className="transactions__tableHeadItem">
            Payment ID
          </Text>
          <Text variant="caption" className="transactions__tableHeadItem">
            Sell
            <img src={SortIcon} onClick={() => handleSort('Sell')} />
          </Text>
          <Text variant="caption" className="transactions__tableHeadItem">
            Buy
            <img src={SortIcon} onClick={() => handleSort('Buy')} />
          </Text>
          <Text variant="caption" className="transactions__tableHeadItem">
            Amount
          </Text>
          <Text variant="caption" className="transactions__tableHeadItem">
            Rate
          </Text>
          <Text variant="caption" className="transactions__tableHeadItem">
            Status
          </Text>
        </Box>
        {!isLoading && error && <ErrorBox handleRetry={refetch} />}
        {!error && (
          <>
            {isLoading && (
              <Box className="transactions__skeletonBox">
                {[...Array(TRANSACTIONS_PAGE_SIZE)].map((item, index) => (
                  <Skeleton key={index} className="transactions__skeleton" />
                ))}
              </Box>
            )}
            {!isLoading && data && data.length
              ? (sortedData ? sortedData.map((item, index) => <TransactionRow item={item} key={index} />) 
              : data.map((item, index) => <TransactionRow item={item} key={index} />))
              : ''} 
              
            {!isLoading && data && !data.length ? <EmptyDataBox /> : ''}
          </>
        )}
      </Box>
      <Box className="transactions__pagination">
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
