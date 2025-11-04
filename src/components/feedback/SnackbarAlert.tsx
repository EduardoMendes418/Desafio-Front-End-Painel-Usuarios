import { Snackbar } from '@mui/material';

interface SnackbarAlertProps {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
  onClose: () => void;
}

export const SnackbarAlert: React.FC<SnackbarAlertProps> = ({
  open,
  message,
  severity,
  onClose,
}) => (
  <Snackbar
    open={open}
    autoHideDuration={4000}
    onClose={onClose}
    message={message}
    role="status"
    aria-live="polite"
    aria-atomic="true"
    ContentProps={{
      sx: {
        backgroundColor: severity === 'error' ? 'error.main' : 'success.main',
        color: 'white',
      },
      role: severity === 'error' ? 'alert' : 'status',
    }}
  />
);
