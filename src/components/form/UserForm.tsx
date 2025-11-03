import React from 'react';
import { TextField, Button, MenuItem, Box, Alert } from '@mui/material';
import type { User } from '../../types/User';
import { useUserForm } from '../../hooks/useUserForm';

interface UserFormProps {
  user?: User;
  onSave: (user: Omit<User, 'id'> & { id?: number }) => void;
  isSubmitting?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({ user, onSave, isSubmitting = false }) => {
  const { name, email, status, error, setName, setEmail, setStatus, handleSubmit } = useUserForm({
    user,
    onSave,
  });

  const buttonLabel = `${user ? 'Atualizar' : 'Criar'} Usuário`;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}
    >
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
        disabled={isSubmitting}
        autoFocus
      />
      <TextField
        label="E-mail"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        disabled={isSubmitting}
      />
      <TextField
        select
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value as User['status'])}
        fullWidth
        disabled={isSubmitting}
      >
        <MenuItem value="active">Ativo</MenuItem>
        <MenuItem value="inactive">Inativo</MenuItem>
      </TextField>
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isSubmitting}
        aria-label={buttonLabel}
      >
        {isSubmitting ? 'Salvando...' : buttonLabel}
      </Button>
    </Box>
  );
};
