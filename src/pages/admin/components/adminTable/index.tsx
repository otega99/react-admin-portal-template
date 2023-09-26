import { AxiosError } from 'axios';
import { Box, EmptyDataBox, ErrorBox, PaginationBackend, Skeleton } from 'components';
import { ADMINS_PAGE_SIZE } from 'constants/index';
import { usePaginationBackend } from 'hooks';
import React, { useState } from 'react';
import Api from 'types/client';
import AdminRow from '../adminRow';
import './adminTable.scss';

interface Props {
  data: Api.AdminI[] | undefined;
  isLoading: boolean;
  pageInfo: Api.PageInfo | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: AxiosError<Api.Responses.Error, any> | null;
  refetch: () => void;

}

const AdminTable: React.FC<Props> = ({ data, isLoading, pageInfo, error, refetch }) => {

  const [objects, setObjects] = useState(data);

  const orderby = (item: string) => {
    
    const sortedItems = data?.sort((a, b) => a.lastName.localeCompare(b.lastName));


  }
  const { handlePageRoute } = usePaginationBackend({});
  return (
    <>
      <Box className="adminTable__table">
        <Box className="adminTable__tableHead">
          <Box className="adminTable__tableHeadItem">Name</Box>
          <Box className="adminTable__tableHeadItem">Email</Box>
          <Box className="adminTable__tableHeadItem">Phone</Box>
          <Box className="adminTable__tableHeadItem">Role</Box>
          <Box className="adminTable__tableHeadItem">Last Logged</Box>
        </Box>
        {!isLoading && error && <ErrorBox handleRetry={refetch} />}
        {!error && (
          <>
            {isLoading && (
              <Box className="adminTable__skeletonBox">
                {[...Array(ADMINS_PAGE_SIZE)].map((item, index) => (
                  <Skeleton key={index} className="adminTable__skeleton" />
                ))}
              </Box>
            )}
            {!isLoading && data && data.length
              ? data.map((item, index) => (
                  <AdminRow id={item.id.toString()} item={item} key={index} />
                ))
              : ''}
            {!isLoading && data && !data.length ? <EmptyDataBox /> : ''}
          </>
        )}
      </Box>
      <Box className="adminTable__pagination">
        <PaginationBackend
          currentPage={pageInfo?.currentPage || 1}
          currentPageFunc={handlePageRoute}
          dataLength={pageInfo?.totalCount || 0}
          isLoading={isLoading}
          postsPerPage={ADMINS_PAGE_SIZE}
        />
      </Box>
    </>
  );
};

export default AdminTable;
