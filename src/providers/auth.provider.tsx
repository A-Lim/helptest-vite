import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { DEV_TOKEN, DEV_USER } from '@/constants';
import { LoaderCircle } from 'lucide-react';

import { KubeUser } from '@/types/kube/kube-user.type';
import { httpRequest } from '@/lib/http-request';

type KubeAuth = {
  user: KubeUser;
  token: string;
};

export const AuthContext = createContext<KubeAuth | undefined>(undefined);

const AuthProvider = ({ children }: PropsWithChildren) => {
  // in DEV mode, get auth from constants
  let defaultAuth: KubeAuth | undefined = undefined;

  if (import.meta.env.DEV) {
    defaultAuth = {
      user: DEV_USER,
      token: DEV_TOKEN,
    };
    httpRequest.defaults.headers.common.Authorization = `Bearer ${DEV_TOKEN}`;
  }

  const [auth, _setAuth] = useState<KubeAuth | undefined>(defaultAuth);
  const setAuth = (auth: KubeAuth) => {
    _setAuth(auth);
    httpRequest.defaults.headers.common.Authorization = `Bearer ${auth.token}`;
  };

  if (import.meta.env.PROD) {
    useEffect(() => {
      const onMessageReceive = (event: any) => {
        if (event.origin == import.meta.env.VITE_PARENT_URL) {
          const data = event.data as { token: string; user: KubeUser };
          setAuth(data);
        }
      };
      window.addEventListener('message', onMessageReceive);

      return () => window.removeEventListener('message', onMessageReceive);
    });
  }

  if (!auth) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-stone-950/50 transition-opacity">
        <div className="flex gap-2 animate-pulse">
          <LoaderCircle className="animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        token: auth.token,
        user: auth.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
