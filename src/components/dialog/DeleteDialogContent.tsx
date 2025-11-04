import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Box,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface DeleteDialogContentProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteDialogContent: React.FC<DeleteDialogContentProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const dialogTitle = (
    <Box display="flex" alignItems="center" gap={1}>
      <WarningAmberIcon color="warning" aria-hidden="true" />
      Confirmar Exclusão
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      role="dialog"
      aria-modal="true"
    >
      <DialogTitle id="delete-dialog-title">
        {dialogTitle}
        <IconButton
          aria-label="Fechar diálogo de exclusão"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
          size="large"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography id="delete-dialog-description">
          Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} aria-describedby="delete-dialog-description">
          Cancelar
        </Button>
        <Button
          color="error"
          onClick={onConfirm}
          variant="contained"
          aria-describedby="delete-dialog-description"
          autoFocus
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};
