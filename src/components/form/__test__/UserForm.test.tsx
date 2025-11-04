import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DeleteDialogContent } from '../../dialog/DeleteDialogContent';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={createTheme()}>{component}</ThemeProvider>);
};

jest.mock('@mui/material/ButtonBase/TouchRipple', () => {
  return {
    __esModule: true,
    default: () => null,
  };
});

describe('DeleteDialogContent', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o diálogo quando open é true', () => {
    renderWithTheme(
      <DeleteDialogContent open={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />,
    );

    expect(screen.getByText(/Confirmar Exclusão/i)).toBeInTheDocument();
    expect(screen.getByText(/Tem certeza que deseja excluir este usuário?/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /excluir/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
  });

  it('não deve renderizar o diálogo quando open é false', () => {
    renderWithTheme(
      <DeleteDialogContent open={false} onClose={mockOnClose} onConfirm={mockOnConfirm} />,
    );

    expect(screen.queryByText(/Confirmar Exclusão/i)).not.toBeInTheDocument();
  });

  it('deve chamar onClose quando o botão cancelar é clicado', () => {
    renderWithTheme(
      <DeleteDialogContent open={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />,
    );

    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onClose quando o botão fechar (X) é clicado', () => {
    renderWithTheme(
      <DeleteDialogContent open={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />,
    );

    const closeButton = screen.getByLabelText(/fechar/i);
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onConfirm quando o botão excluir é clicado', () => {
    renderWithTheme(
      <DeleteDialogContent open={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />,
    );

    const deleteButton = screen.getByRole('button', { name: /excluir/i });
    fireEvent.click(deleteButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it('deve ter os atributos de acessibilidade usando query seletor', () => {
    renderWithTheme(
      <DeleteDialogContent open={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />,
    );

    const dialog = document.querySelector('[aria-labelledby="delete-dialog-title"]');

    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-describedby', 'delete-dialog-description');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('role', 'dialog');
  });

  it('deve renderizar o ícone de warning', () => {
    renderWithTheme(
      <DeleteDialogContent open={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />,
    );

    expect(screen.getByTestId('WarningAmberIcon')).toBeInTheDocument();
  });

  it('deve ter o título correto com ícone de warning', () => {
    renderWithTheme(
      <DeleteDialogContent open={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />,
    );

    const titleElement = screen.getByText('Confirmar Exclusão');
    expect(titleElement).toBeInTheDocument();

    const icon = screen.getByTestId('WarningAmberIcon');
    expect(icon).toBeInTheDocument();
    expect(icon.closest('h2')).toContainElement(titleElement);
  });

  it('deve ter a descrição correta do diálogo', () => {
    renderWithTheme(
      <DeleteDialogContent open={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />,
    );

    const description = screen.getByText(/Tem certeza que deseja excluir este usuário?/i);
    expect(description).toBeInTheDocument();
    expect(description).toHaveAttribute('id', 'delete-dialog-description');
  });

  it('deve ter botões com atributos de acessibilidade', () => {
    renderWithTheme(
      <DeleteDialogContent open={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />,
    );

    const cancelButton = screen.getByRole('button', { name: /cancelar/i });
    const deleteButton = screen.getByRole('button', { name: /excluir/i });

    expect(cancelButton).toHaveAttribute('aria-describedby', 'delete-dialog-description');
    expect(deleteButton).toHaveAttribute('aria-describedby', 'delete-dialog-description');
    expect(deleteButton).toHaveClass('MuiButton-containedError');
  });

  it('deve ter o botão de fechar acessível', () => {
    renderWithTheme(
      <DeleteDialogContent open={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />,
    );

    const closeButton = screen.getByLabelText(/fechar/i);
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute('type', 'button');
  });
});
