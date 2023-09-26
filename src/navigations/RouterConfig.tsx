import { Loader } from 'components';
import { useAuth } from 'contexts/AuthProvider';
import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { Path } from './routes';

const Login = lazy(() => import('pages/login'));
const ForgotPwd = lazy(() => import('pages/forgotPwd'));
const Dashboard = lazy(() => import('pages/dashboard'));
const Permission = lazy(() => import('pages/permissions'));
const Referral = lazy(() => import('pages/referral'));
const Settings = lazy(() => import('pages/settings'));
const Profile = lazy(() => import('pages/profile'));
const NotFound = lazy(() => import('pages/404'));
const ReferralsRoute = lazy(() => import('./subRoutes/ReferralsRoute'));
const TransactionsRoute = lazy(() => import('./subRoutes/TransactionsRoute'));
const CurrenciesRoute = lazy(() => import('./subRoutes/CurrenciesRoute'));
const CustomersRoute = lazy(() => import('./subRoutes/CustomersRoute'));
const AdminRoute = lazy(() => import('./subRoutes/AdminRoute'));
const FaqRoute = lazy(() => import('./subRoutes/FaqRoute'));

const RouterConfig = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path={Path.Home}
          element={
            isAuthenticated ? (
              <Navigate to={Path.Dashboard} replace />
            ) : (
              <Navigate to={Path.Login} replace />
            )
          }
        />
        <Route
          path={Path.Login}
          element={isAuthenticated ? <Navigate to={Path.Dashboard} replace /> : <Login />}
        />
        <Route
          path={Path.ForgotPwd}
          element={isAuthenticated ? <Navigate to={Path.Dashboard} replace /> : <ForgotPwd />}
        />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path={Path.Dashboard} element={<Dashboard />} />
          <Route path={Path.Settings} element={<Settings />} />
          <Route path={Path.Profile} element={<Profile />} />
          <Route path={Path.Permission} element={<Permission />} />
          <Route path={Path.Referral} element={<Referral />} />
          <Route path={`${Path.Transactions}/*`} element={<TransactionsRoute />} />
          <Route path={`${Path.Referrals}/*`} element={<ReferralsRoute />} />
          <Route path={`${Path.Currencies}/*`} element={<CurrenciesRoute />} />
          <Route path={`${Path.Customers}/*`} element={<CustomersRoute />} />
          <Route path={`${Path.Admin}/*`} element={<AdminRoute />} />
          <Route path={`${Path.FAQ}/*`} element={<FaqRoute />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RouterConfig;
