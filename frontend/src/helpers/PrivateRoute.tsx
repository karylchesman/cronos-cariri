import React, { useContext } from 'react';
import { useLocation, Navigate } from "react-router-dom";
import { EUserRoles } from '../@types/users';
import { useAppContext } from '../hooks/useAppContext';

interface IPrivateRouteProps {
  component: React.FunctionComponent;
  permissions?: EUserRoles[];
}

function PrivateRoute({ component: Component, permissions }: IPrivateRouteProps) {

  const location = useLocation();
  const permissionsAllowed = [EUserRoles["Administrador"]];

  const { user } = useAppContext();

  const token = localStorage.getItem(String(import.meta.env.SESSION_KEY))

  if (!user || !token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (permissions !== undefined) {
    permissionsAllowed.push(...permissions);

    if (user !== null && permissions.includes(user.role)) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  }

  return <Component />;

}

export default PrivateRoute;
