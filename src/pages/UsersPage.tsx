import React, { useState, useCallback, useMemo } from "react";
import {
  Container,
  Typography,
  Alert,
  CircularProgress,
  Box,
  Snackbar,
  Button,
  Paper,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useUsersContext } from "../contexts/UsersContext";
import { useThemeContext } from "../contexts/ThemeContext";
import type { User } from "../types/User";
import { UserForm } from "../components/form/UserForm";
import { UserTable } from "../components/table/UserTable";

export const UsersPage: React.FC = () => {
  const { usersQuery, createMutation, updateMutation, deleteMutation } = useUsersContext();
  const { darkMode, toggleTheme } = useThemeContext();
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const showSnackbar = useCallback(
    (message: string, severity: "success" | "error" = "success") => {
      setSnackbar({ open: true, message, severity });
    },
    []
  );

  const handleSave = useCallback((userData: Omit<User, "id"> & { id?: number }) => {
    if (userData.id) {
      updateMutation.mutate(userData as User, {
        onSuccess: () => {
          setEditingUser(undefined);
          showSnackbar("Usuário atualizado com sucesso!");
        },
        onError: (error) => {
          showSnackbar(error.message || "Erro ao atualizar usuário", "error");
        },
      });
    } else {
      createMutation.mutate(userData, {
        onSuccess: () => {
          showSnackbar("Usuário criado com sucesso!");
        },
        onError: (error) => {
          showSnackbar(error.message || "Erro ao criar usuário", "error");
        },
      });
    }
  }, [createMutation, updateMutation, showSnackbar]);

  const handleEdit = useCallback((user: User) => {
    setEditingUser(user);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingUser(undefined);
  }, []);

  const handleDelete = useCallback((id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        showSnackbar("Usuário excluído com sucesso!");
      },
      onError: (error) => {
        showSnackbar(error.message || "Erro ao excluir usuário", "error");
      },
    });
  }, [deleteMutation, showSnackbar]);

  const isSubmitting = useMemo(
    () => createMutation.isPending || updateMutation.isPending,
    [createMutation.isPending, updateMutation.isPending]
  );

  if (usersQuery.isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  const hasError =
    usersQuery.isError ||
    createMutation.isError ||
    updateMutation.isError ||
    deleteMutation.isError;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          🛠️ Gerenciamento de Usuários
        </Typography>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={toggleTheme} />}
          label="Modo Escuro"
        />
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {editingUser ? "✏️ Editar Usuário" : "👥 Adicionar Novo Usuário"}
        </Typography>

        <UserForm
          user={editingUser}
          onSave={handleSave}
          isSubmitting={isSubmitting}
        />

        {editingUser && (
          <Box sx={{ mt: 2 }}>
            <Button
              onClick={handleCancelEdit}
              variant="outlined"
              color="secondary"
              disabled={isSubmitting}
            >
              ❌ Cancelar Edição
            </Button>
          </Box>
        )}
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
          📋 Lista de Usuários
        </Typography>

        {hasError && (
          <>
            {usersQuery.isError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                Erro ao carregar usuários: {usersQuery.error?.message}
              </Alert>
            )}
            {createMutation.isError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {createMutation.error?.message}
              </Alert>
            )}
            {updateMutation.isError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {updateMutation.error?.message}
              </Alert>
            )}
            {deleteMutation.isError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {deleteMutation.error?.message}
              </Alert>
            )}
          </>
        )}

        <UserTable
          users={usersQuery.data || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        ContentProps={{
          sx: {
            backgroundColor:
              snackbar.severity === "error" ? "error.main" : "success.main",
            color: "white",
          },
        }}
      />
    </Container>
  );
};