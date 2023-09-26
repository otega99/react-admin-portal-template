import { Box, Container, Skeleton, Text, Button } from 'components';
import { TRANSACTIONS_PAGE_SIZE } from 'constants/index';
import { useAuth } from 'contexts/AuthProvider';
import { usePaginationBackend, useGetTransactions } from 'hooks';
import { ContentMgtLayout } from 'layouts';
import Select from 'react-select';
import TransactionTable from './components/transactionTable';
import './transactions.scss';
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface TransactionI {
  name: string;
  paymentId: string;
  sell: string;
  buy: string;
  amount: string;
  rate: string;
  status: string;
}

export interface SearchForm {
/*   searchperiod: string;
  searchitem: string; */
  searchdownload: string;
}

const initialState: SearchForm = {
  /* searchperiod: 'select',
  searchitem: 'select', */
  searchdownload: 'select'
};

const Transactions = () => {
  const { token } = useAuth();
  const { page } = usePaginationBackend({
    updateFromQuery: true
  });

  const options = [
    { value: 'select', label: 'Sort by' },
    { value: 'name', label: 'Name' },
    { value: 'buy', label: 'Buy' },
    { value: 'sell', label: 'Sell' }
  ];

  const download = [
    { value: 'select', label: 'Download Transactions' },
    { value: 'csv', label: 'Download as CSV' },
    { value: 'pdf', label: 'Download as PDF' }
  ];

  const period = [
    { value: 'select', label: 'Select Period' },
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' }
  ];

  const {
    data: transactions,
    isLoading,
    error,
    refetch
  } = useGetTransactions({
    PageNumber: Number(page) || 1,
    PageSize: TRANSACTIONS_PAGE_SIZE,
    token
  });

  const [searchtext, setText] = useState('');
  const [datalist, setdata] = useState(transactions?.data);

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setText(event.target.value);
    searchitem();
  };

  const searchitem = () => {
    if (searchtext == '') {
      setdata(transactions?.data) ;
    } else {
      setdata(transactions?.data.filter(e => e.paymentId.includes(searchtext) )) ;
    }
    
  }

  const downloadTransactions = () => {
    const doc = new jsPDF();
    const data = datalist?.map(({ name, paymentId, sell, buy, amount, rate, status }) => [name, paymentId, sell, buy, amount, rate, status]);
    autoTable(doc,{
      head: [['Name', 'Payment ID', 'Sell', 'Buy', 'Amount', 'Rate', 'Status']],
      body: data
    });
    doc.save('transactions.pdf');
  }

  
  return (
    <ContentMgtLayout header="Transactions">
      <Box className="transactions">
        <Container className="transactions__container">
          <Box className="transactions__head">
            <Text as="h2" variant="h5" className="transactions__header">
              All Transactions {isLoading && <Skeleton className="transactions__headSkeleton" />}
              {!isLoading && transactions && <span>({transactions?.pageInfo.totalCount})</span>}
            </Text>
           <Box className="search" >

           <input type="text"  value={searchtext} onChange={handleChange} />
          
           <Button onClick={searchitem} >
              Search
          </Button>

           <Select
                name="searchdownload"
                options={download}
                className="select"
                defaultValue={download[0]}
                onChange={(selectedOption) => {
                  if (selectedOption && selectedOption.value === 'pdf' && selectedOption.label === 'Download as PDF') {
                    downloadTransactions();
                  }
                }}
              />
           </Box>
            
           
          </Box>

          <TransactionTable
            isLoading={isLoading}
            pageInfo={transactions?.pageInfo}
            data={datalist}
            error={error}
            refetch={refetch}
          />
        </Container>
      </Box>
    </ContentMgtLayout>
  );
};

export default Transactions;
