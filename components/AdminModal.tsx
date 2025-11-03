
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Product } from '../types';
import { generateDescription } from '../services/geminiService';
import { CloseIcon } from './Icons';

const initialFormState: Omit<Product, 'id'> = {
  name: '',
  description: '',
  price: '',
  image: '',
  buyLink: '',
};

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const { products, addProduct, updateProduct, deleteProduct, isAdmin } = useAppContext();
  const [formData, setFormData] = useState<Omit<Product, 'id'>>(initialFormState);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormState);
      setEditingId(null);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerateDescription = async () => {
    if (!formData.name) {
      alert("Please enter a product name first.");
      return;
    }
    setIsGenerating(true);
    try {
      const description = await generateDescription(formData.name);
      setFormData(prev => ({ ...prev, description }));
    } catch (error) {
      console.error(error);
      alert("Failed to generate description.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateProduct({ id: editingId, ...formData });
    } else {
      addProduct(formData);
    }
    setFormData(initialFormState);
    setEditingId(null);
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      buyLink: product.buyLink,
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };
  
  if (!isOpen || !isAdmin) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
             <CloseIcon />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-6 grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
              <div className="relative">
                 <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" rows={3} required />
                 <button type="button" onClick={handleGenerateDescription} disabled={isGenerating} className="absolute bottom-2 right-2 text-xs bg-brand-secondary text-brand-dark px-2 py-1 rounded disabled:opacity-50">
                    {isGenerating ? 'Generating...' : '✨ Generate with AI'}
                 </button>
              </div>
              <input name="price" value={formData.price} onChange={handleChange} placeholder="Price (e.g., Rp 38.000)" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
              <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
              <input name="buyLink" value={formData.buyLink} onChange={handleChange} placeholder="Buy Link (Shopee/WhatsApp)" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" required />
              <button type="submit" className="w-full bg-brand-primary text-white p-2 rounded hover:bg-red-800">{editingId ? 'Update Product' : 'Add Product'}</button>
              {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData(initialFormState); }} className="w-full bg-gray-500 text-white p-2 rounded mt-2">Cancel Edit</button>}
            </form>
          </div>
          {/* Product List Section */}
          <div className="overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Product List</h3>
            <div className="space-y-3">
              {products.map(p => (
                <div key={p.id} className="p-3 bg-gray-100 dark:bg-gray-700 rounded flex justify-between items-center">
                  <span className="font-medium text-gray-800 dark:text-gray-200">{p.name}</span>
                  <div className="space-x-2">
                    <button onClick={() => handleEdit(p)} className="text-sm bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="text-sm bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
