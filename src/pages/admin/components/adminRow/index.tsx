import { avatarLogo } from 'assets';
import { Box, Text } from 'components';
import { baseURL } from 'config/AxiosConfig';
import { Path } from 'navigations/routes';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Api from 'types/client';
import { formatDate } from 'utils/date';
import { Role, specifyRole } from 'utils/role';
import './adminRow.scss';

interface Props {
  item: Api.AdminI;
  id: string;
}

const AdminRow: React.FC<Props> = ({ item, id }) => {
  const navigate = useNavigate();

  const handleRoute = () => {
    navigate(`${Path.Admin}/${id}`);
  };

  const imgSrc = `${baseURL}/static/images/${item.profilePicturePath}`;

  return (
    <Box className="adminRow" onClick={handleRoute}>
      <Box className="adminRow__item flagItem">
        <Box className="adminRow__imgDiv">
          <img
            src={item.profilePicturePath ? imgSrc : ''}
            onError={(e) => {
              e.currentTarget.src = avatarLogo;
            }}
            alt={item.firstName}
          />
        </Box>
        <Text variant="caption">
          {item.firstName} {item.lastName}
        </Text>
      </Box>
      <Text variant="caption" className="adminRow__item">
        {item.emailAddress}
      </Text>
      <Text variant="caption" className="adminRow__item">
        {item.phoneNumber}
      </Text>
      <Text variant="caption" className="adminRow__item">
        {specifyRole(item.role as Role)}
      </Text>
      <Text variant="caption" className="adminRow__item icons">
        {formatDate(item.lastLogin || '')}
      </Text>
    </Box>
  );
};

export default AdminRow;
