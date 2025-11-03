import React, { useState, useMemo, useCallback } from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Box,
} from '@mui/material';
import type { User } from '../../types/User';
import { UserTableToolbar } from './UserTableToolbar';
import { UserTableRow } from './UserTableRow';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserTableComponent: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = useCallback(() => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  const filteredAndSortedUsers = useMemo(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(filter.toLowerCase()) ||
        user.email.toLowerCase().includes(filter.toLowerCase()),
    );

    return filtered.sort((a, b) =>
      sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
  }, [users, filter, sortOrder]);

  const noUsersMessage =
    users.length === 0 ? 'Nenhum usuário cadastrado' : 'Nenhum usuário encontrado';

  return (
    <Box>
      <UserTableToolbar
        filter={filter}
        onFilterChange={setFilter}
        sortOrder={sortOrder}
        onSort={handleSort}
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
                <TableCell>Nome</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Status</TableCell>
                <TableCell width="200px">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAndSortedUsers.map((user) => (
                <UserTableRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export const UserTable = React.memo(UserTableComponent);
