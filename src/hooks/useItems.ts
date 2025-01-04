import { useQuery, useMutation, useQueryClient } from 'react-query';

const fetchItems = async () => {
  const response = await fetch('/api/items');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const addItem = async (newItem: { name: string }) => {
  const response = await fetch('/api/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newItem),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const deleteItem = async (id: number) => {
  const response = await fetch('/api/items', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useItems = () => {
  return useQuery('items', fetchItems);
};

export const useAddItem = () => {
  const queryClient = useQueryClient();
  return useMutation(addItem, {
    onSuccess: () => {
      queryClient.invalidateQueries('items');
    },
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteItem, {
    onSuccess: () => {
      queryClient.invalidateQueries('items');
    },
  });
};