import { render, screen } from '@testing-library/react';
import { useErrorHandler } from '../../../hooks/useErrorHandler';
import { ErrorHandler } from '../ErrorHandler';


jest.mock('../../../hooks/useErrorHandler');

const mockUseErrorHandler = useErrorHandler as jest.MockedFunction<typeof useErrorHandler>;


jest.mock('../ErrorFallback', () => ({
  ErrorFallback: ({ onRetry, error }: { onRetry?: () => void; error?: Error }) => (
    <div>
      <div>ErrorFallback Mock</div>
      {onRetry && <button onClick={onRetry}>Retry</button>}
      <div data-testid="error-message">{error?.message}</div>
    </div>
  ),
}));

describe('ErrorHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza children quando não há erro', () => {
    mockUseErrorHandler.mockReturnValue({
      error: null,
      handleError: jest.fn(),
      resetError: jest.fn(),
      hasError: false,
    });

    render(
      <ErrorHandler>
        <div>Conteúdo normal</div>
      </ErrorHandler>
    );

    expect(screen.getByText('Conteúdo normal')).toBeInTheDocument();
  });

  it('renderiza ErrorFallback quando há erro', () => {
    mockUseErrorHandler.mockReturnValue({
      error: new Error('Erro de teste'),
      handleError: jest.fn(),
      resetError: jest.fn(),
      hasError: true,
    });

    render(
      <ErrorHandler>
        <div>Conteúdo normal</div>
      </ErrorHandler>
    );

    expect(screen.getByText('ErrorFallback Mock')).toBeInTheDocument();
    expect(screen.getByTestId('error-message')).toHaveTextContent('Erro de teste');
  });

  it('chama onError quando há erro', () => {
    const mockOnError = jest.fn();
    const testError = new Error('Erro de teste');

    mockUseErrorHandler.mockReturnValue({
      error: testError,
      handleError: jest.fn(),
      resetError: jest.fn(),
      hasError: true,
    });

    render(
      <ErrorHandler onError={mockOnError}>
        <div>Conteúdo normal</div>
      </ErrorHandler>
    );

    expect(mockOnError).toHaveBeenCalledWith(testError);
  });
});
