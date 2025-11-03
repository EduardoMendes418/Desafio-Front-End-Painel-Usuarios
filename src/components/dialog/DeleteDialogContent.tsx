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
      <WarningAmberIcon color="warning" />
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
    >
      <DialogTitle id="delete-dialog-title">
        {dialogTitle}
        <IconButton
          aria-label="Fechar"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
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
        <Button onClick={onClose}>Cancelar</Button>
        <Button color="error" onClick={onConfirm} variant="contained">
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};
