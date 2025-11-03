import type { User } from "../types/User";

const API_BASE_URL = "http://localhost:3001";

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    let errorMessage = `Erro ${response.status}: ${response.statusText}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {}
    throw new Error(errorMessage);
  }

  if (
    response.status === 204 ||
    response.headers.get("content-length") === "0"
  ) {
    return null;
  }

  return response.json();
};

export const userApi = {
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      return await handleResponse(response);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      throw error;
    }
  },

  createUser: async (user: Omit<User, "id">): Promise<User> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error;
    }
  },

  updateUser: async (user: User): Promise<User> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw error;
    }
  },

  deleteUser: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "DELETE",
      });
      await handleResponse(response);
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      throw error;
    }
  },
};
