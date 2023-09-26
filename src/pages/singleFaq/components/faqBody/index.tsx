import { AxiosError } from 'axios';
import { Box, ErrorBox, Image, Skeleton, Text } from 'components';
import { baseURL } from 'config/AxiosConfig';
import React from 'react';
import Api from 'types/client';

interface Props {
  isLoading: boolean;
  data: Api.Faq.GetSingleFaq.Response | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: AxiosError<Api.Responses.Error, any> | null;
  refetch: () => void;
}

const FaqBody = ({ data, isLoading, error, refetch }: Props) => {
  const imgSrc = `${baseURL}/static/images/${data?.data?.coverImagePath}`;
  return (
    <Box className="sFaq__body">
      {!isLoading && error && <ErrorBox handleRetry={refetch} />}
      {!error && (
        <>
          <Box className="sFaq__details">
            <Box className="sFaq__imgDiv">
              {isLoading && <Skeleton className="sFaq__ImgSkeleton" />}
              {!isLoading && data && <Image alt={data?.data?.title} src={imgSrc} />}
            </Box>
            {/* <Text className="sFaq__date">Added on the October 21st, 2021</Text> */}
            {isLoading && <Skeleton className="sFaq__bodySkeleton" />}
            {!isLoading && data && <Text>{data?.data?.body}</Text>}
          </Box>
        </>
      )}
    </Box>
  );
};

export default FaqBody;
