import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '../ErrorBoundary';

jest.mock('../ErrorFallback', () => ({
  ErrorFallback: jest.fn(({ onRetry, error }: { onRetry?: () => void; error?: Error }) => (
    <div>
      <div>ErrorFallback Mock</div>
      {onRetry && <button onClick={onRetry}>Retry</button>}
      <div data-testid="error-message">{error?.message}</div>
    </div>
  )),
}));

const ThrowError = ({ message = 'Test error' }: { message?: string }) => {
  throw new Error(message);
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('deve renderizar fallback quando há erro', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByText('ErrorFallback Mock')).toBeInTheDocument();
  });

  it('deve chamar onError quando ocorre um erro', () => {
    const mockOnError = jest.fn();

    render(
      <ErrorBoundary onError={mockOnError}>
        <ThrowError message="Erro específico" />
      </ErrorBoundary>,
    );

    expect(mockOnError).toHaveBeenCalled();
  });

  it('deve passar o erro para o fallback', () => {
    render(
      <ErrorBoundary>
        <ThrowError message="Erro específico" />
      </ErrorBoundary>,
    );

    expect(screen.getByTestId('error-message')).toHaveTextContent('Erro específico');
  });

  it('deve usar fallback customizado quando fornecido', () => {
    const customFallback = <div>Fallback Customizado</div>;

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Fallback Customizado')).toBeInTheDocument();
  });
});
