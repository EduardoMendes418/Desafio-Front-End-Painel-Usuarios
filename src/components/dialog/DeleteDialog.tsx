import React, { useState, useCallback } from 'react';
import { DeleteDialogTrigger } from './DeleteDialogTrigger';
import { DeleteDialogContent } from './DeleteDialogContent';

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

  return (
    <>
      <DeleteDialogTrigger onClick={handleOpen} />
      <DeleteDialogContent open={open} onClose={handleClose} onConfirm={handleConfirm} />
    </>
  );
};

export const DeleteDialog = React.memo(DeleteDialogComponent);
