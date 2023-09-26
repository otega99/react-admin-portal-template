import { Box, StatusBox, Text } from 'components';
import { Path } from 'navigations/routes';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Api from 'types/client';
import './transactionRow.scss';

interface Props {
  item: Api.Transactions.GetTransactions.TransactionI;
}

const TransactionRow: React.FC<Props> = ({ item }) => {
  const navigate = useNavigate();

  const handleRoute = () => {
    navigate(`${Path.Transactions}/${item.paymentId}`);
  };
  return (
    <Box className="transactionRow" onClick={handleRoute}>
      <Text variant="caption" className="transactionRow__item">
        {item.name}
      </Text>
      <Text variant="caption" className="transactionRow__item">
        {item.paymentId}
      </Text>
      <Text variant="caption" className="transactionRow__item">
        {item.sell}
      </Text>
      <Text variant="caption" className="transactionRow__item">
        {item.buy}
      </Text>
      <Text variant="caption" className="transactionRow__item">
        {item.amount}
      </Text>
      <Text variant="caption" className="transactionRow__item">
        {item.rate}
      </Text>
      <Box className="transactionRow__item">
        <StatusBox status={item.status.toLowerCase() as Api.Status} />
      </Box>
    </Box>
  );
};

export default TransactionRow;
