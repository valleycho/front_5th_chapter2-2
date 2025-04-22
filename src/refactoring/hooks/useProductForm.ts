import { useState } from "react";
import { Product } from "../../types";
import { initialProductForm } from "../constants/productForm.constants";


export const useProductEditForm = () => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // handleEditProduct 함수 수정
  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  // 새로운 핸들러 함수 추가
  const handleProductNameUpdate = (productId: string, newName: string) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, name: newName };
      setEditingProduct(updatedProduct);
    }
  };

  // 새로운 핸들러 함수 추가
  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, price: newPrice };
      setEditingProduct(updatedProduct);
    }
  };

  // 수정 완료 핸들러 함수 추가
  const handleEditComplete = (
    onProductUpdate: (updatedProduct: Product) => void
  ) => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleStockUpdate = (
    productId: string, 
    newStock: number, 
    products: Product[], 
    onProductUpdate: (updatedProduct: Product) => void, 
    setEditingProduct: (product: Product | null) => void
  ) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = { ...updatedProduct, stock: newStock };

      onProductUpdate(newProduct);

      setEditingProduct(newProduct);
    }
  };

  return {
    editingProduct,
    setEditingProduct,
    handleEditProduct,
    handleProductNameUpdate,
    handlePriceUpdate,
    handleEditComplete,
    handleStockUpdate,
  };
};

export const useProductAddForm = () => {
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>(initialProductForm);

  const handleAddNewProduct = (
    onProductAdd: (newProduct: Product) => void,
    setShowNewProductForm: (show: boolean) => void
  ) => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);

    setNewProduct(initialProductForm);

    setShowNewProductForm(false);
  };

  return {
    newProduct,
    setNewProduct,
    handleAddNewProduct,
  };
};
