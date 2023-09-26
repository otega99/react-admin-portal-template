import { AxiosError } from 'axios';
import { Box, EmptyDataBox, ErrorBox, PaginationBackend, Skeleton } from 'components';
import { CUSTOMERS_PAGE_SIZE } from 'constants/index';
import { usePaginationBackend } from 'hooks';
import React from 'react';
import Api from 'types/client';
import CustomerRow from '../customerRow';

interface Props {
  data: Api.Customers.Customer[];
  pageInfo: Api.PageInfo | undefined;
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: AxiosError<Api.Responses.Error, any> | null;
  refetch: () => void;
}

const CustomersTable: React.FC<Props> = ({ data, isLoading, pageInfo, error, refetch }) => {
  const { handlePageRoute } = usePaginationBackend({});
  return (
    <>
      <Box className="customers__table">
        <Box className="customers__tableHead">
          <Box className="customers__tableHeadItem">Name</Box>
          <Box className="customers__tableHeadItem">Email</Box>
          <Box className="customers__tableHeadItem">Phone</Box>
          <Box className="customers__tableHeadItem">Registered Date</Box>
          <Box className="customers__tableHeadItem">Last Logged</Box>
        </Box>
        {!isLoading && error && <ErrorBox handleRetry={refetch} />}
        {!error && (
          <>
            {isLoading && (
              <Box className="customers__skeletons">
                {[...Array(CUSTOMERS_PAGE_SIZE)].map((item, index) => (
                  <Skeleton key={index} className="currencies__skeleton" />
                ))}
              </Box>
            )}
            {!isLoading && data.length
              ? data.map((item, index) => <CustomerRow item={item} key={index} />)
              : ''}

            {!isLoading && !data.length ? <EmptyDataBox /> : ''}
          </>
        )}
      </Box>
      <Box className="customers__pagination">
        <PaginationBackend
          currentPage={pageInfo?.currentPage || 1}
          currentPageFunc={handlePageRoute}
          dataLength={pageInfo?.totalCount || 0}
          isLoading={isLoading}
          postsPerPage={CUSTOMERS_PAGE_SIZE}
        />
      </Box>
    </>
  );
};

export default CustomersTable;
