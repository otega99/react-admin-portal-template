import { BasicInfo, Box, Text } from 'components';
import React from 'react';
import Api from 'types/client';
import { specifyRole, Role } from 'utils/role';
import './otherInfo.scss';

interface Props {
  user: Api.AdminI | undefined;
}

const getStatus = (status: number | undefined) => {
  if (status === 0) {
    return 'Active';
  } else if (status === 1) {
    return 'Blocked';
  }

  return '';
};

const OtherInfo = ({ user }: Props) => {
  
  // <Box className="otherInfo__infoBox">
  // <BasicInfo header="System Role" text="" />
  // </Box>
  
  return (
    <Box className="otherInfo">
      <Text className="otherInfo__header">Other Information</Text>
      <Box className="otherInfo__infoBox">
          <BasicInfo header="Role" text={specifyRole((user?.role || 0) as Role)} />
      </Box>
      <Box className="otherInfo__infoBox">
        <BasicInfo header="Status" text={getStatus(user?.status)} />
      </Box>
    </Box>
  );
};

export default OtherInfo;
