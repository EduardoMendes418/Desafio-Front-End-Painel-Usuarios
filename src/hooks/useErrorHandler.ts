import React from 'react';

export const useErrorHandler = () => {
  const [error, setError] = React.useState<Error | null>(null);

  const handleError = (error: Error) => {
    console.error('Erro capturado:', error);
    setError(error);
  };

  const resetError = () => setError(null);

  return {
    error,
    hasError: !!error,
    handleError,
    resetError,
  };
};
