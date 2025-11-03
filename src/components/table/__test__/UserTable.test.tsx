import { render, screen, fireEvent } from '@testing-library/react';
import { UserTable } from '../UserTable';
import { User } from '../../../types/User';

jest.mock('../UserTableToolbar', () => ({
  UserTableToolbar: jest.fn(({ filter, onFilterChange, sortOrder, onSort }) => (
    <div>
      <input
        data-testid="filter-input"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Buscar usuários"
      />
      <button data-testid="sort-button" onClick={onSort}>
        Ordenar {sortOrder}
      </button>
    </div>
  )),
}));

jest.mock('../UserTableRow', () => ({
  UserTableRow: jest.fn(({ user, onEdit, onDelete }) => (
    <tr data-testid={`user-row-${user.id}`}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.status}</td>
      <td>
        <button onClick={() => onEdit(user)}>Editar</button>
        <button onClick={() => onDelete(user.id)}>Excluir</button>
      </td>
    </tr>
  )),
}));

describe('UserTable', () => {
  const mockUsers: User[] = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@example.com',
      status: 'active',
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@example.com',
      status: 'inactive',
    },
    {
      id: 3,
      name: 'Pedro Oliveira',
      email: 'pedro@example.com',
      status: 'active',
    },
  ];

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar a tabela com usuários', () => {
    render(<UserTable users={mockUsers} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    expect(screen.getByTestId('filter-input')).toBeInTheDocument();
    expect(screen.getByTestId('sort-button')).toBeInTheDocument();

    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('Maria Santos')).toBeInTheDocument();
    expect(screen.getByText('Pedro Oliveira')).toBeInTheDocument();
  });

  it('deve exibir mensagem quando não há usuários', () => {
    render(<UserTable users={[]} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    expect(screen.getByText('Nenhum usuário cadastrado')).toBeInTheDocument();
  });

  it('deve filtrar usuários por nome', () => {
    render(<UserTable users={mockUsers} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    const filterInput = screen.getByTestId('filter-input');
    fireEvent.change(filterInput, { target: { value: 'João' } });

    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.queryByText('Maria Santos')).not.toBeInTheDocument();
    expect(screen.queryByText('Pedro Oliveira')).not.toBeInTheDocument();
  });

  it('deve filtrar usuários por email', () => {
    render(<UserTable users={mockUsers} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    const filterInput = screen.getByTestId('filter-input');
    fireEvent.change(filterInput, { target: { value: 'maria@example.com' } });

    expect(screen.getByText('Maria Santos')).toBeInTheDocument();
    expect(screen.queryByText('João Silva')).not.toBeInTheDocument();
    expect(screen.queryByText('Pedro Oliveira')).not.toBeInTheDocument();
  });

  it('deve exibir mensagem quando filtro não encontra resultados', () => {
    render(<UserTable users={mockUsers} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    const filterInput = screen.getByTestId('filter-input');
    fireEvent.change(filterInput, { target: { value: 'Inexistente' } });

    expect(screen.getByText('Nenhum usuário encontrado')).toBeInTheDocument();
  });

  it('deve ordenar usuários em ordem ascendente por padrão', () => {
    render(<UserTable users={mockUsers} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    // Ordem ascendente: João, Maria, Pedro
    const rows = screen.getAllByTestId(/user-row-/);
    expect(rows[0]).toHaveTextContent('João Silva');
    expect(rows[1]).toHaveTextContent('Maria Santos');
    expect(rows[2]).toHaveTextContent('Pedro Oliveira');
  });

  it('deve ordenar usuários em ordem descendente quando clicado no botão de ordenação', () => {
    render(<UserTable users={mockUsers} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    const sortButton = screen.getByTestId('sort-button');
    fireEvent.click(sortButton);

    // Ordem descendente: Pedro, Maria, João
    const rows = screen.getAllByTestId(/user-row-/);
    expect(rows[0]).toHaveTextContent('Pedro Oliveira');
    expect(rows[1]).toHaveTextContent('Maria Santos');
    expect(rows[2]).toHaveTextContent('João Silva');
  });

  it('deve alternar a ordenação entre asc e desc', () => {
    render(<UserTable users={mockUsers} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    const sortButton = screen.getByTestId('sort-button');

    // Primeiro clique: asc -> desc
    fireEvent.click(sortButton);
    let rows = screen.getAllByTestId(/user-row-/);
    expect(rows[0]).toHaveTextContent('Pedro Oliveira');

    // Segundo clique: desc -> asc
    fireEvent.click(sortButton);
    rows = screen.getAllByTestId(/user-row-/);
    expect(rows[0]).toHaveTextContent('João Silva');
  });

  it('deve chamar onEdit quando o botão editar é clicado', () => {
    render(<UserTable users={mockUsers} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    const editButtons = screen.getAllByText('Editar');
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockUsers[0]);
  });

  it('deve chamar onDelete quando o botão excluir é clicado', () => {
    render(<UserTable users={mockUsers} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    const deleteButtons = screen.getAllByText('Excluir');
    fireEvent.click(deleteButtons[1]);

    expect(mockOnDelete).toHaveBeenCalledWith(mockUsers[1].id);
  });
});
