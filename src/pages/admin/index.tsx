import { Box, Button, Container, Skeleton, Text } from 'components';
import { ADMINS_PAGE_SIZE } from 'constants/index';
import { useAuth } from 'contexts/AuthProvider';
import { useGetAdminUsers, usePaginationBackend } from 'hooks';
import { ContentMgtLayout } from 'layouts';
import { Path } from 'navigations/routes';
import React from 'react';
import './admin.scss';
import AdminTable from './components/adminTable';

export interface AdminI {
  name: string;
  email: string;
  phone: string;
  role: string;
  lastLogged: string;
  image: string;
}

const Admin = () => {
  const { page } = usePaginationBackend({
    updateFromQuery: true
  });
  const { token, user } = useAuth();

  const { data, isLoading, error, refetch } = useGetAdminUsers({
    PageNumber: Number(page) || 1,
    PageSize: ADMINS_PAGE_SIZE,
    token
  });
  return (
    <ContentMgtLayout header="Admin">
      <Box className="admin">
        <Container className="admin__container">
          <Box className="admin__head">
            <Text as="h2" variant="h5" className="admin__header">
              All Admin {isLoading && <Skeleton className="admin__headSkeleton" />}
              {!isLoading && data && <span>({data?.pageInfo.totalCount})</span>}
            </Text>
            <Button as="link" to={`${Path.Admin}/add`}>
              Add Admin
            </Button>
          </Box>
          <AdminTable
            error={error}
            refetch={refetch}
            pageInfo={data?.pageInfo}
            isLoading={isLoading}
            data={data?.data}
          />
        </Container>
      </Box>
    </ContentMgtLayout>
  );
};

export default Admin;
