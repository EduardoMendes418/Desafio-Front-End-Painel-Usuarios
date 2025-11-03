import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarAlert } from '../SnackbarAlert';

jest.mock('@mui/material/Snackbar', () => {
  const MockSnackbar = ({ open, message, autoHideDuration, onClose, ContentProps }: any) => {
    React.useEffect(() => {
      if (open && autoHideDuration && onClose) {
        const timer = setTimeout(() => {
          onClose({}, 'timeout');
        }, autoHideDuration);
        return () => clearTimeout(timer);
      }
    }, [open, autoHideDuration, onClose]);

    if (!open) return null;

    return (
      <div
        role="alert"
        data-testid="snackbar"
        style={ContentProps?.sx}
        data-severity={ContentProps?.['data-severity']}
      >
        <span data-testid="snackbar-message">{message}</span>
        <button onClick={() => onClose({}, 'escapeKeyDown')} data-testid="snackbar-close-escape">
          Close via Escape
        </button>
        <button onClick={() => onClose({}, 'clickaway')} data-testid="snackbar-close-clickaway">
          Close via Click Away
        </button>
      </div>
    );
  };

  return MockSnackbar;
});

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={createTheme()}>{component}</ThemeProvider>);
};

describe('SnackbarAlert', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('deve renderizar o Snackbar quando open é true', () => {
    renderWithTheme(
      <SnackbarAlert
        open={true}
        message="Operação realizada com sucesso"
        severity="success"
        onClose={mockOnClose}
      />,
    );

    expect(screen.getByTestId('snackbar')).toBeInTheDocument();
    expect(screen.getByText('Operação realizada com sucesso')).toBeInTheDocument();
  });

  it('não deve renderizar o Snackbar quando open é false', () => {
    renderWithTheme(
      <SnackbarAlert
        open={false}
        message="Operação realizada com sucesso"
        severity="success"
        onClose={mockOnClose}
      />,
    );

    expect(screen.queryByTestId('snackbar')).not.toBeInTheDocument();
  });

  it('deve chamar onClose automaticamente após autoHideDuration', () => {
    renderWithTheme(
      <SnackbarAlert
        open={true}
        message="Teste auto close"
        severity="success"
        onClose={mockOnClose}
      />,
    );

    jest.advanceTimersByTime(4000);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledWith({}, 'timeout');
  });

  it('deve chamar onClose quando fechado via escape', () => {
    renderWithTheme(
      <SnackbarAlert open={true} message="Teste escape" severity="success" onClose={mockOnClose} />,
    );

    fireEvent.click(screen.getByTestId('snackbar-close-escape'));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledWith({}, 'escapeKeyDown');
  });

  it('deve chamar onClose quando fechado via click away', () => {
    renderWithTheme(
      <SnackbarAlert
        open={true}
        message="Teste click away"
        severity="success"
        onClose={mockOnClose}
      />,
    );

    fireEvent.click(screen.getByTestId('snackbar-close-clickaway'));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledWith({}, 'clickaway');
  });

  it('não deve chamar onClose antes do autoHideDuration expirar', () => {
    renderWithTheme(
      <SnackbarAlert
        open={true}
        message="Teste duration"
        severity="success"
        onClose={mockOnClose}
      />,
    );

    jest.advanceTimersByTime(2000);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('deve limpar o timeout quando o componente é desmontado', () => {
    const { unmount } = renderWithTheme(
      <SnackbarAlert
        open={true}
        message="Teste cleanup"
        severity="success"
        onClose={mockOnClose}
      />,
    );

    unmount();

    jest.advanceTimersByTime(4000);
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
