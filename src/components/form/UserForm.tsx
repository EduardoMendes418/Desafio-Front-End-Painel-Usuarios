
import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Button, MenuItem, Box, Alert } from '@mui/material';
import type { User } from '../../types/User';


interface UserFormProps {
  user?: User;
  onSave: (user: Omit<User, 'id'> & { id?: number }) => void;
  isSubmitting?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({ user, onSave, isSubmitting = false }) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [status, setStatus] = useState<User['status']>(user?.status || 'active');
  const [error, setError] = useState('');


  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setStatus(user?.status || 'active');
    setError('');
  }, [user]);

  const validateForm = (): string | null => {
    if (!name.trim() || !email.trim()) return 'Nome e e-mail são obrigatórios';
    if (!email.includes('@')) return 'E-mail inválido';
    return null;
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const validationError = validateForm();
      if (validationError) {
        setError(validationError);
        return;
      }

      onSave({
        id: user?.id,
        name: name.trim(),
        email: email.trim(),
        status,
      });
    },
    [name, email, status, onSave, user?.id]
  );

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
      <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : buttonLabel}
      </Button>
    </Box>
  );
};
