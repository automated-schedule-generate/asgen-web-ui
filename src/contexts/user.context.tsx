'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

interface UserData {
  id?: string;
  name?: string;
  email?: string;
  cpf?: string;
  role?: string;
  department?: string;
  is_active?: boolean;
  teacher?: {
    special_need?: boolean;
    description_special_need?: string;
    observation?: string;
  };
}
type UserContextType = {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  loading: boolean;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  children,
  currentUser,
}: {
  children: ReactNode;
  currentUser: UserData | null;
}) {
  const [user, setUser] = useState<UserData | null>(currentUser);
  const [loading, setLoading] = useState(false);

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, refreshUser: async () => {} }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error('useUser deve ser usado dentro de UserProvider');
  return context;
};
