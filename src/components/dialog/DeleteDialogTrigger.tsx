import React from 'react';
import { Button } from '@mui/material';

interface DeleteDialogTriggerProps {
  onClick: () => void;
}

export const DeleteDialogTrigger: React.FC<DeleteDialogTriggerProps> = ({ onClick }) => (
  <Button color="error" variant="outlined" size="small" onClick={onClick}>
    Excluir
  </Button>
);
