import React from 'react';
import { useLocation, Navigate } from "react-router-dom";
import { useAppContext } from '../hooks/useAppContext';

interface IPrivateRouteProps {
  component: React.FunctionComponent;
  permissions?: string[];
}

function PrivateRoute({ component: Component, permissions }: IPrivateRouteProps) {

  const location = useLocation();
  const permissionsDefaultAllowed: string[] = [];

  const { user } = useAppContext();

  const token = sessionStorage.getItem(String(import.meta.env.VITE_SESSION_KEY))

  if (!user || !token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  const user_permissions = user.permissions.map(item => item.identifier);

  if (permissions !== undefined) {
    permissionsDefaultAllowed.push(...permissions);
  }

  const permissions_match = user_permissions.filter(perm => {
    if (permissionsDefaultAllowed.includes(perm)) return true
  }).map(item => item);

  if (!(permissions_match.length > 0) && permissionsDefaultAllowed.length > 0) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Component />;

}

export default PrivateRoute;
