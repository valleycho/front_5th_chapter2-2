import { useState } from "react";
import { Discount, Product } from "../../types";
import { initialNewDiscount } from "../constants/discount.constants";

export const useDiscount = () => {
    const [newDiscount, setNewDiscount] = useState<Discount>(initialNewDiscount);

    const handleAddDiscount = (
      productId: string, 
      products: Product[], 
      onProductUpdate: (product: Product) => void, 
      editingProduct: Product,
      setEditingProduct: (product: Product) => void
    ) => {
      const updatedProduct = products.find((p) => p.id === productId);
      if (updatedProduct && editingProduct) {
        const newProduct = {
          ...updatedProduct,
          discounts: [...updatedProduct.discounts, newDiscount],
        };
        onProductUpdate(newProduct);
        setEditingProduct(newProduct);
        setNewDiscount({ quantity: 0, rate: 0 });
      }
    };

    const handleRemoveDiscount = (
      productId: string, 
      index: number, 
      products: Product[], 
      onProductUpdate: (product: Product) => void, 
      setEditingProduct: (product: Product) => void
    ) => {
      const updatedProduct = products.find((p) => p.id === productId);
      if (updatedProduct) {
        const newProduct = {
          ...updatedProduct,
          discounts: updatedProduct.discounts.filter((_, i) => i !== index),
        };
        onProductUpdate(newProduct);
        setEditingProduct(newProduct);
      }
    };

    return {
        newDiscount,
        setNewDiscount,
        handleAddDiscount,
        handleRemoveDiscount
    }
}