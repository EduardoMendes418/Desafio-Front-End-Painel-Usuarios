
import React, { createContext, useContext, type ReactNode } from 'react';
import { useUsers } from '../hooks/useUsers';


interface UsersContextType {
  usersQuery: ReturnType<typeof useUsers>['usersQuery'];
  createMutation: ReturnType<typeof useUsers>['createMutation'];
  updateMutation: ReturnType<typeof useUsers>['updateMutation'];
  deleteMutation: ReturnType<typeof useUsers>['deleteMutation'];
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

interface UsersProviderProps {
  children: ReactNode;
}

export const UsersProvider: React.FC<UsersProviderProps> = ({ children }) => {
  const users = useUsers();

  return (
    <UsersContext.Provider value={users}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error('useUsersContext must be used within a UsersProvider');
  }
  return context;
};