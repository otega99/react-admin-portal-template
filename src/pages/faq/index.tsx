import React from 'react';
import { Box, Button, Container, Skeleton, Text } from 'components';
import { FAQ_PAGE_SIZE } from 'constants/index';
import { useGetFaqs, usePaginationBackend } from 'hooks';
import { ContentMgtLayout } from 'layouts';
import { Path } from 'navigations/routes';
import FaqGrid from './components/faqGrid';
import './faq.scss';
import { useAuth } from 'contexts/AuthProvider';

const Faq = () => {
  const { page } = usePaginationBackend({
    updateFromQuery: true
  });
  const { token } = useAuth();

  const { data, isLoading, error, refetch } = useGetFaqs({
    PageNumber: Number(page) || 1,
    PageSize: FAQ_PAGE_SIZE,
    token
  });

  return (
    <ContentMgtLayout header="FAQ">
      <Box className="faq">
        <Container className="faq__container">
          <Box className="faq__head">
            <Text as="h2" variant="h5" className="faq__header">
              All FAQ {isLoading && <Skeleton className="faq__headSkeleton" />}
              {!isLoading && data && <span>({data?.pageInfo.totalCount})</span>}
            </Text>
            <Button as="link" to={`${Path.FAQ}/add`}>
              Add FAQ
            </Button>
          </Box>
          <FaqGrid
            error={error}
            refetch={refetch}
            isLoading={isLoading}
            pageInfo={data?.pageInfo}
            data={data?.data || []}
          />
        </Container>
      </Box>
    </ContentMgtLayout>
  );
};

export default Faq;
