import { Box, BreadCrumbBox, Button, Container, Dialog, Skeleton, useAlert } from 'components';
import { useAuth } from 'contexts/AuthProvider';
import { FormikHelpers } from 'formik';
import { useDeleteFaq, useGetSingleFaq, useUpdateFaq } from 'hooks';
import { ContentMgtLayout } from 'layouts';
import { Path } from 'navigations/routes';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Api from 'types/client';
import DeleteModal from './components/deleteFaqModal';
import FaqBody from './components/faqBody';
import UpdateFaq, { FaqI } from './components/updateFaqModal';
import './singleFaq.scss';

const SingleFaq = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const params = useParams<{ id: string }>();
  const { token } = useAuth();
  const alert = useAlert();
  const navigate = useNavigate();

  const payload: Api.Faq.GetSingleFaq.Request = {
    id: params.id || '',
    token
  };
  const { data, isLoading, refetch, error } = useGetSingleFaq(payload);

  const { mutate: deleteMutate, isLoading: deleteLoading } = useDeleteFaq({
    onSuccess: () => {
      navigate(Path.FAQ);
      alert({
        message: 'Faq deleted successfully'
      });
      // handleCloseDeleteModal();
    },
    onError: (error) => {
      alert({
        type: 'ERROR',
        message: error.response?.data.message || 'Something went wrong!'
      });
    }
  });

  const { mutate: updateMutate, isLoading: updateLoading } = useUpdateFaq({
    onSuccess: () => {
      alert({
        message: 'Faq updates successfully'
      });
      handleCloseUpdateModal();
      refetch();
    },
    onError: (error) => {
      alert({
        type: 'ERROR',
        message: error.response?.data.message || 'Something went wrong!'
      });
    }
  });

  const handleOpenDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleOpenUpdateModal = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const handleDelete = () => {
    const payload: Api.Faq.DeleteFaq.Request = {
      id: params.id || '',
      token
    };
    deleteMutate(payload);
  };

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const handleUpdate = (values: FaqI, formikHelpers: FormikHelpers<FaqI>) => {
    const payload: Api.Faq.UpdateFaq.Request = {
      id: params.id || '',
      Body: values.description,
      CoverImage: values.image ? values.image : data?.data.coverImagePath || '',
      Title: values.name,
      token
    };
    updateMutate(payload);
  };

  return (
    <ContentMgtLayout backPath={Path.FAQ} isPrevBtn header="FAQ">
      <Box className="sFaq">
        <Container className="sFaq__container">
          <Box className="sFaq__head">
            <BreadCrumbBox
              firstTextLink={Path.FAQ}
              firstText="FAQ"
              isLoading={isLoading}
              secondText={data?.data?.title || ''}
            />

            <Box className="sFaq__headBtns">
              {!error && (
                <>
                  {isLoading && (
                    <>
                      {[...Array(2)].map((item, index) => (
                        <Skeleton key={index} />
                      ))}
                    </>
                  )}
                  {!isLoading && !error && (
                    <>
                      <Button onClick={handleOpenUpdateModal}>Edit</Button>
                      <Button onClick={handleOpenDeleteModal} variant="danger">
                        Delete
                      </Button>
                    </>
                  )}
                </>
              )}
            </Box>
          </Box>
          <FaqBody error={error} refetch={refetch} data={data} isLoading={isLoading} />
        </Container>

        <Dialog
          removeCloseBtn
          header="Delete FAQ"
          handleClose={handleCloseDeleteModal}
          state={showDeleteModal}>
          <DeleteModal
            isLoading={deleteLoading}
            handleDelete={handleDelete}
            handleCancel={handleCloseDeleteModal}
          />
        </Dialog>
        <Dialog
          removeCloseBtn
          header="Edit FAQ"
          handleClose={handleCloseUpdateModal}
          state={showUpdateModal}>
          <UpdateFaq
            handleSubmit={handleUpdate}
            isLoading={updateLoading}
            data={data}
            handleCancel={handleCloseUpdateModal}
          />
        </Dialog>
      </Box>
    </ContentMgtLayout>
  );
};

export default SingleFaq;
