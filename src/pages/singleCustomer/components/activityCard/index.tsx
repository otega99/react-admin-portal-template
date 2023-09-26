import { Box, Text } from 'components';
import React from 'react';
import './activityCard.scss';

interface Props {
  name: string;
  date: string;
}

const ActivityCard: React.FC<Props> = ({ date, name }) => {
  return (
    <Box className="activityCard">
      <Box className="activityCard__status">
        <Box className="activityCard__statusBall" />
        <Box className="activityCard__statusLine" />
      </Box>
      <Box className="activityCard__details">
        <Text variant="caption" className="activityCard__name">
          {name}
        </Text>
        <Text className="activityCard__date">{date}</Text>
      </Box>
    </Box>
  );
};

export default ActivityCard;
