import { Loader } from 'components';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Faq = lazy(() => import('pages/faq'));
const AddFaq = lazy(() => import('pages/addFaq'));
const SingleFaq = lazy(() => import('pages/singleFaq'));

const CurrenciesRoute = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={<Faq />} />
        <Route path="/add" element={<AddFaq />} />
        <Route path="/:id" element={<SingleFaq />} />
      </Routes>
    </Suspense>
  );
};

export default CurrenciesRoute;
