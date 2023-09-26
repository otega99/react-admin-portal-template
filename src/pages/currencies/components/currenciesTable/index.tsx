import { AxiosError } from 'axios';
import { Box, EmptyDataBox, ErrorBox, PaginationBackend, Skeleton } from 'components';
import { CURRENCIES_PAGE_SIZE } from 'constants/index';
import { usePaginationBackend } from 'hooks';
import React from 'react';
import Api from 'types/client';
import CurrenciesRow from '../currenciesRow';

interface Props {
  data: Api.Currencies.CurrencyI[];
  pageInfo: Api.PageInfo | undefined;
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: AxiosError<Api.Responses.Error, any> | null;
  refetch: () => void;
}

const CurrenciesTable: React.FC<Props> = ({ data, isLoading, pageInfo, error, refetch }) => {
  const { handlePageRoute } = usePaginationBackend({});
  return (
    <>
      <Box className="currencies__table">
        <Box className="currencies__tableHead">
          <Box className="currencies__tableHeadItem">Type</Box>
          <Box className="currencies__tableHeadItem">Currency</Box>
          <Box className="currencies__tableHeadItem">Date Added</Box>
          <Box className="currencies__tableHeadItem">Buy Rate</Box>
          <Box className="currencies__tableHeadItem">Sell Rate</Box>
          <Box className="currencies__tableHeadItem">Action</Box>
        </Box>
        {!isLoading && error && <ErrorBox handleRetry={refetch} />}
        {!error && (
          <>
            {isLoading && (
              <Box className="currencies__skeletons">
                {[...Array(CURRENCIES_PAGE_SIZE)].map((item, index) => (
                  <Skeleton key={index} className="currencies__skeleton" />
                ))}
              </Box>
            )}
            {!isLoading && data.length
              ? data.map((item, index) => (
                  <CurrenciesRow id={item.id.toString()} item={item} key={index} />
                ))
              : ''}
            {!isLoading && !data.length ? <EmptyDataBox /> : ''}
          </>
        )}
      </Box>
      <Box className="currencies__pagination">
        <PaginationBackend
          currentPage={pageInfo?.currentPage || 1}
          currentPageFunc={handlePageRoute}
          dataLength={pageInfo?.totalCount || 0}
          isLoading={isLoading}
          postsPerPage={CURRENCIES_PAGE_SIZE}
        />
      </Box>
    </>
  );
};

export default CurrenciesTable;
