import { Box, Container, Skeleton, Text, Form } from 'components';
import { CUSTOMERS_PAGE_SIZE } from 'constants/index';
import { useAuth } from 'contexts/AuthProvider';
import { usePaginationBackend, useGetCustomers } from 'hooks';
import { ContentMgtLayout } from 'layouts';
import Select from 'react-select';
import ReferralTable from './components/referralTable';
import './refferal.scss';
import { ReferralI, ReferralData, ReferralDemoData } from './referralData';

export interface SearchForm {
  searchfilter: string;
  searchsort: string;
  searchdownload: string;
}

const initialState: SearchForm = {
  searchfilter: 'select',
  searchsort: 'select',
  searchdownload: 'select'
};

const Referral = () => {
  const { page } = usePaginationBackend({
    updateFromQuery: true
  });

  const { token } = useAuth();

  const download = [
    { value: 'select', label: 'Download Transactions' },
    { value: 'csv', label: 'Download as CSV' },
    { value: 'pdf', label: 'Download as PDF' }
  ];

  const optionfilter = [
    { value: 'select', label: 'Filter By' },
    { value: 'approved', label: 'Approved' },
    { value: 'pending', label: 'Pending' }
  ];

  const optionsort = [
    { value: 'select', label: 'Sort By' },
    { value: 'oldtonew', label: 'Old to New' },
    { value: 'newtoold', label: 'New to Old' }
  ];
  const handleSubmit = () => {
    console.log('handleSubmit');
  };

  const tryrun = () => {
    console.log('tryrun');
  };

  const getLocalData = () => {
    return { data: ReferralDemoData, isLoading: false, error: null, refetch: tryrun };
  };

  const { data, isLoading, error, refetch } = getLocalData();
  return (
    <ContentMgtLayout header="Referrals">
      <Box className="app">
        <Container className="app__container">
          <Box className="app__head">
            <Text as="h2" variant="h5" className="app__header">
              Referrals {isLoading && <Skeleton className="app__headSkeleton" />}
            </Text>
            <Form<SearchForm>
              onSubmit={handleSubmit}
              initialValues={initialState}
              className="search">
              <Select
                name="searchfilter"
                options={optionsort}
                className="select"
                defaultValue={optionsort[0]}
              />
              <Select
                name="searchsort"
                options={optionfilter}
                className="select"
                defaultValue={optionfilter[0]}
              />
              <Select
                name="searchdownload"
                options={download}
                className="select"
                defaultValue={download[0]}
              />
            </Form>
          </Box>

          <ReferralTable
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

export default Referral;
