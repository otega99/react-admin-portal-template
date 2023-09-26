// import { rateCurve } from 'assets';
import { euIcon, ukIcon, usaIcon } from 'assets';
import { AxiosError } from 'axios';
import { Box, ErrorBox, Skeleton, Text } from 'components';
import React from 'react';
import Api from 'types/client';
import './rateCard.scss';

interface Props {
  image: string;
  header: string;
  subHeader: string;
  status: string;
  rate1: number | undefined;
  rate2: number | undefined;
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: AxiosError<Api.Responses.Error, any> | null;
  refetch: () => void;
}

const handleSelection = (header: string) => {
  if (header.toLowerCase() === 'usd') {
    return {
      header: 'USD',
      subHeader: 'US Dollar',
      symbol: '$',
      image: usaIcon
    };
  } else if (header.toLowerCase() === 'eur') {
    return {
      header: 'EUR',
      subHeader: 'Euro',
      symbol: '€',
      image: euIcon
    };
  } else if (header.toLowerCase() === 'gbp') {
    return {
      header: 'GBP',
      subHeader: 'Pounds',
      symbol: '£',
      image: ukIcon
    };
  }
};

const RateCard: React.FC<Props> = ({
  header,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  image,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  subHeader,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  status,
  rate1,
  rate2,
  isLoading,
  error,
  refetch
}) => {
  const data = handleSelection(header);
  return (
    <Box className="rateCard">
      {!isLoading && error && <ErrorBox handleRetry={refetch} />}
      {!error && (
        <>
          <Box className="rateCard__top">
            {isLoading && <Skeleton className="rateCard__topSkeleton" />}
            {!isLoading && data && (
              <Box className="rateCard__countryDiv">
                <Box className="rateCard__imgDiv">
                  <img src={data?.image} alt="" />
                </Box>
                <Box>
                  <Text className="rateCard__header">{data?.header}</Text>
                  <Text variant="caption">{data?.subHeader}</Text>
                </Box>
              </Box>
            )}
            {/* <Text className="rateCard__status">{status}</Text> */}
          </Box>
          <Box className="rateCard__bottom">
            <Box className="rateCard__bottomContainer">
              {isLoading && (
                <Box className="rateCard__bottomSkeletonDiv">
                  {[...Array(2)].map((item, index) => (
                    <Skeleton key={index} className="rateCard__bottomSkeleton" />
                  ))}
                </Box>
              )}
              {!isLoading && data && (
                <>
                  <Text>
                    Buy Rate -{' '}
                    <span className="rateCard__strong">
                      {data?.symbol}
                      {rate1 || 0}
                    </span>
                  </Text>
                  <Text>
                    Sell Rate -{' '}
                    <span className="rateCard__strong">
                      {data?.symbol}
                      {rate2 || 0}
                    </span>
                  </Text>
                </>
              )}
            </Box>
            {/* <Box>
          <img src={rateCurve} alt="" />
        </Box> */}
          </Box>
        </>
      )}
    </Box>
  );
};

export default RateCard;
