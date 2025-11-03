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
    ContentProps={{
      sx: {
        backgroundColor: severity === 'error' ? 'error.main' : 'success.main',
        color: 'white',
      },
    }}
  />
);
