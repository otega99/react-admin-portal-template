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
import { mobileAppBaseUrl } from 'config/AxiosConfig';
import { useAuth } from 'contexts/AuthProvider';
import { FormikHelpers } from 'formik';
import { useApproveTransaction, useCancelTransaction, useGetSingleTransaction } from 'hooks';
import { ContentMgtLayout } from 'layouts';
import { Path } from 'navigations/routes';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from 'types/client';
import { formatDate } from 'utils/date';
import CancelModal, { InitialStateI } from './components/cancelModal';
import './singleTransactions.scss';

const SingleTransaction = () => {
  const [showCancelModal, setShowCancelModal] = useState(false);

  const alert = useAlert();
  const { token } = useAuth();
  const params = useParams<{ id: string }>();

  const payload: Api.Transactions.GetSingleTransaction.Request = {
    token,
    txRef: params.id || ''
  };
  const { data, isLoading, refetch, error } = useGetSingleTransaction(payload);
  const { mutate: approveMutate, isLoading: approveLoading } = useApproveTransaction({
    onSuccess: () => {
      alert({
        message: 'Transaction approved succesfully'
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

  const proofOfPaymentImg = data ? `${data.data.purposeOfId}.jpg` : '';
  const proofOfPaymentSrc = data
    ? `${mobileAppBaseUrl}ProofOfPayment/${data.data.purposeOfId}.jpg`
    : '';

  return (
    <ContentMgtLayout backPath={Path.Transactions} isPrevBtn header="Transactions">
      <Box className="stransactions">
        <Container className="stransactions__container">
          <Box className="stransactions__head">
            <BreadCrumbBox
              firstTextLink={Path.Transactions}
              firstText="Transactions"
              isLoading={isLoading}
              secondText={data?.data.customerName || ''}
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
                      <BasicInfo header="Customer Name" text={data.data.customerName} />
                    </Box>
                    <Box className="stransactions__item">
                      <BasicInfo header="Processing Fee" text={`₦${data.data.processingFee}`} />
                    </Box>
                    <Box className="stransactions__item">
                      <BasicInfo
                        header="Respected FX A/C Deposied To"
                        text={data.data.respectedFxAccount}
                      />
                    </Box>
                    <Box className="stransactions__item">
                      <BasicInfo header="Payment Date" text={formatDate(data.data.paymentDate)} />
                    </Box>
                    <Box className="stransactions__item">
                      <BasicInfo header="Bank Fees" text={`₦${data.data.bankFees}`} />
                    </Box>
                    <Box className="stransactions__item">
                      <BasicInfo header="Customer’s Account" text={data.data.customerAccount} />
                    </Box>
                    <Box className="stransactions__item">
                      <BasicInfo header="Purpose of ID" text={data.data.purposeOfId} />
                    </Box>
                    <Box className="stransactions__item">
                      <BasicInfo header="Payment Type" text={data.data.paymentType} />
                    </Box>
                    <Box className="stransactions__item">
                      <BasicInfo header="Proof of payment">
                        <Box
                          className="stransactions__proof"
                          onClick={() => window.open(proofOfPaymentSrc)}>
                          <Image
                            className="stransactions__proofImg"
                            src={proofOfPaymentSrc}
                            alt=""
                          />
                          <Text>{proofOfPaymentImg}</Text>
                        </Box>
                      </BasicInfo>
                    </Box>
                    <Box className="stransactions__item">
                      <Box className="stransactions__rateItems">
                        <BasicInfo header="Sell" text={data.data.sell} />
                        <BasicInfo header="Buy" text={data.data.buy} />
                        <BasicInfo header="Rate" text={`₦${data.data.rate}`} />
                      </Box>
                    </Box>
                    <Box className="stransactions__item">
                      <BasicInfo header="Amount Sold" text={`$${data.data.amountSold}`} />
                    </Box>
                    <Box className="stransactions__item">
                      <BasicInfo header="Status">
                        <StatusBox status={data.data.status.toLowerCase() as Api.Status} />
                      </BasicInfo>
                    </Box>
                    <Box className="stransactions__item">
                      <BasicInfo header="Exchange Type">
                        <Box className="stransactions__transfer">
                          <Flag country={data.data.sell as Api.Country} />
                          <img src={transfer} alt="" />
                          <Flag country={data.data.buy as Api.Country} />
                        </Box>
                      </BasicInfo>
                    </Box>
                    <Box className="stransactions__item">
                      <BasicInfo header="Amount Gotten" text={`$${data.data.amountGotten}`} />
                      {/* <BasicInfo header="Amount Gotten" text="$862" /> */}
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
          header="Cancel Transaction"
          handleClose={handleModalClose}
          state={showCancelModal}>
          <CancelModal isLoading={cancelLoading} handleCancelSubmit={handleCancelSubmit} />
        </Dialog>
      </Box>
    </ContentMgtLayout>
  );
};

export default SingleTransaction;
