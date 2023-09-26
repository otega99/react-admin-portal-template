import { avatarLogo } from 'assets';
import { AxiosError } from 'axios';
import { BasicInfo, Box, ErrorBox, Skeleton, Text } from 'components';
import { baseURL } from 'config/AxiosConfig';
import React from 'react';
import Api from 'types/client';
import { Role, specifyRole } from 'utils/role';
import './adminDetails.scss';

interface Props {
  data: Api.Admins.GetSingleAdmin.Response | undefined;
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: AxiosError<Api.Responses.Error, any> | null;
  refetch: () => void;
}

const AdminDetails = ({ data, isLoading, error, refetch }: Props) => {
  const imgSrc = `${baseURL}/static/images/${data?.data?.profilePicturePath}`;
  return (
    <Box className="adminDetails">
      {!isLoading && error && (
        <Box className="adminDetails__error">
          <ErrorBox handleRetry={refetch} />
        </Box>
      )}
      {!error && (
        <>
          <Box className="adminDetails__head">
            <Box className="adminDetails__imgDiv">
              {isLoading && <Skeleton className="adminDetails__imgSkeleton" />}
              {!isLoading && (
                <img
                  src={imgSrc || ''}
                  onError={(e) => {
                    e.currentTarget.src = avatarLogo;
                  }}
                  alt={data?.data.firstName}
                />
              )}
            </Box>
            <Box className="adminDetails__headDetails">
              {isLoading && (
                <>
                  <Skeleton className="adminDetails__headSkeleton" />
                  <Skeleton className="adminDetails__headSkeleton" />
                </>
              )}
              {!isLoading && data && (
                <>
                  {' '}
                  <Text variant="h6">
                    {data.data.firstName} {data.data.lastName}
                  </Text>
                  <Text>Registered on October 2nd, 2021</Text>
                </>
              )}
            </Box>
          </Box>
          <Text className="adminDetails__header">User Information</Text>
          <Box>
            <Box className="adminDetails__info">
              {isLoading && <Skeleton className="adminDetails__skeleton" />}
              {!isLoading && data && <BasicInfo header="Phone" text={data?.data.phoneNumber} />}
            </Box>
            <Box className="adminDetails__info">
              {isLoading && <Skeleton className="adminDetails__skeleton" />}
              {!isLoading && data && (
                <BasicInfo header="Email Address" text={data?.data.emailAddress} />
              )}
            </Box>
            <Box className="adminDetails__info">
              {isLoading && <Skeleton className="adminDetails__skeleton" />}
              {!isLoading && data && <BasicInfo header="Address" text={data?.data.address || ''} />}
            </Box>
            <Box className="adminDetails__info">
              {isLoading && <Skeleton className="adminDetails__skeleton" />}
              {!isLoading && data && (
                <BasicInfo header="Role" text={specifyRole(data?.data.role as Role)} />
              )}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AdminDetails;
