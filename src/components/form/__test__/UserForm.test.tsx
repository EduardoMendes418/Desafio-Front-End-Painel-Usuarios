import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useUserForm } from "../../../hooks/useUserForm";
import { User } from "../../../types/User";
import { UserForm } from "../UserForm";

jest.mock("../../../hooks/useUserForm");

const mockUseUserForm = useUserForm as jest.MockedFunction<typeof useUserForm>;

describe("UserForm", () => {
  const mockOnSave = jest.fn();
  const mockUser: User = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "active",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockHookReturn = (overrides = {}) => ({
    name: "",
    email: "",
    status: "active" as User["status"],
    error: "",
    setName: jest.fn(),
    setEmail: jest.fn(),
    setStatus: jest.fn(),
    handleSubmit: jest.fn((e: React.FormEvent) => {
      e.preventDefault();
      mockOnSave();
    }),
    ...overrides,
  });

  it("deve renderizar o formulário de criação corretamente", () => {
    mockUseUserForm.mockReturnValue(mockHookReturn());

    render(<UserForm onSave={mockOnSave} />);

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /criar usuário/i })
    ).toBeInTheDocument();
  });

  it("deve renderizar o formulário de edição quando user é fornecido", () => {
    mockUseUserForm.mockReturnValue(
      mockHookReturn({
        name: mockUser.name,
        email: mockUser.email,
        status: mockUser.status,
      })
    );

    render(<UserForm user={mockUser} onSave={mockOnSave} />);

    expect(
      screen.getByRole("button", { name: /atualizar usuário/i })
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.email)).toBeInTheDocument();
  });

  it("deve exibir mensagem de erro quando há erro", () => {
    const errorMessage = "Erro de validação";
    mockUseUserForm.mockReturnValue(
      mockHookReturn({
        error: errorMessage,
      })
    );

    render(<UserForm onSave={mockOnSave} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent(errorMessage);
  });

  it("deve desabilitar campos quando isSubmitting é true", () => {
    mockUseUserForm.mockReturnValue(mockHookReturn());

    render(<UserForm onSave={mockOnSave} isSubmitting={true} />);

    expect(screen.getByLabelText(/nome/i)).toBeDisabled();
    expect(screen.getByLabelText(/e-mail/i)).toBeDisabled();
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByRole("button")).toHaveTextContent(/salvando/i);
  });

  it("deve chamar setName quando o campo nome é alterado", () => {
    const mockSetName = jest.fn();
    mockUseUserForm.mockReturnValue(
      mockHookReturn({
        setName: mockSetName,
      })
    );

    render(<UserForm onSave={mockOnSave} />);

    const nameInput = screen.getByLabelText(/nome/i);
    fireEvent.change(nameInput, { target: { value: "Novo Nome" } });

    expect(mockSetName).toHaveBeenCalledWith("Novo Nome");
  });

  it("deve chamar setEmail quando o campo email é alterado", () => {
    const mockSetEmail = jest.fn();
    mockUseUserForm.mockReturnValue(
      mockHookReturn({
        setEmail: mockSetEmail,
      })
    );

    render(<UserForm onSave={mockOnSave} />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    fireEvent.change(emailInput, { target: { value: "novo@email.com" } });

    expect(mockSetEmail).toHaveBeenCalledWith("novo@email.com");
  });

  it("deve ter autoFocus no campo nome", () => {
    mockUseUserForm.mockReturnValue(mockHookReturn());

    render(<UserForm onSave={mockOnSave} />);

    const nameInput = screen.getByLabelText(/nome/i);
    expect(nameInput).toHaveFocus();
  });

  it("deve usar valores padrão corretamente", () => {
    mockUseUserForm.mockReturnValue(mockHookReturn());

    render(<UserForm onSave={mockOnSave} />);

    expect(screen.getByRole("button")).not.toBeDisabled();
    expect(screen.getByRole("button")).toHaveTextContent(/criar usuário/i);
  });

  it("deve passar as props corretas para o hook useUserForm", () => {
    mockUseUserForm.mockReturnValue(mockHookReturn());

    render(
      <UserForm user={mockUser} onSave={mockOnSave} isSubmitting={true} />
    );

    expect(mockUseUserForm).toHaveBeenCalledWith({
      user: mockUser,
      onSave: mockOnSave,
    });
  });
});
