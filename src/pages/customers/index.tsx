import { Box,Button, Container, Skeleton, Text } from 'components';
import { CUSTOMERS_PAGE_SIZE } from 'constants/index';
import { useAuth } from 'contexts/AuthProvider';
import { usePaginationBackend, useGetCustomers } from 'hooks';
import { ContentMgtLayout } from 'layouts';
import React, {useState} from 'react';
import CustomersTable from './components/customersTable';
import './customers.scss';

export interface CustomersI {
  name: string;
  email: string;
  phone: string;
  registeredDate: string;
  lastLogged: string;
  image: string;
}

const Customers = () => {
  const { page } = usePaginationBackend({
    updateFromQuery: true
  });

  const { token } = useAuth();

  const { data, isLoading, error, refetch } = useGetCustomers({
    PageNumber: Number(page) || 1,
    PageSize: CUSTOMERS_PAGE_SIZE,
    token
  });

    const [searchtext, setText] = useState('');
    const [datalist, setdata] = useState(data?.data);

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setText(event.target.value);
      searchitem();
    };

    const searchitem = () => {
      if (searchtext == '') {
        setdata(data?.data) ;
      } else {
        setdata(data?.data.filter(e => (e.firstName+" "+e.lastName).includes(searchtext) )) ;
      }
      
    }

  return (
    <ContentMgtLayout header="Customers">
      <Box className="customers">
        <Container className="customers__container">
          <Box className="customers__head">
            <Text as="h2" variant="h5" className="customers__header">
              All Customers{isLoading && <Skeleton className="customers__headSkeleton" />}
              {!isLoading && data && <span>({data?.pageInfo.totalCount})</span>}
            </Text>
          </Box>
          <Box className="search" >
            <input type="text"  value={searchtext} onChange={handleChange} />
            <Button onClick={searchitem} >
              Search
            </Button>
          </Box>
          <CustomersTable
            error={error}
            refetch={refetch}
            isLoading={isLoading}
            pageInfo={data?.pageInfo}
            data={datalist || []}
          />
        </Container>
      </Box>
    </ContentMgtLayout>
  );
};

export default Customers;
