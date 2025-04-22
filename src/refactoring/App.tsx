import { CartPage } from "./components/cart/CartPage.tsx";
import { AdminPage } from "./components/admin/AdminPage.tsx";
import { useCoupons, useLocalStorage, useProducts } from "./hooks";
import { initialCoupons } from "./constants/coupon.constants.ts";
import { initialProducts } from "./constants/product.constants.ts";
import { useAdmin } from "./hooks/useAdmin.ts";

const App = () => {
  const { setLocalStorage, getLocalStorage } = useLocalStorage();
  setLocalStorage("products", initialProducts);
  setLocalStorage("coupons", initialCoupons);

  const { products, updateProduct, addProduct } = useProducts(
    getLocalStorage("products")
  );
  const { coupons, addCoupon } = useCoupons(getLocalStorage("coupons"));
  const { isAdmin, handleToggleAdmin } = useAdmin();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">쇼핑몰 관리 시스템</h1>
          <button
            onClick={handleToggleAdmin}
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
          >
            {isAdmin ? "장바구니 페이지로" : "관리자 페이지로"}
          </button>
        </div>
      </nav>
      <main className="container mx-auto mt-6">
        {isAdmin ? (
          <AdminPage
            products={products}
            coupons={coupons}
            onProductUpdate={updateProduct}
            onProductAdd={addProduct}
            onCouponAdd={addCoupon}
          />
        ) : (
          <CartPage products={products} coupons={coupons} />
        )}
      </main>
    </div>
  );
};

export default App;
