import { Box, Text, Button } from 'components';
import { PermissionI } from 'pages/permissions/permissionData';
import { FiEdit2, FiDelete } from 'react-icons/fi';
import React from 'react';
import './Card.scss';

interface Props {
  permission: PermissionI;
  index: number;
  loadData: (rolename: string) => void;
  deleteitem: (rolename: string) => void;
}

const PermissionCarditem: React.FC<Props> = ({ permission, index, loadData, deleteitem }) => {
  const handleEdit = () => {
    loadData(permission.rolename);
  };

  const handleDelete = () => {
    deleteitem(permission.rolename);
  };
  return (
    <Box className="aCard">
      <Box className="aActivityCard__details">
        <Text variant="caption" className="aActivityCard__name">
          {permission.countofusers} Users
        </Text>
        <Text variant="caption">Authority: {permission.authority}</Text>
      </Box>
      <Box className="RoleRow__item">
        <Text variant="caption" className="RoleName_item">
          {permission.rolename}
        </Text>

        <Button onClick={handleEdit} variant="plain" className="currenciesRow__itemItem">
          <FiEdit2 />
        </Button>
        <Button onClick={handleDelete} variant="plain" className="currenciesRow__itemItem">
          <FiDelete />
        </Button>
      </Box>
    </Box>
  );
};

export default PermissionCarditem;
