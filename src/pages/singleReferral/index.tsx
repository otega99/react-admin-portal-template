import { transfer } from 'assets';
import {
  BasicInfo,
  Box,
  BreadCrumbBox,
  Button,
  Container,
  Dialog,
  ErrorBox,
  Flag,
  Image,
  Skeleton,
  StatusBox,
  Text,
  useAlert
} from 'components';
import { useAuth } from 'contexts/AuthProvider';
import { FormikHelpers } from 'formik';
import { useApproveTransaction, useCancelTransaction, useGetSingleTransaction } from 'hooks';
import { ContentMgtLayout } from 'layouts';
import { Path } from 'navigations/routes';
import { ReferralDemoData } from 'pages/referral/referralData';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from 'types/client';
import { formatDate } from 'utils/date';
import CancelModal, { InitialStateI } from './components/cancelModal';
import './singleTransactions.scss';

const SingleReferral = () => {
  const [showCancelModal, setShowCancelModal] = useState(false);

  const alert = useAlert();
  const { token } = useAuth();
  const params = useParams<{ id: string }>();

  const payload: Api.Transactions.GetSingleTransaction.Request = {
    token,
    txRef: params.id || ''
  };

  // const { data, isLoading, refetch, error } = useGetSingleTransaction(payload);

  const tryrun = () => {
    console.log('tryrun');
  };

  const getLocalData = (pid: string) => {
    return {
      data: ReferralDemoData.data.filter((e) => e.id == pid)[0],
      isLoading: false,
      error: null,
      refetch: tryrun
    };
  };

  const { data, isLoading, refetch, error } = getLocalData(params.id!);

  const { mutate: approveMutate, isLoading: approveLoading } = useApproveTransaction({
    onSuccess: () => {
      alert({
        message: 'Referral approved succesfully'
      });
      refetch();
    },
    onError: (error) => {
      alert({
        type: 'ERROR',
        message: error.response?.data.message || 'Something went wrong'
      });
    }
  });
  const { mutate: cancelMutate, isLoading: cancelLoading } = useCancelTransaction({
    onSuccess: () => {
      alert({
        message: 'The customer will be notified.'
      });
      handleModalClose();
      refetch();
    },
    onError: (error) => {
      alert({
        type: 'ERROR',
        message: error.response?.data.message || 'Something went wrong'
      });
    }
  });

  const handleModalOpen = () => {
    setShowCancelModal(true);
  };
  const handleModalClose = () => setShowCancelModal(false);

  const handleCancelSubmit = async (
    values: InitialStateI,
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    formikHelpers: FormikHelpers<InitialStateI>
  ) => {
    const payload: Api.Transactions.CancelTransaction.Request = {
      reason: values.message,
      token,
      txRef: params.id || ''
    };
    await cancelMutate(payload);
  };

  const handleApprove = () => {
    const payload: Api.Transactions.ApproveTransaction.Request = {
      token,
      txRef: params.id || ''
    };
    approveMutate(payload);
  };

  return (
    <ContentMgtLayout backPath={Path.Referral} isPrevBtn header="Referrals Details">
      <Box className="stransactions">
        <Container className="stransactions__container">
          <Box className="stransactions__head">
            <BreadCrumbBox
              firstTextLink={Path.Referral}
              firstText="Referral"
              isLoading={isLoading}
              secondText={data?.referralcode || ''}
            />
          </Box>
          <Box className="stransactions__body">
            {!isLoading && error && <ErrorBox handleRetry={refetch} />}
            {!error && (
              <Box className="stransactions__details">
                {isLoading && (
                  <>
                    {[...Array(14)].map((item, index) => (
                      <Skeleton className="stransactions__skeleton" key={index} />
                    ))}
                  </>
                )}
                {!isLoading && data && (
                  <>
                    <Box className="stransactions__item">
                      <BasicInfo header="Customer Name" text={data.customername} />
                    </Box>
                    <Box className="stransactions__item">
                      <BasicInfo header="Transaction ID" text={data.transactionid} />
                    </Box>
                    <Box className="stransactions__item">
                      <BasicInfo header="Referrer Name" text={data.referrername} />
                    </Box>

                    <Box className="stransactions__item">
                      <BasicInfo header="Transaction Amount" text={`₦${data.amount}`} />
                    </Box>
                    <Box className="stransactions__item">
                      <BasicInfo header="Bonus Amount" text={data.bounus} />
                    </Box>
                    <Box className="stransactions__item">
                      <BasicInfo header="Bonus Rate" text={'0'} />
                    </Box>

                    <Box className="stransactions__item">
                      <BasicInfo header="Status">
                        <StatusBox status={data.status.toLowerCase() as Api.Status} />
                      </BasicInfo>
                    </Box>
                  </>
                )}
              </Box>
            )}
            {!error && !isLoading && (
              <Box className="stransactions__btnDiv">
                <Button onClick={handleModalOpen} variant="gray">
                  Cancel
                </Button>
                <Button disabled={approveLoading} onClick={handleApprove}>
                  Approve
                </Button>
              </Box>
            )}
          </Box>
        </Container>
        <Dialog
          removeCloseBtn
          header="Cancel Referral"
          handleClose={handleModalClose}
          state={showCancelModal}>
          <CancelModal isLoading={cancelLoading} handleCancelSubmit={handleCancelSubmit} />
        </Dialog>
      </Box>
    </ContentMgtLayout>
  );
};

export default SingleReferral;
