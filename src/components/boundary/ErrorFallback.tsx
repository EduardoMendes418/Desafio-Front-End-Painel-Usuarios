import React from 'react';
import { Box, Typography, Button, Paper, Alert, Container, useTheme } from '@mui/material';
import { Refresh, ErrorOutline } from '@mui/icons-material';

interface ErrorFallbackProps {
  error?: Error;
  onRetry?: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, onRetry }) => {
  const theme = useTheme();

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        textAlign="center"
        px={2}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <ErrorOutline
            color="error"
            sx={{ fontSize: 64, mb: 3, opacity: 0.8 }}
            aria-hidden="true"
          />

          <Typography variant="h4" gutterBottom fontWeight="medium" id="error-fallback-title">
            Ops! Algo deu errado
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3 }}
            id="error-fallback-description"
          >
            Encontramos um problema inesperado. Por favor, tente recarregar a página ou voltar mais
            tarde.
          </Typography>

          {onRetry && (
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<Refresh />}
              onClick={onRetry}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1,
                textTransform: 'none',
                fontWeight: 'medium',
              }}
              aria-describedby="error-fallback-description"
              autoFocus
            >
              Tentar Novamente
            </Button>
          )}

          {error && (
            <Box sx={{ mt: 3 }}>
              <Alert severity="error" sx={{ textAlign: 'left' }} role="status">
                <Typography variant="subtitle2" gutterBottom>
                  Detalhes do erro:
                </Typography>
                <Typography
                  variant="body2"
                  component="pre"
                  sx={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    fontSize: '0.75rem',
                    mt: 1,
                    fontFamily: 'monospace',
                  }}
                  aria-label="Detalhes técnicos do erro"
                >
                  {error.toString()}
                </Typography>
              </Alert>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};
