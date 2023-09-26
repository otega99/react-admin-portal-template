import { Loader } from 'components';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Admin = lazy(() => import('pages/admin'));
const AddAdmin = lazy(() => import('pages/addAdmin'));
const SingleAdmin = lazy(() => import('pages/singleAdmin'));

const CurrenciesRoute = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={<Admin />} />
        <Route path="/add" element={<AddAdmin />} />
        <Route path="/:id" element={<SingleAdmin />} />
      </Routes>
    </Suspense>
  );
};

export default CurrenciesRoute;
