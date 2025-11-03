import { render, screen, fireEvent } from '@testing-library/react';
import { UserTableToolbar } from '../UserTableToolbar';

describe('UserTableToolbar', () => {
  const mockOnFilterChange = jest.fn();
  const mockOnSort = jest.fn();

  const defaultProps = {
    filter: '',
    onFilterChange: mockOnFilterChange,
    sortOrder: 'asc' as const,
    onSort: mockOnSort,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o toolbar corretamente', () => {
    render(<UserTableToolbar {...defaultProps} />);

    expect(screen.getByLabelText(/buscar usuários/i)).toBeInTheDocument();
    expect(screen.getByText(/nome/i)).toBeInTheDocument();
  });

  it('deve chamar onFilterChange quando o filtro é alterado', () => {
    render(<UserTableToolbar {...defaultProps} />);

    const filterInput = screen.getByLabelText(/buscar usuários/i);
    fireEvent.change(filterInput, { target: { value: 'teste' } });

    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    expect(mockOnFilterChange).toHaveBeenCalledWith('teste');
  });

  it('deve exibir o valor do filtro corretamente', () => {
    render(<UserTableToolbar {...defaultProps} filter="joão" />);

    const filterInput = screen.getByLabelText(/buscar usuários/i);
    expect(filterInput).toHaveValue('joão');
  });

  it('deve chamar onSort quando o botão de ordenação é clicado', () => {
    render(<UserTableToolbar {...defaultProps} />);

    const sortButton = screen.getByText(/nome/i);
    fireEvent.click(sortButton);

    expect(mockOnSort).toHaveBeenCalledTimes(1);
  });
});
