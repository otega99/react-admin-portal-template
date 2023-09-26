import { Box, Text, StatusBox } from 'components';
import { baseURL } from 'config/AxiosConfig';
import { RightsI } from 'pages/permissions/permissionData';
import React from 'react';
import Api from 'types/client';
import './tableRow.scss';

interface Props {
  item: RightsI;
  callback: (rolename: string, status: boolean) => void;
}

const PermissionRow: React.FC<Props> = ({ item, callback }) => {
  const [checked, setChecked] = React.useState(item.status);

  const handleChange = () => {
    setChecked(!checked);
    callback(item.rightid, checked);
  };

  // change the id

  return (
    <Box className="customerRow" onClick={handleChange}>
      <Text variant="caption">{item.rightname}</Text>
      <Text variant="caption">
        <input type="checkbox" checked={checked} onChange={handleChange} />
      </Text>
    </Box>
  );
};

export default PermissionRow;
