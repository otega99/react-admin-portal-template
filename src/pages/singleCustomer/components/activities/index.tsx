import { Box, Text } from 'components';
import React from 'react';
import ActivityCard from '../activityCard';
import './activities.scss';

const data = [
  { name: 'Logged into App', date: '12 PM, March 16, 2022' },
  { name: 'Logged into App', date: '12 PM, March 16, 2022' },
  { name: 'Logged into App', date: '12 PM, March 16, 2022' },
  { name: 'Logged into App', date: '12 PM, March 16, 2022' },
  { name: 'Logged into App', date: '12 PM, March 16, 2022' },
  { name: 'Logged into App', date: '12 PM, March 16, 2022' }
];

const Activities = () => {
  return (
    <Box className="cActivities">
      <Text className="cActivities__header" as="h6" variant="h6">
        Recent Activities
      </Text>
      <Box className="cActivities__list">
        {data.map((item, index) => (
          <ActivityCard key={index} {...item} />
        ))}
      </Box>
    </Box>
  );
};

export default Activities;
