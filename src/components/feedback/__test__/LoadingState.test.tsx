import React from "react";
import { render, screen } from "@testing-library/react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LoadingState } from "../LoadingState";

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={createTheme()}>{component}</ThemeProvider>
  );
};

describe("LoadingState", () => {
  it("deve renderizar o CircularProgress dentro de um Box", () => {
    renderWithTheme(<LoadingState />);

    const box = screen.getByRole("progressbar").closest("div");
    expect(box).toBeInTheDocument();

    const progress = screen.getByRole("progressbar");
    expect(progress).toBeInTheDocument();
    expect(progress).toHaveClass("MuiCircularProgress-root");
  });

  it("deve ter os estilos corretos do Box", () => {
    renderWithTheme(<LoadingState />);

    const box = screen.getByRole("progressbar").closest("div");
    expect(box).toHaveStyle({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "200px",
    });
  });

  it("deve ser um componente funcional simples", () => {
    expect(typeof LoadingState).toBe("function");

    const { container } = renderWithTheme(<LoadingState />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
