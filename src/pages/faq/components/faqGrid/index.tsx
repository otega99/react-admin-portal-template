import { AxiosError } from 'axios';
import { Box, EmptyDataBox, ErrorBox, PaginationBackend, Skeleton } from 'components';
import { FAQ_PAGE_SIZE } from 'constants/index';
import { usePaginationBackend } from 'hooks';
import React from 'react';
import Api from 'types/client';
import FaqCard from '../faqCard';

interface Props {
  data: Api.Faq.FaqData[];
  pageInfo: Api.PageInfo | undefined;
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: AxiosError<Api.Responses.Error, any> | null;
  refetch: () => void;
}

const FaqGrid: React.FC<Props> = ({ data, pageInfo, isLoading, error, refetch }) => {
  const { handlePageRoute } = usePaginationBackend({});

  return (
    <>
      <Box className="faq__grid">
        {!isLoading && error && (
          <Box className="faq__error">
            <ErrorBox handleRetry={refetch} />
          </Box>
        )}
        {!error && (
          <>
            {isLoading && (
              <>
                {[...Array(FAQ_PAGE_SIZE)].map((item, index) => (
                  <Skeleton key={index} className="faq__skeleton" />
                ))}
              </>
            )}
            {!isLoading && data && data.length
              ? data.map((item, index) => <FaqCard key={index} item={item} />)
              : ''}
            {!isLoading && data && !data.length ? (
              <Box className="faq__emptyBox">
                <EmptyDataBox />
              </Box>
            ) : (
              ''
            )}
          </>
        )}
      </Box>
      <Box className="faq__pagination">
        <PaginationBackend
          currentPage={pageInfo?.currentPage || 1}
          currentPageFunc={handlePageRoute}
          dataLength={pageInfo?.totalCount || 0}
          isLoading={isLoading}
          postsPerPage={FAQ_PAGE_SIZE}
        />
      </Box>
    </>
  );
};

export default FaqGrid;
