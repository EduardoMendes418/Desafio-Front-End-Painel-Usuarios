import React, { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './components/boundary/ErrorBoundary';
import { UsersProvider } from './contexts/UsersContext';
import { AppThemeProvider } from './contexts/ThemeContext';
import { CircularProgress, Box } from '@mui/material';

const UsersPage = lazy(() => import('../src/pages/UsersPage'));

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
          <Suspense
            fallback={
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100vh"
              >
                <CircularProgress />
              </Box>
            }
          >
            <UsersPage />
          </Suspense>
        </UsersProvider>
      </AppThemeProvider>
    </ErrorBoundary>
  </QueryClientProvider>
);

export default App;
