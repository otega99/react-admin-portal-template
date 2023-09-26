import { Box, Container, Skeleton, Text, Button } from 'components';
import { CURRENCIES_PAGE_SIZE } from 'constants/index';
import { useAuth } from 'contexts/AuthProvider';
import { useGetCurrencies, usePaginationBackend } from 'hooks';
import { ContentMgtLayout } from 'layouts';
import { Path } from 'navigations/routes';
import CurrenciesTable from './components/currenciesTable';
import './currencies.scss';

export interface CurrenciesI {
  currency: string;
  dateAdded: string;
  buyRate: string;
  sellRate: string;
}

const Currencies = () => {
  const { page } = usePaginationBackend({
    updateFromQuery: true
  });

  const { token } = useAuth();

  const { data, isLoading, error, refetch } = useGetCurrencies({
    PageNumber: Number(page) || 1,
    PageSize: CURRENCIES_PAGE_SIZE,
    token
  });
  return (
    <ContentMgtLayout header="Currency Rates">
      <Box className="currencies">
        <Container className="currencies__container">
          <Box className="currencies__head">
            <Text as="h2" variant="h5" className="currencies__header">
              All Rate{isLoading && <Skeleton className="currencies__headSkeleton" />}
              {!isLoading && data && <span>({data?.pageInfo.totalCount})</span>}
            </Text>
            <Button as="link" to={`${Path.Currencies}/add`}>
              Add Currency
            </Button>
          </Box>
          <CurrenciesTable
            isLoading={isLoading}
            pageInfo={data?.pageInfo}
            data={data?.data || []}
            error={error}
            refetch={refetch}
          />
        </Container>
      </Box>
    </ContentMgtLayout>
  );
};

export default Currencies;
