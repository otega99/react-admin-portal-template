import { avatarLogo } from 'assets';
import { Box, Text, StatusBox } from 'components';
import { baseURL } from 'config/AxiosConfig';
import { Path } from 'navigations/routes';
import { ReferralI } from 'pages/referral/referralData';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Api from 'types/client';
import { formatDate } from 'utils/date';
import './referralRow.scss';

interface Props {
  item: ReferralI;
}

const ReferralRow: React.FC<Props> = ({ item }) => {
  const navigate = useNavigate();

  const handleRoute = () => {
    navigate(`${Path.Referrals}/${item.id}`);
  };

  return (
    <Box className="customerRow" onClick={handleRoute}>
      <Box className="customerRow__item image">
        <Text variant="caption">{item.referralcode}</Text>
      </Box>
      <Text variant="caption" className="customerRow__item">
        {item.transactiondate}
      </Text>
      <Text variant="caption" className="customerRow__item">
        {`₦${item.amount}`}
      </Text>
      <Text variant="caption" className="customerRow__item">
        {`₦${item.bounus}`}
      </Text>

      <Box className="transactionRow__item">
        <StatusBox status={item.status.toLowerCase() as Api.Status} />
      </Box>
    </Box>
  );
};

export default ReferralRow;
