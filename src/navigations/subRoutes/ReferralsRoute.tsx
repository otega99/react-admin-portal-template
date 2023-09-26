import { Loader } from 'components';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Referral = lazy(() => import('pages/referral'));
const SingleReferral = lazy(() => import('pages/singleReferral'));

const ReferralsRoute = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={<Referral />} />
        <Route path="/:id" element={<SingleReferral />} />
      </Routes>
    </Suspense>
  );
};

export default ReferralsRoute;
