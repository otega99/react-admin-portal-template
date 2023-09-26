import axios, { AxiosError } from 'axios';
import { Box, EmptyDataBox, ErrorBox, PaginationBackend, Skeleton } from 'components';
import { CUSTOMERS_PAGE_SIZE } from 'constants/index';
import { usePaginationBackend } from 'hooks';
import { RightsI } from 'pages/permissions/permissionData';
import React from 'react';
import Api from 'types/client';
import PermissionRow from '../permissionRow';

interface Props {
  data: RightsI[];
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: AxiosError<Api.Responses.Error, any> | null;
  refetch: () => void;
}

const PermissionTable: React.FC<Props> = ({ data, isLoading, error, refetch }) => {
  const makeUpdateCall = async (itemid: string, val: boolean) => {
    // Call the API to update
    try {
      const response = await axios.get(
        `https://adminapi.respectedfx.com/api/Role/Updatepermission?permissionid=${itemid}&state=${val}`
      );
  
      if (response.status === 200) {
        console.log('Permission status updated successfully');
        console.log(response)
      }
    } catch (error) {
      console.error('Error updating permission status: ', error);
    }
  };

  return (
    <>
      <Box className="app__table">
        <Box className="app__tableHead">
          <Box className="app__tableHeadItem">Permission</Box>
          <Box className="app__tableHeadItem">Status</Box>
        </Box>
        {!isLoading && error && <ErrorBox handleRetry={refetch} />}
        {!error && (
          <>
            {isLoading && (
              <Box className="app__skeletons">
                {[...Array(CUSTOMERS_PAGE_SIZE)].map((item, index) => (
                  <Skeleton key={index} className="currencies__skeleton" />
                ))}
              </Box>
            )}
            {!isLoading && data.length
              ? data.map((item, index) => (
                  <PermissionRow item={item} key={index} callback={makeUpdateCall} />
                ))
              : ''}

            {!isLoading && !data.length ? <EmptyDataBox /> : ''}
          </>
        )}
      </Box>
    </>
  );
};

export default PermissionTable;
