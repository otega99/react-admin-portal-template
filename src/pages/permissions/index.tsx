import { Box, Container, Skeleton, Text, Button, Dialog } from 'components';
import { useAuth } from 'contexts/AuthProvider';
import { usePaginationBackend, useGetCustomers } from 'hooks';
import { ContentMgtLayout } from 'layouts';
import React, { useState } from 'react';
import './permission.scss';
import PermissionCard from './components/permissionCard';
import AddModal from './components/addModal';
import { PermissionDemoData } from './permissionData';
import {  useGetAllRoles } from 'hooks';

const Permissions = () => {
  const { page } = usePaginationBackend({
    updateFromQuery: true
  });
  const [showModal, setShowCancelModal] = useState(false);
  const { token } = useAuth();

  const getData = () => {
    return { data: PermissionDemoData, isLoading: false, error: null, refetch: refetchDemo };
  };
  const refetchDemo = () => {
    console.log('demo');
  };

  const { data, isLoading, error, refetch } = useGetAllRoles(token); // getData();
  /*   useGetCustomers({
    PageNumber: Number(page) || 1,
    PageSize: CUSTOMERS_PAGE_SIZE,
    token
  }); */

  const handleModalOpen = () => {
    setShowCancelModal(true);
  };
  const handleModalClose = () => setShowCancelModal(false);

  const submitAddrole = (formi: any) => {
    console.log('here');
  };

  return (
    <ContentMgtLayout header="Roles & Permissions">
      <Box className="app">
        <Box className="app__head">
          <Text as="h2" variant="h5" className="app__header">
            Roles & Permissions {isLoading && <Skeleton className="app__headSkeleton" />}
          </Text>
          <Button onClick={handleModalOpen}>Add Role</Button>
        </Box>
        <PermissionCard
          error={error}
          refetch={refetch}
          isLoading={isLoading}
          pageInfo={data?.pageInfo}
          data={data?.data || []}
        />
      </Box>
      <Dialog removeCloseBtn header="Add New Role" handleClose={handleModalClose} state={showModal}>
        <AddModal handleCancelSubmit={submitAddrole}></AddModal>
      </Dialog>
    </ContentMgtLayout>
  );
};

export default Permissions;
