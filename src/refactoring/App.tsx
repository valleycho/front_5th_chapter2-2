import { CartPage } from "./components/cart/CartPage.tsx";
import { AdminPage } from "./components/AdminPage.tsx";
import { useAdmin } from "./hooks/useAdmin.ts";
import { PAGE_LABELS } from "./constants/pageLabels.ts";

const App = () => {
  const { isAdmin, setIsAdmin } = useAdmin();

  const getNavigationLabel = (isAdmin: boolean) => {
    return isAdmin ? PAGE_LABELS.CART_PAGE : PAGE_LABELS.ADMIN_PAGE;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">쇼핑몰 관리 시스템</h1>
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
          >
            {getNavigationLabel(isAdmin)}
          </button>
        </div>
      </nav>
      <main className="container mx-auto mt-6">
        {isAdmin ? <AdminPage /> : <CartPage />}
      </main>
    </div>
  );
};

export default App;
