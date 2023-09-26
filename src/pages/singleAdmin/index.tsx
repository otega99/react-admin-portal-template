import { blockIcon, deleteIcon } from 'assets';
import { Box, BreadCrumbBox, Button, Container, Dialog, useAlert } from 'components';
import { useAuth } from 'contexts/AuthProvider';
import { useBlockAdmin, useDeleteAdmin, useGetSingleAdmin, useUnBlockAdmin } from 'hooks';
import { ContentMgtLayout } from 'layouts';
import { Path } from 'navigations/routes';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import Activities from './components/activities';
import AdminDetails from './components/adminDetails';
import ModalBox from './components/modalBox';
import './singleAdmin.scss';

const SingleAdmin = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [showBlock, setShowBlock] = useState(false);

  const alert = useAlert();
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleOpenBlock = () => setShowBlock(true);
  const handleCloseBlock = () => setShowBlock(false);

  const handleOpenDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);

  const { token, user } = useAuth();
  const { data, isLoading, refetch, error } = useGetSingleAdmin({
    id: params.id || '',
    token
  });

  const { mutate: blockMutate, isLoading: blockLoading } = useBlockAdmin({
    onSuccess: () => {
      alert({
        message: 'Admin blocked Successfully'
      });
      refetch();
      handleCloseBlock();
    }
  });

  const { mutate: unBlockMutate, isLoading: unBlockLoading } = useUnBlockAdmin({
    onSuccess: () => {
      alert({
        message: 'Admin Unblocked Successfully'
      });
      refetch();
      handleCloseBlock();
    }
  });

  const { mutate: deleteMutate, isLoading: deleteLoading } = useDeleteAdmin({
    onSuccess: () => {
      alert({
        message: 'Admin deleted Successfully'
      });
      refetch();
      handleCloseDelete();

      navigate(Path.Admin);
    }
  });

  const handleBlock = () => {
    blockMutate({
      id: params.id || '',
      token
    });
  };

  const handleUnBlock = () => {
    unBlockMutate({
      id: params.id || '',
      token
    });
  };

  const handleDelete = () => {
    deleteMutate({
      id: params.id || '',
      token
    });
  };

  return (
    <ContentMgtLayout header="Admin" backPath={Path.Admin} isPrevBtn>
      <Box className="singleAdmin">
        <Container>
          <Box className="singleAdmin__head">
            <BreadCrumbBox
              firstTextLink={Path.Admin}
              firstText="Admin"
              secondText={data ? `${data?.data.firstName} ${data?.data.lastName}` : ''}
              isLoading={isLoading}
            />
          </Box>
          {user?.role === 1 && (
            <Box className="singleAdmin__btnDiv">
              <Button onClick={handleOpenBlock} className="singleAdmin__btn" variant="plain">
                <img src={blockIcon} alt="" />
                <span>{data?.data.status === 0 ? 'Block' : 'Unblock'} Admin</span>
              </Button>
              <Button onClick={handleOpenDelete} className="singleAdmin__btn" variant="plain">
                <img src={deleteIcon} alt="" />
                <span>Delete Admin</span>
              </Button>
            </Box>
          )}

          <Box className="singleAdmin__grid">
            <AdminDetails error={error} refetch={refetch} data={data} isLoading={isLoading} />
            {/* <Activities /> */}
          </Box>
        </Container>
      </Box>
      <Dialog header="Block Admin" handleClose={handleCloseBlock} state={showBlock}>
        <ModalBox
          isLoading={blockLoading || unBlockLoading}
          handleClose={handleCloseBlock}
          handleSubmit={data?.data.status === 0 ? handleBlock : handleUnBlock}
          variant="block"
          blockVariant={data?.data.status === 0 ? 'block' : 'unblock'}
        />
      </Dialog>

      <Dialog header="Delete Admin" handleClose={handleCloseDelete} state={showDelete}>
        <ModalBox
          isLoading={deleteLoading}
          handleClose={handleCloseDelete}
          handleSubmit={handleDelete}
          variant="delete"
        />
      </Dialog>
    </ContentMgtLayout>
  );
};

export default SingleAdmin;
