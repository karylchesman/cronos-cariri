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

  if (permissions !== undefined) {
    permissionsDefaultAllowed.push(...permissions);
  }

  const permissions_match = user.permissions.filter(perm => {
    if (permissionsDefaultAllowed.includes(perm)) return true
  }).map(item => item);

  if (!(permissions_match.length > 0)) {
    return null;
  }

  return (<>{children}</>)

}

export default PermissionsGate;
