import { Box, Text } from 'components';
import React from 'react';
import './activityCard.scss';

interface Props {
  name: string;
  date: string;
}

const ActivityCard: React.FC<Props> = ({ date, name }) => {
  return (
    <Box className="aActivityCard">
      <Box className="aActivityCard__status">
        <Box className="aActivityCard__statusBall" />
        <Box className="aActivityCard__statusLine" />
      </Box>
      <Box className="aActivityCard__details">
        <Text variant="caption" className="aActivityCard__name">
          {name}
        </Text>
        <Text className="aActivityCard__date">{date}</Text>
      </Box>
    </Box>
  );
};

export default ActivityCard;
