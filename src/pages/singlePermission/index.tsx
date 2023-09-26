import { Box, Container, Skeleton, Text } from 'components';
import { CUSTOMERS_PAGE_SIZE } from 'constants/index';
import { useAuth } from 'contexts/AuthProvider';
import { usePaginationBackend, useGetCustomers } from 'hooks';
import { ContentMgtLayout } from 'layouts';
import React from 'react';
import './singlepermission.scss';

export interface CustomersI {
  name: string;
  email: string;
  phone: string;
  registeredDate: string;
  lastLogged: string;
  image: string;
}

const SinglePermission = () => {
  const { page } = usePaginationBackend({
    updateFromQuery: true
  });

  const { token } = useAuth();

  const { data, isLoading, error, refetch } = useGetCustomers({
    PageNumber: Number(page) || 1,
    PageSize: CUSTOMERS_PAGE_SIZE,
    token
  });
  return (
    <ContentMgtLayout header="Permissions">
      <Box className="customers">
        <Container className="customers__container">
          <Box className="customers__head">
            <Text as="h2" variant="h5" className="customers__header">
              Permissions {isLoading && <Skeleton className="customers__headSkeleton" />}
              {!isLoading && data && <span>({data?.pageInfo.totalCount})</span>}
            </Text>
          </Box>
        </Container>
      </Box>
    </ContentMgtLayout>
  );
};

export default SinglePermission;
