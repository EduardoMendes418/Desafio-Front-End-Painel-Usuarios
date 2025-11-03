
import { useQuery, useMutation, useQueryClient, type UseMutationResult } from '@tanstack/react-query';
import { userApi } from '../api/userApi';
import type { User } from '../types/User';

const USER_QUERY_KEY = 'users';

interface UseUsersReturn {
  usersQuery: ReturnType<typeof useQuery<User[], Error>>;
  createMutation: UseMutationResult<User, Error, Omit<User, 'id'>>;
  updateMutation: UseMutationResult<User, Error, User>;
  deleteMutation: UseMutationResult<void, Error, number>;
}

export const useUsers = (): UseUsersReturn => {
  const queryClient = useQueryClient();

  const usersQuery = useQuery<User[], Error>({
    queryKey: [USER_QUERY_KEY],
    queryFn: userApi.getUsers,
    initialData: [],
  });

  const commonMutationOptions = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
    },
  };

  const createMutation = useMutation<User, Error, Omit<User, 'id'>>({
    mutationFn: userApi.createUser,
    ...commonMutationOptions,
  });

  const updateMutation = useMutation<User, Error, User>({
    mutationFn: userApi.updateUser,
    ...commonMutationOptions,
  });

  const deleteMutation = useMutation<void, Error, number>({
    mutationFn: userApi.deleteUser,
    ...commonMutationOptions,
  });

  return {
    usersQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
