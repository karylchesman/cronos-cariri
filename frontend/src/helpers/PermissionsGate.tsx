import { ReactNode } from 'react';
import { EUserRoles } from '../@types/users';
import { useAppContext } from '../hooks/useAppContext';

interface IPermissionsGateProps {
  children: ReactNode;
  permissions?: EUserRoles[];
}

function PermissionsGate({ children, permissions }: IPermissionsGateProps) {

  const permissionsAllowed = [EUserRoles["Administrador"]];
  
  const { user } = useAppContext();

  if (!user) {
    return null;
  }

  if (permissions !== undefined) {
    permissionsAllowed.push(...permissions);
  }

  if (user !== null && !permissionsAllowed.includes(user.role)) {
    return null;
  }

  return (<>{children}</>)

}

export default PermissionsGate;
