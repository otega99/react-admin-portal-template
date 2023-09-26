import { AxiosError } from 'axios';
import { Box, EmptyDataBox, ErrorBox, Skeleton, Button, Dialog } from 'components';
import { PermissionI } from 'pages/permissions/permissionData';

import React, { useState } from 'react';
import Api from 'types/client';
import PermissionCarditem from '../permissionCarditem';
import PermissionTable from '../permissionTable';
import '../../permission.scss';

interface Props {
  data: PermissionI[];
  pageInfo: Api.PageInfo | undefined;
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: AxiosError<Api.Responses.Error, any> | null;
  refetch: () => void;
}

interface PropsItem {
  item: string;
  key: number;
}

const PermissionCard: React.FC<Props> = ({ data, isLoading, pageInfo, error, refetch }) => {
  const [id, setid] = useState('empty');
  const [showModal, setModal] = useState(false);

  const handleModalClose = () => {
    setModal(!showModal);
  };

  const dataload = (rolename: string) => {
    setid(rolename);
  };

  const deleteitem = (rolename: string) => {
    // Make and API Call delete item and delete this role
    setModal(!showModal);
    refetch();
  };

  return (
    <>
      <Box className="singleAdmin__grid">
        {!isLoading && error && <ErrorBox handleRetry={refetch} />}
        {!error && (
          <>
            {isLoading && (
              <Box className="app__skeletons">
                {[...Array(8)].map((item, index) => (
                  <Skeleton key={index} className="currencies__skeleton" />
                ))}
              </Box>
            )}
            {!isLoading && data.length
              ? data.map((item, index) => (
                  <PermissionCarditem
                    permission={item}
                    index={index}
                    key={null}
                    loadData={dataload}
                    deleteitem={deleteitem}
                  />
                ))
              : ''}

            {!isLoading && !data.length ? <EmptyDataBox /> : ''}
          </>
        )}
      </Box>
      {!isLoading && data.length && id !== 'empty' ? (
        <Box className="boxin">
          <Box>Permission for {id}</Box>
          <Box>
            <PermissionTable
              error={error}
              refetch={refetch}
              isLoading={isLoading}
              data={data?.find((e) => e.rolename == id)?.permissions || []}
            />
          </Box>
        </Box>
      ) : (
        ''
      )}

      <Dialog removeCloseBtn header="Delete Role?" handleClose={handleModalClose} state={showModal}>
        <Box> Here we are</Box>
      </Dialog>
    </>
  );
};

export default PermissionCard;
