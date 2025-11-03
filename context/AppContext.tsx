
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';
import { initialProducts } from '../constants';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface AppContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  isAdmin: boolean;
  login: (pass: string) => boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>('darkMode', false);
  const [products, setProducts] = useLocalStorage<Product[]>('products', initialProducts);
  const [isAdmin, setIsAdmin] = useLocalStorage<boolean>('isAdmin', false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = { ...productData, id: new Date().toISOString() };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const login = (password: string): boolean => {
    if (password === 'heppy123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  const value = {
    isDarkMode,
    toggleDarkMode,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    isAdmin,
    login,
    logout
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
