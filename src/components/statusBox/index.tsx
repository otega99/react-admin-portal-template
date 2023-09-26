import React from 'react';
import cs from 'classnames';
import { Box } from 'components/box';
import './statusBox.scss';
import Text from 'components/text';
import Api from 'types/client';

interface Props {
  status: Api.Status;
}

const StatusBox: React.FC<Props> = ({ status }) => {
  const classes = cs('statusBox', {
    pending: status === 'pending',
    cancelled: status === 'canceled',
    confirming: status === 'confirming',
    booked: status === 'booked',
    successful: status === 'successful' || status === 'confirmed'
  });

  const text =
    status === 'pending'
      ? 'Pending'
      : status === 'successful'
      ? 'Successful'
      : status === 'confirmed'
      ? 'Confirmed'
      : status === 'canceled'
      ? 'Cancelled'
      : status === 'confirming'
      ? 'Confirming'
      : status === 'booked'
      ? 'Booked'
      : '';
  return (
    <Box className={classes}>
      <Text variant="caption" className="statusBox__text">
        {text}
      </Text>
    </Box>
  );
};

export default StatusBox;
