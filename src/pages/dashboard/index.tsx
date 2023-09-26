import { usaIcon } from 'assets';
import { Box, Container } from 'components';
import { useAuth } from 'contexts/AuthProvider';
import { useGetDashboardCurrencies, useGetNewSubscribers, useGetRecentExchangeOrders } from 'hooks';
import { ContentMgtLayout } from 'layouts';
import React from 'react';
import Experience from './components/experience';
import RateCard from './components/rateCard';
// import Revenue from './components/revenue';
import Subscribers from './components/subscribers';
import './dashboard.scss';

const Dashboard = () => {
  const { token } = useAuth();

  const { data, isLoading, refetch, error } = useGetDashboardCurrencies({
    token
  });

  const {
    data: subscribers,
    isLoading: subscribersLoading,
    refetch: refetchSubscribers,
    error: subscribersError
  } = useGetNewSubscribers({
    token
  });

  const {
    data: orders,
    isLoading: ordersLoading,
    refetch: refetchOrders,
    error: ordersError
  } = useGetRecentExchangeOrders({
    token
  });

  return (
    <ContentMgtLayout header="Dashboard">
      <Box className="dashboard">
        <Container className="dashboard__container">
          <Box className="dashboard__box one">
            <RateCard
              header={data?.data[0].symbol || ''}
              image={usaIcon}
              rate1={data?.data[0].buyRate}
              rate2={data?.data[0].sellRate}
              status="+3.2% inc"
              subHeader="US dollar"
              isLoading={isLoading}
              error={error}
              refetch={refetch}
            />
          </Box>
          <Box className="dashboard__box two">
            <RateCard
              header={data?.data[1].symbol || ''}
              image={usaIcon}
              rate1={data?.data[1].buyRate}
              rate2={data?.data[1].sellRate}
              status="+3.2% inc"
              subHeader="US dollar"
              isLoading={isLoading}
              error={error}
              refetch={refetch}
            />
          </Box>
          <Box className="dashboard__box three">
            <RateCard
              header={data?.data[2].symbol || ''}
              image={usaIcon}
              rate1={data?.data[2].buyRate}
              rate2={data?.data[2].sellRate}
              status="+3.2% inc"
              subHeader="US dollar"
              isLoading={isLoading}
              error={error}
              refetch={refetch}
            />
          </Box>
          {/* <Box className="dashboard__box four">
            <Revenue />
          </Box> */}
          <Box className="dashboard__box four">
            <Experience
              refetch={refetchOrders}
              error={ordersError}
              orders={orders}
              isLoading={ordersLoading}
            />
          </Box>
          <Box className="dashboard__box six">
            <Subscribers
              refetch={refetchSubscribers}
              error={subscribersError}
              subscribers={subscribers}
              isLoading={subscribersLoading}
            />
          </Box>
        </Container>
      </Box>
    </ContentMgtLayout>
  );
};

export default Dashboard;
