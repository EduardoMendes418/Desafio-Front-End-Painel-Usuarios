import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DeleteDialogContent } from '../DeleteDialogContent';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={createTheme()}>
      {component}
    </ThemeProvider>
  );
};

describe('DeleteDialogContent', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o diálogo quando open é true', () => {
    renderWithTheme(
      <DeleteDialogContent 
        open={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );

    expect(screen.getByText(/Confirmar Exclusão/i)).toBeInTheDocument();
    expect(screen.getByText(/Tem certeza que deseja excluir este usuário?/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /excluir/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
  });

  it('não deve renderizar o diálogo quando open é false', () => {
    renderWithTheme(
      <DeleteDialogContent 
        open={false} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );

    expect(screen.queryByText(/Confirmar Exclusão/i)).not.toBeInTheDocument();
  });

  it('deve chamar onClose quando o botão cancelar é clicado', () => {
    renderWithTheme(
      <DeleteDialogContent 
        open={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );

    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onClose quando o botão fechar (X) é clicado', () => {
    renderWithTheme(
      <DeleteDialogContent 
        open={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );

    const closeButton = screen.getByLabelText(/fechar/i);
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onConfirm quando o botão excluir é clicado', () => {
    renderWithTheme(
      <DeleteDialogContent 
        open={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );

    const deleteButton = screen.getByRole('button', { name: /excluir/i });
    fireEvent.click(deleteButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it('deve ter os atributos de acessibilidade corretos', () => {
    renderWithTheme(
      <DeleteDialogContent 
        open={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-labelledby', 'delete-dialog-title');
    expect(dialog).toHaveAttribute('aria-describedby', 'delete-dialog-description');
  });

  it('deve renderizar o ícone de warning', () => {
    renderWithTheme(
      <DeleteDialogContent 
        open={true} 
        onClose={mockOnClose} 
        onConfirm={mockOnConfirm} 
      />
    );

    expect(screen.getByTestId('WarningAmberIcon')).toBeInTheDocument();
  });
});