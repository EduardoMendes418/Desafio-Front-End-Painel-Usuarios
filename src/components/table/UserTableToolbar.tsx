import React from 'react';
import { Box, TextField, TableSortLabel } from '@mui/material';

interface UserTableToolbarProps {
  filter: string;
  onFilterChange: (value: string) => void;
  sortOrder: 'asc' | 'desc';
  onSort: () => void;
}

export const UserTableToolbar: React.FC<UserTableToolbarProps> = ({
  filter,
  onFilterChange,
  sortOrder,
  onSort,
}) => {
  return (
    <Box display="flex" flexDirection="column" gap={2} mb={2}>
      <TextField
        label="Buscar usuários"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        fullWidth
      />

      <Box display="flex" justifyContent="flex-start">
        <TableSortLabel active direction={sortOrder} onClick={onSort}>
          Nome
        </TableSortLabel>
      </Box>
    </Box>
  );
};
