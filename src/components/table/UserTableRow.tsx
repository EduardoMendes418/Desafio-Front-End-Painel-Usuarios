import React, { useCallback } from 'react';
import { TableRow, TableCell, Button, Chip } from '@mui/material';
import { DeleteDialog } from '../dialog/DeleteDialog';
import type { User } from '../../types/User';

interface UserTableRowProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export const UserTableRow: React.FC<UserTableRowProps> = ({ user, onEdit, onDelete }) => {
  const getStatusColor = useCallback(
    (status: User['status']) => (status === 'active' ? 'success' : 'error'),
    [],
  );

  const getStatusText = useCallback(
    (status: User['status']) => (status === 'active' ? 'Ativo' : 'Inativo'),
    [],
  );

  return (
    <TableRow hover>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <Chip label={getStatusText(user.status)} color={getStatusColor(user.status)} size="small" />
      </TableCell>
      <TableCell width="200px">
        <Button onClick={() => onEdit(user)} variant="outlined" size="small" sx={{ mr: 1 }}>
          Editar
        </Button>
        <DeleteDialog onConfirm={() => onDelete(user.id)} />
      </TableCell>
    </TableRow>
  );
};
