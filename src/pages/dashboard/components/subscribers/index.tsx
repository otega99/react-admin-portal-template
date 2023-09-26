import { AxiosError } from 'axios';
import { Box, EmptyDataBox, ErrorBox, LinkTag, Skeleton, Text } from 'components';
import { Path } from 'navigations/routes';
import React from 'react';
import Api from 'types/client';
import SubscriberCard from '../subscriberCard';
import './subscribers.scss';

interface Props {
  subscribers: Api.Customers.GetNewSubscribers.Response | undefined;
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: AxiosError<Api.Responses.Error, any> | null;
  refetch: () => void;
}

const Subscribers = ({ subscribers, isLoading, error, refetch }: Props) => {
  return (
    <Box className="subscribers">
      <Box className="subscribers__head">
        <Text as="h5" variant="h6">
          New Subscribers
        </Text>
        <Box>
          <LinkTag variant="primary" to={Path.Customers}>
            See all
          </LinkTag>
        </Box>
      </Box>
      <Box className="subscribers__list">
        {!isLoading && error && <ErrorBox handleRetry={refetch} />}
        {!error && (
          <>
            {isLoading && (
              <Box className="subscribers__skeletonDiv">
                {[...Array(7)].map((item, index) => (
                  <Skeleton key={index} className="subscribers__skeleton" />
                ))}
              </Box>
            )}
            {!isLoading && subscribers && subscribers.data.length
              ? subscribers?.data.map((item, index) => (
                  <SubscriberCard key={index} date={item.createdAt} image="" name={item.name} />
                ))
              : ''}
            {!isLoading && subscribers && !subscribers.data.length ? <EmptyDataBox /> : ''}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Subscribers;
