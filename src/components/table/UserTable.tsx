
import React, { useState, useMemo, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Button,
  Paper,
  Box,
  Chip,
  Typography,
} from '@mui/material';
import type { User } from '../../types/User';
import { DeleteDialog } from '../dialog/DeleteDialog';


interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserTableComponent: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = useCallback(() => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  const filteredAndSortedUsers = useMemo(() => {
    const filtered = users.filter(
      user =>
        user.name.toLowerCase().includes(filter.toLowerCase()) ||
        user.email.toLowerCase().includes(filter.toLowerCase())
    );

    return filtered.sort((a, b) =>
      sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
  }, [users, filter, sortOrder]);

  const getStatusColor = useCallback((status: User['status']) => {
    return status === 'active' ? 'success' : 'error';
  }, []);

  const getStatusText = useCallback((status: User['status']) => {
    return status === 'active' ? 'Ativo' : 'Inativo';
  }, []);

  const noUsersMessage =
    users.length === 0 ? 'Nenhum usuário cadastrado' : 'Nenhum usuário encontrado';

  return (
    <Box>
      <TextField
        label="Buscar usuários"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      {filteredAndSortedUsers.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
          {noUsersMessage}
        </Typography>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active
                    direction={sortOrder}
                    onClick={handleSort}
                  >
                    Nome
                  </TableSortLabel>
                </TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Status</TableCell>
                <TableCell width="200px">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAndSortedUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(user.status)}
                      color={getStatusColor(user.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => onEdit(user)}
                      variant="outlined"
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      Editar
                    </Button>
                    <DeleteDialog onConfirm={() => onDelete(user.id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export const UserTable = React.memo(UserTableComponent);
