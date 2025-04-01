import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './client';

// Example type for a user
export interface User {
  id: string;
  name: string;
  email: string;
}

// Example query hook
export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const { data } = await apiClient.get<User>(`/users/${userId}`);
      return data;
    },
    enabled: !!userId, // Only run query if userId is provided
  });
};

// Example mutation hook
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, userData }: { userId: string; userData: Partial<User> }) => {
      const { data } = await apiClient.patch<User>(`/users/${userId}`, userData);
      return data;
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ['user', variables.userId] });
    },
  });
};

// Example of a custom hook that combines multiple queries
export const useUserAndFriends = (userId: string) => {
  const userQuery = useUser(userId);
  const friendsQuery = useQuery({
    queryKey: ['friends', userId],
    queryFn: async () => {
      const { data } = await apiClient.get<User[]>(`/users/${userId}/friends`);
      return data;
    },
    enabled: !!userId,
  });

  return {
    user: userQuery.data,
    friends: friendsQuery.data,
    isLoading: userQuery.isLoading || friendsQuery.isLoading,
    error: userQuery.error || friendsQuery.error,
  };
}; 