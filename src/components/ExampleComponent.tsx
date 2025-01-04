import React, { useState } from 'react';
import { useItems, useAddItem, useDeleteItem } from '../hooks/useItems';
import styles from '../styles/ExampleComponent.module.scss';

const ExampleComponent: React.FC = () => {
  const { data, error, isLoading } = useItems();
  const addItemMutation = useAddItem();
  const deleteItemMutation = useDeleteItem();
  const [newItemName, setNewItemName] = useState('');

  const handleAddItem = () => {
    if (newItemName.trim() === '') return;
    addItemMutation.mutate({ name: newItemName });
    setNewItemName('');
  };

  const handleDeleteItem = (id: number) => {
    deleteItemMutation.mutate(id);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddItem();
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Items</h1>
      <ul className={styles.list}>
        {data.map((item: any) => (
          <li key={item.id} className={styles.listItem}>
            {item.name}
            <button onClick={() => handleDeleteItem(item.id)} className={styles.deleteButton}>Delete</button>
          </li>
        ))}
      </ul>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="New item name"
          className={styles.input}
        />
        <button onClick={handleAddItem} className={styles.button}>Add Item</button>
      </div>
    </div>
  );
};

export default ExampleComponent;