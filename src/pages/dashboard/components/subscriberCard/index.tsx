import { avatarLogo } from 'assets';
import { Box, Text } from 'components';
import React from 'react';
import { formatDate } from 'utils/date';
import './subscriberCard.scss';

interface Props {
  image: string;
  name: string;
  date: string;
}

const SubscriberCard: React.FC<Props> = ({ image, date, name }) => {
  return (
    <Box className="subscriberCard">
      <Box className="subscriberCard__status">
        <Box className="subscriberCard__statusBall" />
        <Box className="subscriberCard__statusLine" />
      </Box>
      <Box className="subscriberCard__imgDiv">
        <img
          src={image}
          onError={(e) => {
            e.currentTarget.src = avatarLogo;
          }}
          alt=""
        />
      </Box>
      <Box className="subscriberCard__details">
        <Text>{name}</Text>
        <Text variant="footnote" className="subscriberCard__date">
          {formatDate(date)}
        </Text>
      </Box>
    </Box>
  );
};

export default SubscriberCard;
