import { Loader } from 'components';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Currencies = lazy(() => import('pages/currencies'));
const AddCurrencies = lazy(() => import('pages/addCurrencies'));
const EditCurrencies = lazy(() => import('pages/editCurrencies'));

const CurrenciesRoute = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={<Currencies />} />
        <Route path="/add" element={<AddCurrencies />} />
        <Route path="/edit/:id" element={<EditCurrencies />} />
      </Routes>
    </Suspense>
  );
};

export default CurrenciesRoute;
