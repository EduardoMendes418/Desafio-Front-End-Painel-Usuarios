import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { DeleteDialog } from "../DeleteDialog";

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={createTheme()}>{component}</ThemeProvider>
  );
};

describe("DeleteDialog Integration", () => {
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve completar o fluxo completo de exclusão", () => {
    renderWithTheme(<DeleteDialog onConfirm={mockOnConfirm} />);

    expect(
      screen.getByRole("button", { name: /excluir/i })
    ).toBeInTheDocument();
    expect(screen.queryByText(/Confirmar Exclusão/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /excluir/i }));

    expect(screen.getByText(/Confirmar Exclusão/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Tem certeza que deseja excluir este usuário?/i)
    ).toBeInTheDocument();
  });
});
