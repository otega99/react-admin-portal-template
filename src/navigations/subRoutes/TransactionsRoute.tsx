import { Loader } from 'components';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Transactions = lazy(() => import('pages/transactions'));
const SingleTransactions = lazy(() => import('pages/singleTransaction'));

const TransactionsRoute = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={<Transactions />} />
        <Route path="/:id" element={<SingleTransactions />} />
      </Routes>
    </Suspense>
  );
};

export default TransactionsRoute;
