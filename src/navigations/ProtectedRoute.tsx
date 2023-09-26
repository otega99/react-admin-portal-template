import { STORAGE_USER } from 'constants/index';
import { useAppLocation } from 'hooks';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<Props> = ({ isAuthenticated }) => {
  const { pathname } = useAppLocation();

  if (!isAuthenticated && !localStorage.getItem(STORAGE_USER)) {
    /** this is used to get the page the user wanted to go to initially
     *  after getting it, we send it as state to the login page
     *  after successful login, we can take it from the state in the login page and redirect the user there
     */

    const previousPage = pathname;
    return <Navigate to="/login" state={{ from: previousPage }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
