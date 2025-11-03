import React, { type ReactNode } from 'react';
import { ErrorFallback } from './ErrorFallback';
import { ErrorBoundary } from './ErrorBoundary';
import { useErrorHandler } from '../../hooks/useErrorHandler';


interface ErrorHandlerProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error) => void;
}

export const ErrorHandler: React.FC<ErrorHandlerProps> = ({
  children,
  fallback,
  onError,
}) => {
  const { error, handleError, resetError, hasError } = useErrorHandler();

  React.useEffect(() => {
    if (error && onError) onError(error);
  }, [error, onError]);

  if (hasError) {
    return fallback ?? <ErrorFallback error={error ?? undefined} onRetry={resetError} />;
  }

  return (
    <ErrorBoundary onError={(err) => handleError(err)} fallback={fallback}>
      {children}
    </ErrorBoundary>
  );
};
