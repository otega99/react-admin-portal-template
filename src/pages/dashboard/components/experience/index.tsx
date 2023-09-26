import { AxiosError } from 'axios';
import { Box, EmptyDataBox, ErrorBox, LinkTag, Skeleton, Text } from 'components';
import { Path } from 'navigations/routes';
import React from 'react';
import Api from 'types/client';
import { formatDate } from 'utils/date';
import './experience.scss';

interface Props {
  isLoading: boolean;
  orders: Api.Transactions.RecentExchangeOrders.Response | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: AxiosError<Api.Responses.Error, any> | null;
  refetch: () => void;
}

const Experience = ({ isLoading, orders, error, refetch }: Props) => {
  return (
    <Box className="experience">
      <Box className="experience__head">
        <Text as="h5" variant="h6">
          Recent Exchanges Orders
        </Text>
        <Box>
          <LinkTag variant="primary" to={Path.Transactions}>
            See all
          </LinkTag>
        </Box>
      </Box>
      <Box className="experience__table">
        <Box className="experience__tableHead">
          <Text variant="caption" className="experience__tableHeadItem">
            Date
          </Text>
          <Text variant="caption" className="experience__tableHeadItem">
            Payment ID
          </Text>
          <Text variant="caption" className="experience__tableHeadItem">
            Sell
          </Text>
          <Text variant="caption" className="experience__tableHeadItem">
            Buy
          </Text>
          <Text variant="caption" className="experience__tableHeadItem">
            Amount
          </Text>
          <Text variant="caption" className="experience__tableHeadItem">
            Rate
          </Text>
        </Box>
        <Box className="experience__tableBody">
          {!isLoading && error && <ErrorBox handleRetry={refetch} />}
          {!error && (
            <>
              {isLoading && (
                <Box className="experience__skeletonBox">
                  {[...Array(7)].map((item, index) => (
                    <Skeleton key={index} className="experience__skeleton" />
                  ))}
                </Box>
              )}
              {!isLoading && orders && orders?.data.length
                ? orders?.data.map((item, index) => (
                    <Box key={index} className="experience__tableRow">
                      <Text variant="caption" className="experience__tableRowItem">
                        {formatDate(item.date)}
                      </Text>
                      <Text variant="caption" className="experience__tableRowItem">
                        {item.txRef}
                      </Text>
                      <Text variant="caption" className="experience__tableRowItem">
                        {item.sell}
                      </Text>
                      <Text variant="caption" className="experience__tableRowItem">
                        {item.buy}
                      </Text>
                      <Text variant="caption" className="experience__tableRowItem">
                        {item.amount}
                      </Text>
                      <Text variant="caption" className="experience__tableRowItem">
                        {item.rate}
                      </Text>
                    </Box>
                  ))
                : ''}
              {!isLoading && orders && !orders?.data.length ? <EmptyDataBox /> : ''}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Experience;
