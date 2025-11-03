import React from "react";
import {
  Container,
  Typography,
  Alert,
  Box,
  Button,
  Paper,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useThemeContext } from "../contexts/ThemeContext";
import { UserForm } from "../components/form/UserForm";
import { UserTable } from "../components/table/UserTable";
import { SnackbarAlert } from "../components/feedback/SnackbarAlert";
import { LoadingState } from "../components/feedback/LoadingState";
import { useUserHandlers } from "../hooks/useUserHandlers";

export const UsersPage: React.FC = () => {
  const { darkMode, toggleTheme } = useThemeContext();
  const {
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
  } = useUserHandlers();

  if (usersQuery.isLoading) return <LoadingState />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
 
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1">
          🛠️ Gerenciamento de Usuários
        </Typography>
        <FormControlLabel control={<Switch checked={darkMode} onChange={toggleTheme} />} label="Modo Escuro" />
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          {editingUser ? "✏️ Editar Usuário" : "👥 Adicionar Novo Usuário"}
        </Typography>

        <UserForm user={editingUser} onSave={handleSave} isSubmitting={isSubmitting} />

        {editingUser && (
          <Box sx={{ mt: 2 }}>
            <Button onClick={handleCancelEdit} variant="outlined" color="secondary" disabled={isSubmitting}>
              ❌ Cancelar Edição
            </Button>
          </Box>
        )}
      </Paper>


      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          📋 Lista de Usuários
        </Typography>

        {hasError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Ocorreu um erro ao processar sua requisição.
          </Alert>
        )}

        <UserTable users={usersQuery.data || []} onEdit={handleEdit} onDelete={handleDelete} />
      </Paper>

   
      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Container>
  );
};
