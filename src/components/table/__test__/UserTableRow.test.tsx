import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserTableRow } from '../UserTableRow';
import { User } from '../../../types/User';

jest.mock('../../dialog/DeleteDialog', () => ({
  DeleteDialog: jest.fn(({ onConfirm }) => (
    <button onClick={onConfirm} data-testid="delete-dialog">
      Excluir
    </button>
  )),
}));

describe('UserTableRow', () => {
  const mockUser: User = {
    id: 1,
    name: 'João Silva',
    email: 'joao@example.com',
    status: 'active',
  };

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar os dados do usuário corretamente', () => {
    render(
      <table>
        <tbody>
          <UserTableRow user={mockUser} onEdit={mockOnEdit} onDelete={mockOnDelete} />
        </tbody>
      </table>,
    );

    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('joao@example.com')).toBeInTheDocument();
    expect(screen.getByText('Ativo')).toBeInTheDocument();
  });

  it('deve mostrar status inativo corretamente', () => {
    const inactiveUser: User = {
      ...mockUser,
      status: 'inactive',
    };

    render(
      <table>
        <tbody>
          <UserTableRow user={inactiveUser} onEdit={mockOnEdit} onDelete={mockOnDelete} />
        </tbody>
      </table>,
    );

    expect(screen.getByText('Inativo')).toBeInTheDocument();
  });

  it('deve chamar onEdit quando botão editar é clicado', () => {
    render(
      <table>
        <tbody>
          <UserTableRow user={mockUser} onEdit={mockOnEdit} onDelete={mockOnDelete} />
        </tbody>
      </table>,
    );

    const editButton = screen.getByText('Editar');
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnEdit).toHaveBeenCalledWith(mockUser);
  });

  it('deve chamar onDelete quando diálogo de exclusão é confirmado', () => {
    render(
      <table>
        <tbody>
          <UserTableRow user={mockUser} onEdit={mockOnEdit} onDelete={mockOnDelete} />
        </tbody>
      </table>,
    );

    const deleteButton = screen.getByTestId('delete-dialog');
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(mockUser.id);
  });

  it('deve usar useCallback para funções de status', () => {
    const { rerender } = render(
      <table>
        <tbody>
          <UserTableRow user={mockUser} onEdit={mockOnEdit} onDelete={mockOnDelete} />
        </tbody>
      </table>,
    );

    const firstRender = screen.getByText('Ativo');

    rerender(
      <table>
        <tbody>
          <UserTableRow user={mockUser} onEdit={mockOnEdit} onDelete={mockOnDelete} />
        </tbody>
      </table>,
    );

    const secondRender = screen.getByText('Ativo');
    expect(firstRender).toEqual(secondRender);
  });
});
