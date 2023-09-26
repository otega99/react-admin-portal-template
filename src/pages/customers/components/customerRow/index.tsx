import { avatarLogo } from 'assets';
import { Box, Text } from 'components';
import { baseURL } from 'config/AxiosConfig';
import { Path } from 'navigations/routes';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Api from 'types/client';
import { formatDate } from 'utils/date';
import './customerRow.scss';

interface Props {
  item: Api.Customers.Customer;
}

const CustomerRow: React.FC<Props> = ({ item }) => {
  const navigate = useNavigate();

  const handleRoute = () => {
    navigate(`${Path.Customers}/${item.id}`);
  };

  // change the id
  const imgSrc = `${baseURL}/Users/${item.id}.jpg`;
  return (
    <Box className="customerRow" onClick={handleRoute}>
      <Box className="customerRow__item image">
        <Box className="customerRow__img">
          <img
            src={imgSrc}
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
      <Text variant="caption" className="customerRow__item">
        {item.email}
      </Text>
      <Text variant="caption" className="customerRow__item">
        {item.phone}
      </Text>
      <Text variant="caption" className="customerRow__item">
        {formatDate(item.createdAt)}
      </Text>
      <Text variant="caption" className="customerRow__item">
        {item.lastLogin === null ? 'NB' : formatDate(item.lastLogin)}
      </Text>
    </Box>
  );
};

export default CustomerRow;
