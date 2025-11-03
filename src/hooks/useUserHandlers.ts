import { useState, useCallback, useMemo } from 'react';
import type { User } from '../types/User';
import { useUsersContext } from '../contexts/UsersContext';

type SnackbarState = {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
};

export const useUserHandlers = () => {
  const { usersQuery, createMutation, updateMutation, deleteMutation } = useUsersContext();
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success',
  });

  const showSnackbar = useCallback((message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const handleSave = useCallback(
    (userData: Omit<User, 'id'> & { id?: number }) => {
      const isUpdate = Boolean(userData.id);
      const mutation = isUpdate ? updateMutation : createMutation;

      mutation.mutate(userData as User, {
        onSuccess: () => {
          if (isUpdate) setEditingUser(undefined);
          showSnackbar(`Usuário ${isUpdate ? 'atualizado' : 'criado'} com sucesso!`);
        },
        onError: (error) => {
          showSnackbar(
            error.message || `Erro ao ${isUpdate ? 'atualizar' : 'criar'} usuário`,
            'error',
          );
        },
      });
    },
    [createMutation, updateMutation, showSnackbar],
  );

  const handleEdit = useCallback((user: User) => setEditingUser(user), []);
  const handleCancelEdit = useCallback(() => setEditingUser(undefined), []);

  const handleDelete = useCallback(
    (id: number) => {
      deleteMutation.mutate(id, {
        onSuccess: () => showSnackbar('Usuário excluído com sucesso!'),
        onError: (error) => showSnackbar(error.message || 'Erro ao excluir usuário', 'error'),
      });
    },
    [deleteMutation, showSnackbar],
  );

  const isSubmitting = useMemo(
    () => createMutation.isPending || updateMutation.isPending,
    [createMutation.isPending, updateMutation.isPending],
  );

  const hasError =
    usersQuery.isError ||
    createMutation.isError ||
    updateMutation.isError ||
    deleteMutation.isError;

  return {
    usersQuery,
    editingUser,
    snackbar,
    setSnackbar,
    handleSave,
    handleEdit,
    handleCancelEdit,
    handleDelete,
    isSubmitting,
    hasError,
  };
};
