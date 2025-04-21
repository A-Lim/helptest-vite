import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { scan } from 'react-scan';

import './index.css';

import App from './App.tsx';
import { Toaster } from './components/ui/sonner.tsx';
import AuthProvider from './providers/auth.provider.tsx';
import QueryClientProvider from './providers/query-client.provider.tsx';

scan({
  enabled: import.meta.env.DEV,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
    <Toaster richColors />
  </StrictMode>,
);
