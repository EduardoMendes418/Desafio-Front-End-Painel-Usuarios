import { useState, useEffect, useCallback } from 'react';
import { validateUserForm } from './validateUserForm';
import type { User } from '../types/User';

interface UseUserFormProps {
  user?: User;
  onSave: (user: Omit<User, 'id'> & { id?: number }) => void;
}

export const useUserForm = ({ user, onSave }: UseUserFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<User['status']>('active');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setStatus(user.status);
    } else {
      setName('');
      setEmail('');
      setStatus('active');
    }
    setError('');
  }, [user]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const validationError = validateUserForm(name, email);
      if (validationError) {
        setError(validationError);
        return;
      }

      onSave({
        id: user?.id,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        status,
      });
    },
    [name, email, status, onSave, user?.id],
  );

  return {
    name,
    email,
    status,
    error,
    setName,
    setEmail,
    setStatus,
    handleSubmit,
  };
};
