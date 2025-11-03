import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface DeleteDialogProps {
  onConfirm: () => void;
}

const DeleteDialogComponent: React.FC<DeleteDialogProps> = ({ onConfirm }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const handleConfirm = useCallback(() => {
    onConfirm();
    handleClose();
  }, [onConfirm, handleClose]);

  const dialogTitle = (
    <Box display="flex" alignItems="center" gap={1}>
      <WarningAmberIcon color="warning" />
      Confirmar Exclusão
    </Box>
  );

  const dialogDescription = "Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.";

  return (
    <>
      <Button 
        color="error" 
        variant="outlined" 
        size="small"
        onClick={handleOpen}
      >
        Excluir
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          {dialogTitle}
          <IconButton
            aria-label="Fechar"
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography id="delete-dialog-description">{dialogDescription}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button color="error" onClick={handleConfirm} variant="contained">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const DeleteDialog = React.memo(DeleteDialogComponent);
