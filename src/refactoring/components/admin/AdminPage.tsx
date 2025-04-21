import CouponAddForm from "../\bcoupon/CouponAddForm";
import CouponList from "../\bcoupon/CouponList";
import { Coupon, Product } from "../../../types";
import {
  useDiscount,
  useRegisterCoupon,
  useToggleProductAccordion,
  useToggleShowNewProductForm,
} from "../../hooks";
import {
  useProductAddForm,
  useProductEditForm,
} from "../../hooks/useProductForm";
import AddProductDiscount from "../discount/AddProductDiscount";
import DeleteProductDiscount from "../discount/DeleteProductDiscount";
import DiscountRateText from "../discount/DiscountRateText";
import NewProductAddForm from "../product/NewProductAddForm";
import NewProductFormToggle from "../product/NewProductFormToggle";

interface Props {
  products: Product[];
  coupons: Coupon[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const AdminPage = ({
  products,
  coupons,
  onProductUpdate,
  onProductAdd,
  onCouponAdd,
}: Props) => {
  const { newCoupon, setNewCoupon, handleAddCoupon } = useRegisterCoupon();
  const {
    newDiscount,
    setNewDiscount,
    handleAddDiscount,
    handleRemoveDiscount,
  } = useDiscount();

  const { openProductIds, toggleProductAccordion } =
    useToggleProductAccordion();

  const { showNewProductForm, setShowNewProductForm } =
    useToggleShowNewProductForm();

  const {
    editingProduct,
    setEditingProduct,
    handleEditProduct,
    handleProductNameUpdate,
    handlePriceUpdate,
    handleEditComplete,
  } = useProductEditForm();

  const { newProduct, setNewProduct, handleStockUpdate, handleAddNewProduct } =
    useProductAddForm();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
          <NewProductFormToggle
            showNewProductForm={showNewProductForm}
            setShowNewProductForm={setShowNewProductForm}
          />
          {showNewProductForm && (
            <NewProductAddForm
              newProduct={newProduct}
              setNewProduct={setNewProduct}
              handleAddNewProduct={() =>
                handleAddNewProduct(onProductAdd, setShowNewProductForm)
              }
            />
          )}

          <div className="space-y-2">
            {products.map((product, index) => (
              <div
                key={product.id}
                data-testid={`product-${index + 1}`}
                className="bg-white p-4 rounded shadow"
              >
                <button
                  data-testid="toggle-button"
                  onClick={() => toggleProductAccordion(product.id)}
                  className="w-full text-left font-semibold"
                >
                  {product.name} - {product.price}원 (재고: {product.stock})
                </button>

                {openProductIds.has(product.id) && (
                  <div className="mt-2">
                    {editingProduct && editingProduct.id === product.id ? (
                      <div>
                        <div className="mb-4">
                          <label className="block mb-1">상품명: </label>
                          <input
                            type="text"
                            value={editingProduct.name}
                            onChange={(e) =>
                              handleProductNameUpdate(
                                product.id,
                                e.target.value
                              )
                            }
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-1">가격: </label>
                          <input
                            type="number"
                            value={editingProduct.price}
                            onChange={(e) =>
                              handlePriceUpdate(
                                product.id,
                                parseInt(e.target.value)
                              )
                            }
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-1">재고: </label>
                          <input
                            type="number"
                            value={editingProduct.stock}
                            onChange={(e) =>
                              handleStockUpdate(
                                product.id,
                                parseInt(e.target.value),
                                products,
                                onProductUpdate,
                                setEditingProduct
                              )
                            }
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        {/* 할인 정보 수정 부분 */}
                        <div>
                          <h4 className="text-lg font-semibold mb-2">
                            할인 정보
                          </h4>
                          {editingProduct.discounts.map((discount, index) => (
                            <DeleteProductDiscount
                              key={index}
                              discount={discount}
                              onRemoveDiscount={() =>
                                handleRemoveDiscount(
                                  product.id,
                                  index,
                                  products,
                                  onProductUpdate,
                                  setEditingProduct
                                )
                              }
                            />
                          ))}
                          <AddProductDiscount
                            newDiscount={newDiscount}
                            setNewDiscount={setNewDiscount}
                            onAddDiscount={() =>
                              handleAddDiscount(
                                product.id,
                                products,
                                onProductUpdate,
                                editingProduct,
                                setEditingProduct
                              )
                            }
                          />
                        </div>
                        <button
                          onClick={() => handleEditComplete(onProductUpdate)}
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
                        >
                          수정 완료
                        </button>
                      </div>
                    ) : (
                      <div>
                        {product.discounts.map((discount, index) => (
                          <div key={index} className="mb-2">
                            <DiscountRateText discount={discount} />
                          </div>
                        ))}
                        <button
                          data-testid="modify-button"
                          onClick={() => handleEditProduct(product)}
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
                        >
                          수정
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
          <div className="bg-white p-4 rounded shadow">
            <CouponAddForm
              newCoupon={newCoupon}
              setNewCoupon={setNewCoupon}
              handleAddCoupon={() => handleAddCoupon(onCouponAdd)}
            />

            <CouponList coupons={coupons} />
          </div>
        </div>
      </div>
    </div>
  );
};
