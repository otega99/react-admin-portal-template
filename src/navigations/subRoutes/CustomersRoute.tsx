import { Loader } from 'components';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Customers = lazy(() => import('pages/customers'));
const SingleCustomer = lazy(() => import('pages/singleCustomer'));

const CurrenciesRoute = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={<Customers />} />
        <Route path="/:id" element={<SingleCustomer />} />
      </Routes>
    </Suspense>
  );
};

export default CurrenciesRoute;
