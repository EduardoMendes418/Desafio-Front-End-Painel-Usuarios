import React from 'react';
import { UsersPage } from './pages/UsersPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './components/boundary/ErrorBoundary';
import { UsersProvider } from './contexts/UsersContext';
import { AppThemeProvider } from './contexts/ThemeContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <AppThemeProvider>
        <UsersProvider>
          <UsersPage />
        </UsersProvider>
      </AppThemeProvider>
    </ErrorBoundary>
  </QueryClientProvider>
);

export default App;