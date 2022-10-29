import { ReactNode } from 'react';
import { useAppContext } from '../hooks/useAppContext';

interface IPermissionsGateProps {
  children: ReactNode;
  permissions?: string[];
}

function PermissionsGate({ children, permissions }: IPermissionsGateProps) {

  const permissionsDefaultAllowed = [""];

  const { user } = useAppContext();

  if (!user) {
    return null;
  }

  const user_permissions = user.permissions.map(item => item.identifier);

  if (permissions !== undefined) {
    permissionsDefaultAllowed.push(...permissions);
  }

  const permissions_match = user_permissions.filter(perm => {
    if (permissionsDefaultAllowed.includes(perm)) return true
  }).map(item => item);

  if (!(permissions_match.length > 0)) {
    return null;
  }

  return (<>{children}</>)

}

export default PermissionsGate;
