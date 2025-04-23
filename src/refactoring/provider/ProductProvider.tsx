import { createContext, useContext } from "react";
import { Product } from "../../types";
import { useProducts } from "../hooks";

interface ProductContextType {
  products: Product[];
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({
  children,
  initialProducts,
}: {
  children: React.ReactNode;
  initialProducts: Product[];
}) => {
  const { products, updateProduct, addProduct } = useProducts(initialProducts);

  return (
    <ProductContext.Provider value={{ products, updateProduct, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
