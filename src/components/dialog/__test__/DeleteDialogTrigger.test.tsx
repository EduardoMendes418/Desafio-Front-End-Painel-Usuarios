import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DeleteDialogTrigger } from '../DeleteDialogTrigger';

describe('DeleteDialogTrigger', () => {
  it('deve renderizar o botão de excluir', () => {
    const mockOnClick = jest.fn();
    render(<DeleteDialogTrigger onClick={mockOnClick} />);

    const button = screen.getByRole('button', { name: /excluir/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('deve chamar onClick quando o botão é clicado', () => {
    const mockOnClick = jest.fn();
    render(<DeleteDialogTrigger onClick={mockOnClick} />);

    const button = screen.getByRole('button', { name: /excluir/i });
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('deve ter as props corretas do botão', () => {
    const mockOnClick = jest.fn();
    render(<DeleteDialogTrigger onClick={mockOnClick} />);

    const button = screen.getByRole('button', { name: /excluir/i });
    expect(button).toHaveClass('MuiButton-outlined');
    expect(button).toHaveClass('MuiButton-colorError');
    expect(button).toHaveClass('MuiButton-sizeSmall');
  });
});
