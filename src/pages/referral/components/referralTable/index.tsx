import { AxiosError } from 'axios';
import { Box, EmptyDataBox, ErrorBox, PaginationBackend, Skeleton } from 'components';
import { CUSTOMERS_PAGE_SIZE } from 'constants/index';
import { usePaginationBackend } from 'hooks';
import { ReferralI } from 'pages/referral/referralData';
import React from 'react';
import Api from 'types/client';
import ReferralRow from '../referralRow';

interface Props {
  data: ReferralI[];
  pageInfo: Api.PageInfo | undefined;
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: AxiosError<Api.Responses.Error, any> | null;
  refetch: () => void;
}

const ReferralTable: React.FC<Props> = ({ data, isLoading, pageInfo, error, refetch }) => {
  const { handlePageRoute } = usePaginationBackend({});
  return (
    <>
      <Box className="app__table">
        <Box className="app__tableHead">
          <Box className="app__tableHeadItem">Referral Code</Box>
          <Box className="app__tableHeadItem">Transaction Date</Box>
          <Box className="app__tableHeadItem">Amount</Box>
          <Box className="app__tableHeadItem">Referral Bonus</Box>
          <Box className="app__tableHeadItem">Status</Box>
        </Box>
        {!isLoading && error && <ErrorBox handleRetry={refetch} />}
        {!error && (
          <>
            {isLoading && (
              <Box className="app__skeletons">
                {[...Array(CUSTOMERS_PAGE_SIZE)].map((item, index) => (
                  <Skeleton key={index} className="currencies__skeleton" />
                ))}
              </Box>
            )}
            {!isLoading && data.length
              ? data.map((item, index) => <ReferralRow item={item} key={index} />)
              : ''}

            {!isLoading && !data.length ? <EmptyDataBox /> : ''}
          </>
        )}
      </Box>
      <Box className="app__pagination">
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

export default ReferralTable;
