import { PropsWithChildren } from 'react';
import {
  QueryClient,
  QueryClientProvider as TanStackQueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: import.meta.env.DEV ? 0 : 60 * 1000,
    },
    mutations: {
      retry: false,
    },
  },
});

export default function QueryClientProvider({ children }: PropsWithChildren) {
  return (
    <TanStackQueryClientProvider client={queryClient}>
      {children}
    </TanStackQueryClientProvider>
  );
}
