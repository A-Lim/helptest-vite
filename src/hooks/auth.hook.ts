import { useContext } from 'react';
import { AuthContext } from '@/providers/auth.provider';
import { toast } from 'sonner';

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    toast.error('Auth data not found.');
    throw new Error('Auth data not found.');
  }

  const company = auth.user?.userProfileFields.find(
    (x) => x.code === 'Company',
  )?.value;

  if (!company) {
    toast.error('User does not have a company.');
    throw new Error('User does not have a company.');
  }

  return {
    token: auth.token,
    user: auth.user,
    company: company,
  };
};
