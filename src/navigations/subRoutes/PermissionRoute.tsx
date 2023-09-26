import { Loader } from 'components';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Permissions = lazy(() => import('pages/permissions'));
// const SinglePermission = lazy(() => import('pages/singlePermission'));

const TransactionsRoute = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={<Permissions />} />
        {/* <Route path="/:id" element={<SinglePermission />} /> */}
      </Routes>
    </Suspense>
  );
};

export default TransactionsRoute;
