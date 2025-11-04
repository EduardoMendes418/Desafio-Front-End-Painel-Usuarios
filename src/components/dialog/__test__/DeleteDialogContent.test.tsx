import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DeleteDialogContent } from '../DeleteDialogContent';

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

  it('deve ter os atributos de acessibilidade corretos', () => {
    renderWithTheme(
      <DeleteDialogContent open={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />,
    );

    const dialog = document.querySelector('[aria-labelledby="delete-dialog-title"]');

    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-labelledby', 'delete-dialog-title');
    expect(dialog).toHaveAttribute('aria-describedby', 'delete-dialog-description');
  });

  it('deve ter os atributos de acessibilidade usando getAllByRole', () => {
    renderWithTheme(
      <DeleteDialogContent open={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />,
    );

    const dialogs = screen.getAllByRole('dialog');

    const mainDialog = dialogs.find(
      (dialog) =>
        dialog.hasAttribute('aria-labelledby') &&
        dialog.getAttribute('aria-labelledby') === 'delete-dialog-title',
    );

    expect(mainDialog).toBeInTheDocument();
    expect(mainDialog).toHaveAttribute('aria-labelledby', 'delete-dialog-title');
    expect(mainDialog).toHaveAttribute('aria-describedby', 'delete-dialog-description');
  });

  it('deve renderizar o ícone de warning', () => {
    renderWithTheme(
      <DeleteDialogContent open={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />,
    );

    expect(screen.getByTestId('WarningAmberIcon')).toBeInTheDocument();
  });

  it('deve ter o título com ícone de warning', () => {
    renderWithTheme(
      <DeleteDialogContent open={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />,
    );

    const title = screen.getByText('Confirmar Exclusão');
    const icon = screen.getByTestId('WarningAmberIcon');

    expect(title).toBeInTheDocument();
    expect(icon).toBeInTheDocument();

    expect(title.closest('h2')).toContainElement(icon);
  });

  it('deve ter a descrição correta', () => {
    renderWithTheme(
      <DeleteDialogContent open={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />,
    );

    const description = screen.getByText(/Tem certeza que deseja excluir este usuário?/i);
    expect(description).toHaveAttribute('id', 'delete-dialog-description');
  });

  it('deve ter botão de fechar com acessibilidade correta', () => {
    renderWithTheme(
      <DeleteDialogContent open={true} onClose={mockOnClose} onConfirm={mockOnConfirm} />,
    );

    const closeButton = screen.getByLabelText(/fechar/i);
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute('aria-label', 'Fechar diálogo de exclusão');
  });
});
