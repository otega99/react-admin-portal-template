import { avatarLogo } from 'assets';
import { AxiosError } from 'axios';
import { BasicInfo, Box, ErrorBox, Skeleton, Text } from 'components';
import { baseURL } from 'config/AxiosConfig';
import React from 'react';
import Api from 'types/client';
import { formatDate } from 'utils/date';
import './infoSection.scss';

interface Props {
  customer: Api.Customers.GetCustomerById.Response | undefined;
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: AxiosError<Api.Responses.Error, any> | null;
  refetch: () => void;
}

const InfoSection = ({ customer, isLoading, error, refetch }: Props) => {
  const imgSrc = `${baseURL}/Users/${customer?.data?.userId}.jpg`;
  return (
    <Box className="infoSection">
      {!isLoading && error && (
        <Box className="infoSection__error">
          <ErrorBox handleRetry={refetch} />
        </Box>
      )}
      {!error && (
        <>
          <Box className="infoSection__first">
            <Box className="infoSection__imgDiv">
              {isLoading && <Skeleton className="infoSection__imgSkeleton" />}
              {!isLoading && customer && (
                <img
                  src={imgSrc}
                  onError={(e) => {
                    e.currentTarget.src = avatarLogo;
                  }}
                  alt={customer?.data?.name}
                />
              )}
            </Box>
            <Box className="infoSection__name">
              {isLoading && <Skeleton className="infoSection__nameSkeleton" />}
              {!isLoading && customer && (
                <Text as="h6" variant="h6">
                  {customer?.data.name}
                </Text>
              )}
              <Text className="infoSection__registeredDate">
                Registered on {isLoading && <Skeleton className="infoSection__dateSkeleton" />}{' '}
                {!isLoading && customer && formatDate(customer?.data?.registrationDate)}
              </Text>
            </Box>
          </Box>
          <Box className="infoSection__details">
            <Text className="infoSection__subHeader">User Information</Text>
            <Box className="infoSection__infoBox">
              {isLoading && <Skeleton className="infoSection__infoSkeleton" />}
              {!isLoading && customer && (
                <BasicInfo header="Phone Number" text={customer?.data?.phoneNumber} />
              )}
            </Box>
            <Box className="infoSection__infoBox">
              {isLoading && <Skeleton className="infoSection__infoSkeleton" />}
              {!isLoading && customer && (
                <BasicInfo header="Email Address" text={customer?.data?.email} />
              )}
            </Box>
            <Box className="infoSection__infoBox">
              {isLoading && <Skeleton className="infoSection__infoSkeleton" />}
              {!isLoading && customer && <BasicInfo header="BVN" text={customer?.data?.bvn} />}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default InfoSection;
