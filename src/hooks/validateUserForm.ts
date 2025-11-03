export const validateUserForm = (name: string, email: string): string | null => {
  if (!name.trim() || !email.trim()) return 'Nome e e-mail são obrigatórios';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'E-mail inválido';

  return null;
};
