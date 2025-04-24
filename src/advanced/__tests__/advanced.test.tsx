import { useState } from "react";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { CartPage } from "../../refactoring/components/cart/CartPage";
import { AdminPage } from "../../refactoring/components/admin/AdminPage";
import { CartItem, Coupon, Product } from "../../types";
import { getRemainingStock } from "../../refactoring/hooks/utils/productUtils";
import {
  getAppliedDiscount,
  getCouponDiscount,
  getMaxDiscount,
  getMaxProductDiscount,
  getMemberGradeDiscount,
  getTotalAfterProductDiscount,
  getTotalBeforeProductDiscount,
} from "../../refactoring/hooks/utils/discountUtils";
import {
  initialGrade,
  useCart,
  useCoupons,
  useDiscount,
  useGrade,
  useLocalStorage,
  useNewGrade,
  useProducts,
  useRegisterCoupon,
  useSelectedCoupon,
  useSelectedGrade,
  useToggleProductAccordion,
  useToggleShow,
} from "../../refactoring/hooks";
import { ProductProvider } from "../../refactoring/provider/ProductProvider";
import { CouponProvider } from "../../refactoring/provider/CouponProvider";
import { CartProvider } from "../../refactoring/provider/CartProvider";
import { MemberProvider } from "../../refactoring/provider/MemberProvider";
import { mockMemberGrade } from "../../refactoring/mocks/handlers";
import { server } from "../../refactoring/mocks/server";
import {
  calculateItemTotal,
  getMaxApplicableDiscount,
  updateCartItemQuantity,
} from "../../refactoring/hooks/utils/cartUtils";
import { useAdmin } from "../../refactoring/hooks/useAdmin";
import {
  initialCoupons,
  initialRegisterCoupon,
} from "../../refactoring/constants/coupon.constants";
import { useProductEditForm } from "../../refactoring/hooks/useProductForm";

const mockProducts: Product[] = [
  {
    id: "p1",
    name: "상품1",
    price: 10000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.1 }],
  },
  {
    id: "p2",
    name: "상품2",
    price: 20000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.15 }],
  },
  {
    id: "p3",
    name: "상품3",
    price: 30000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.2 }],
  },
];
const mockCoupons: Coupon[] = [
  {
    name: "5000원 할인 쿠폰",
    code: "AMOUNT5000",
    discountType: "amount",
    discountValue: 5000,
  },
  {
    name: "10% 할인 쿠폰",
    code: "PERCENT10",
    discountType: "percentage",
    discountValue: 10,
  },
];

const TestAdminPage = () => {
  const [products] = useState<Product[]>(mockProducts);
  const [coupons] = useState<Coupon[]>(mockCoupons);

  // const handleProductUpdate = (updatedProduct: Product) => {
  //   setProducts((prevProducts) =>
  //     prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
  //   );
  // };

  // const handleProductAdd = (newProduct: Product) => {
  //   setProducts((prevProducts) => [...prevProducts, newProduct]);
  // };

  // const handleCouponAdd = (newCoupon: Coupon) => {
  //   setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  // };

  return (
    <ProductProvider initialProducts={products}>
      <CouponProvider initialCoupons={coupons}>
        <MemberProvider>
          <AdminPage />
        </MemberProvider>
      </CouponProvider>
    </ProductProvider>
  );
};

// MSW 서버 설정
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("advanced > ", () => {
  describe("시나리오 테스트 > ", () => {
    test("장바구니 페이지 테스트 > ", async () => {
      render(
        <ProductProvider initialProducts={mockProducts}>
          <CouponProvider initialCoupons={mockCoupons}>
            <MemberProvider>
              <CartProvider>
                <CartPage />
              </CartProvider>
            </MemberProvider>
          </CouponProvider>
        </ProductProvider>
      );
      const product1 = screen.getByTestId("product-p1");
      const product2 = screen.getByTestId("product-p2");
      const product3 = screen.getByTestId("product-p3");
      const addToCartButtonsAtProduct1 =
        within(product1).getByText("장바구니에 추가");
      const addToCartButtonsAtProduct2 =
        within(product2).getByText("장바구니에 추가");
      const addToCartButtonsAtProduct3 =
        within(product3).getByText("장바구니에 추가");

      // 1. 상품 정보 표시
      expect(product1).toHaveTextContent("상품1");
      expect(product1).toHaveTextContent("10,000원");
      expect(product1).toHaveTextContent("재고: 20개");
      expect(product2).toHaveTextContent("상품2");
      expect(product2).toHaveTextContent("20,000원");
      expect(product2).toHaveTextContent("재고: 20개");
      expect(product3).toHaveTextContent("상품3");
      expect(product3).toHaveTextContent("30,000원");
      expect(product3).toHaveTextContent("재고: 20개");

      // 2. 할인 정보 표시
      expect(screen.getByText("10개 이상: 10% 할인")).toBeInTheDocument();

      // 3. 상품1 장바구니에 상품 추가
      fireEvent.click(addToCartButtonsAtProduct1); // 상품1 추가

      // 4. 할인율 계산
      expect(screen.getByText("상품 금액: 10,000원")).toBeInTheDocument();
      expect(screen.getByText("할인 금액: 0원")).toBeInTheDocument();
      expect(screen.getByText("최종 결제 금액: 10,000원")).toBeInTheDocument();

      // 5. 상품 품절 상태로 만들기
      for (let i = 0; i < 19; i++) {
        fireEvent.click(addToCartButtonsAtProduct1);
      }

      // 6. 품절일 때 상품 추가 안 되는지 확인하기
      expect(product1).toHaveTextContent("재고: 0개");
      fireEvent.click(addToCartButtonsAtProduct1);
      expect(product1).toHaveTextContent("재고: 0개");

      // 7. 할인율 계산
      expect(screen.getByText("상품 금액: 200,000원")).toBeInTheDocument();
      expect(screen.getByText("할인 금액: 20,000원")).toBeInTheDocument();
      expect(screen.getByText("최종 결제 금액: 180,000원")).toBeInTheDocument();

      // 8. 상품을 각각 10개씩 추가하기
      fireEvent.click(addToCartButtonsAtProduct2); // 상품2 추가
      fireEvent.click(addToCartButtonsAtProduct3); // 상품3 추가

      const increaseButtons = screen.getAllByText("+");
      for (let i = 0; i < 9; i++) {
        fireEvent.click(increaseButtons[1]); // 상품2
        fireEvent.click(increaseButtons[2]); // 상품3
      }

      // 9. 할인율 계산
      expect(screen.getByText("상품 금액: 700,000원")).toBeInTheDocument();
      expect(screen.getByText("할인 금액: 110,000원")).toBeInTheDocument();
      expect(screen.getByText("최종 결제 금액: 590,000원")).toBeInTheDocument();

      // 10. 쿠폰 적용하기
      const couponSelect = screen.getByRole("combobox", {
        name: "쿠폰 선택",
      });
      fireEvent.change(couponSelect, { target: { value: "1" } }); // 10% 할인 쿠폰 선택

      // 11. 할인율 계산
      expect(screen.getByText("상품 금액: 700,000원")).toBeInTheDocument();
      expect(screen.getByText("할인 금액: 169,000원")).toBeInTheDocument();
      expect(screen.getByText("최종 결제 금액: 531,000원")).toBeInTheDocument();

      // 12. 다른 할인 쿠폰 적용하기
      fireEvent.change(couponSelect, { target: { value: "0" } }); // 5000원 할인 쿠폰
      expect(screen.getByText("상품 금액: 700,000원")).toBeInTheDocument();
      expect(screen.getByText("할인 금액: 115,000원")).toBeInTheDocument();
      expect(screen.getByText("최종 결제 금액: 585,000원")).toBeInTheDocument();
    });

    test("관리자 페이지 테스트 > ", async () => {
      render(<TestAdminPage />);

      const $product1 = screen.getByTestId("product-1");

      // 1. 새로운 상품 추가
      fireEvent.click(screen.getByText("새 상품 추가"));

      fireEvent.change(screen.getByLabelText("상품명"), {
        target: { value: "상품4" },
      });
      fireEvent.change(screen.getByLabelText("가격"), {
        target: { value: "15000" },
      });
      fireEvent.change(screen.getByLabelText("재고"), {
        target: { value: "30" },
      });

      fireEvent.click(screen.getByText("추가"));

      const $product4 = screen.getByTestId("product-4");

      expect($product4).toHaveTextContent("상품4");
      expect($product4).toHaveTextContent("15000원");
      expect($product4).toHaveTextContent("재고: 30");

      // 2. 상품 선택 및 수정
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId("toggle-button"));
      fireEvent.click(within($product1).getByTestId("modify-button"));

      act(() => {
        fireEvent.change(within($product1).getByDisplayValue("20"), {
          target: { value: "25" },
        });
        fireEvent.change(within($product1).getByDisplayValue("10000"), {
          target: { value: "12000" },
        });
        fireEvent.change(within($product1).getByDisplayValue("상품1"), {
          target: { value: "수정된 상품1" },
        });
      });

      fireEvent.click(within($product1).getByText("수정 완료"));

      expect($product1).toHaveTextContent("수정된 상품1");
      expect($product1).toHaveTextContent("12000원");
      expect($product1).toHaveTextContent("재고: 25");

      // 3. 상품 할인율 추가 및 삭제
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId("modify-button"));

      // 할인 추가
      act(() => {
        fireEvent.change(screen.getByPlaceholderText("수량"), {
          target: { value: "5" },
        });
        fireEvent.change(screen.getByPlaceholderText("할인율 (%)"), {
          target: { value: "5" },
        });
      });
      fireEvent.click(screen.getByText("할인 추가"));

      expect(
        screen.queryByText("5개 이상 구매 시 5% 할인")
      ).toBeInTheDocument();

      // 할인 삭제
      fireEvent.click(screen.getAllByText("삭제")[0]);
      expect(
        screen.queryByText("10개 이상 구매 시 10% 할인")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("5개 이상 구매 시 5% 할인")
      ).toBeInTheDocument();

      fireEvent.click(screen.getAllByText("삭제")[0]);
      expect(
        screen.queryByText("10개 이상 구매 시 10% 할인")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("5개 이상 구매 시 5% 할인")
      ).not.toBeInTheDocument();

      // 4. 쿠폰 추가
      fireEvent.change(screen.getByPlaceholderText("쿠폰 이름"), {
        target: { value: "새 쿠폰" },
      });
      fireEvent.change(screen.getByPlaceholderText("쿠폰 코드"), {
        target: { value: "NEW10" },
      });
      fireEvent.change(screen.getByRole("combobox"), {
        target: { value: "percentage" },
      });
      fireEvent.change(screen.getByPlaceholderText("할인 값"), {
        target: { value: "10" },
      });

      fireEvent.click(screen.getByText("쿠폰 추가"));

      const $newCoupon = screen.getByTestId("coupon-3");

      expect($newCoupon).toHaveTextContent("새 쿠폰 (NEW10):10% 할인");
    });
  });

  describe("utils 테스트", () => {
    describe("cartUtils 테스트", () => {
      test("getMaxApplicableDiscount 최대 적용 할인율 확인", () => {
        const dummyCart: CartItem[] = [
          { product: mockProducts[0], quantity: 20 },
        ];

        const maxApplicableDiscount = getMaxApplicableDiscount(dummyCart[0]);

        expect(maxApplicableDiscount).toBe(
          mockProducts[0].discounts[mockProducts[0].discounts.length - 1].rate
        );
      });

      test("calculateItemTotal 상품 할인이 적용된 후 총 금액 확인", () => {
        const dummyCart: CartItem[] = [
          { product: mockProducts[0], quantity: 20 },
        ];

        const maxApplicableDiscount = getMaxApplicableDiscount(dummyCart[0]);

        const basePrice = mockProducts[0].price * dummyCart[0].quantity;
        const totalProductDiscount = basePrice * maxApplicableDiscount;

        expect(basePrice - totalProductDiscount).toBe(180000);
      });

      test("calculateCartTotal 총 금액 확인", () => {
        const dummyCart: CartItem[] = [
          { product: mockProducts[0], quantity: 20 },
        ];

        const totalBeforeProductDiscount =
          getTotalBeforeProductDiscount(dummyCart);
        const totalAfterProductDiscount =
          getTotalAfterProductDiscount(dummyCart);

        const couponDiscount = getCouponDiscount(
          totalAfterProductDiscount,
          null
        );
        const memberGradeDiscount = getMemberGradeDiscount(
          totalAfterProductDiscount,
          null
        );

        const totalAfterDiscount =
          totalAfterProductDiscount - couponDiscount - memberGradeDiscount;
        const totalGradeDiscount = memberGradeDiscount;
        const totalDiscount = totalBeforeProductDiscount - totalAfterDiscount;

        expect(totalAfterDiscount).toBe(180000);
        expect(totalGradeDiscount).toBe(0);
        expect(totalDiscount).toBe(20000);
      });

      describe("updateCartItemQuantity 장바구니 상품 수량 변경", () => {
        test("장바구니 상품 수량 변경", () => {
          const dummyCart: CartItem[] = [
            { product: mockProducts[0], quantity: 20 },
          ];

          const updatedCart = updateCartItemQuantity(dummyCart, "p1", 10);

          expect(updatedCart[0].quantity).toBe(10);
        });

        test("장바구니 상품 수량 변경 시 재고 초과 시 재고 최대양 만큼 수량 변경", () => {
          const dummyCart: CartItem[] = [
            { product: mockProducts[0], quantity: 20 },
          ];

          const updatedCart = updateCartItemQuantity(dummyCart, "p1", 21);

          expect(updatedCart[0].quantity).toBe(20);
        });
      });
    });

    describe("discountUtils 테스트", () => {
      test("getMaxDiscount 할인율 최대값 확인", () => {
        const dummyProduct = mockProducts[0];

        const maxDiscount = getMaxDiscount(dummyProduct.discounts);

        expect(maxDiscount).toBe(dummyProduct.discounts[0].rate);
      });

      describe("getAppliedDiscount 테스트", () => {
        test("상품 수량이 최소 요구 할인 수량보다 크면 할인율 적용", () => {
          const dummyCart: CartItem[] = [
            { product: mockProducts[0], quantity: 10 },
          ];
          const dummyProduct = mockProducts[0];

          const appliedDiscount = getAppliedDiscount(dummyCart[0]);

          expect(appliedDiscount).toBe(dummyProduct.discounts[0].rate);
        });

        test("상품 수량이 최소 요구 할인 수량보다 작으면 할인율 적용 안됨", () => {
          const dummyCart: CartItem[] = [
            { product: mockProducts[0], quantity: 9 },
          ];

          const appliedDiscount = getAppliedDiscount(dummyCart[0]);

          expect(appliedDiscount).toBe(0);
        });
      });

      describe("getMaxProductDiscount 테스트", () => {
        test("상품 수량이 최소 요구 할인 수량보다 크면 할인율 적용", () => {
          const dummyProduct = mockProducts[0];
          const dummyCart: CartItem[] = [
            { product: mockProducts[0], quantity: 20 },
          ];

          const maxProductDiscount = getMaxProductDiscount(dummyCart[0]);

          expect(maxProductDiscount).toBe(dummyProduct.discounts[0].rate);
        });

        test("상품 수량이 최소 요구 할인 수량보다 작으면 할인율 미적용", () => {
          const dummyCart: CartItem[] = [
            { product: mockProducts[0], quantity: 2 },
          ];

          const maxProductDiscount = getMaxProductDiscount(dummyCart[0]);

          expect(maxProductDiscount).toBe(0);
        });
      });

      describe("getTotalBeforeProductDiscount 테스트", () => {
        test("상품 할인이 적용하기 전 총 금액 확인", () => {
          const dummyProduct = mockProducts[0];
          const dummyCart: CartItem[] = [
            { product: mockProducts[0], quantity: 20 },
          ];

          const totalBeforeProductDiscount =
            getTotalBeforeProductDiscount(dummyCart);

          expect(totalBeforeProductDiscount).toBe(dummyProduct.price * 20);
        });
      });

      describe("getTotalAfterProductDiscount 테스트", () => {
        test("상품 할인이 적용된 후 총 금액 확인", () => {
          const dummyCart: CartItem[] = [
            { product: mockProducts[0], quantity: 20 },
          ];

          const totalAfterProductDiscount =
            getTotalAfterProductDiscount(dummyCart);
          const totalProductDiscount = dummyCart.reduce((acc, item) => {
            return acc + calculateItemTotal(item);
          }, 0);

          expect(totalAfterProductDiscount).toBe(totalProductDiscount);
        });
      });

      describe("getMemberGradeDiscount 테스트", () => {
        test("멤버 등급이 없으면 할인율 적용 안됨", () => {
          const totalAfterProductDiscount = 100000;

          const memberGradeDiscount = getMemberGradeDiscount(
            totalAfterProductDiscount,
            null
          );

          expect(memberGradeDiscount).toBe(0);
        });

        test("멤버 등급이 있으면 할인율 적용 됨", () => {
          const totalAfterProductDiscount = 10000;

          const memberGradeDiscount = getMemberGradeDiscount(
            totalAfterProductDiscount,
            mockMemberGrade[0]
          );

          expect(memberGradeDiscount).toBe(300);
        });
      });

      describe("getCouponDiscount 테스트", () => {
        test("쿠폰이 없으면 할인율 적용 안됨", () => {
          const totalAfterProductDiscount = 10000;

          const couponDiscount = getCouponDiscount(
            totalAfterProductDiscount,
            null
          );

          expect(couponDiscount).toBe(0);
        });

        test("쿠폰이 있으면 할인율 적용 됨(할인유형: 퍼센트)", () => {
          const totalAfterProductDiscount = 10000;

          const couponDiscount = getCouponDiscount(
            totalAfterProductDiscount,
            mockCoupons[1]
          );

          expect(couponDiscount).toBe(1000);
        });

        test("쿠폰이 있으면 할인율 적용 됨(할인유형: 정액)", () => {
          const totalAfterProductDiscount = 10000;

          const couponDiscount = getCouponDiscount(
            totalAfterProductDiscount,
            mockCoupons[0]
          );

          expect(couponDiscount).toBe(5000);
        });
      });
    });

    describe("productUtils 테스트", () => {
      test("getRemainingStock 장바구니가 비어있는 경우의 재고", () => {
        const dummyCart: CartItem[] = [];
        const dummyProduct = mockProducts[0];

        const remainingStock = getRemainingStock(dummyProduct, dummyCart);

        expect(remainingStock).toBe(dummyProduct.stock);
      });

      test("getRemainingStock 장바구니에 해당 상품이 있는 경우의 재고", () => {
        const dummyCart: CartItem[] = [
          { product: mockProducts[0], quantity: 1 },
        ];
        const dummyProduct = mockProducts[0];

        const remainingStock = getRemainingStock(dummyProduct, dummyCart);

        expect(remainingStock).toBe(dummyProduct.stock - 1);
      });

      test("getRemainingStock 장바구니에 해당 상품이 없는 경우의 재고", () => {
        const dummyCart: CartItem[] = [];
        const dummyProduct = mockProducts[0];

        const remainingStock = getRemainingStock(dummyProduct, dummyCart);

        expect(remainingStock).toBe(dummyProduct.stock);
      });
    });
  });

  describe("hooks 테스트", () => {
    describe("useAdmin 테스트", () => {
      test("useAdmin 기본 비활성화", () => {
        const { result } = renderHook(() => useAdmin());

        expect(result.current.isAdmin).toBe(false);
      });

      test("useAdmin 클릭시 활성화", () => {
        const { result } = renderHook(() => useAdmin());

        act(() => {
          result.current.handleToggleAdmin();
        });

        expect(result.current.isAdmin).toBe(true);
      });
    });

    describe("useCoupon 테스트", () => {
      describe("useCoupons 테스트", () => {
        test("useCoupon 기본 쿠폰 목록 확인", () => {
          const { result } = renderHook(() => useCoupons(initialCoupons));

          expect(result.current.coupons.length).toBe(2);
        });

        test("useCoupon 쿠폰 추가 잘되는지 체크", () => {
          const { result } = renderHook(() => useCoupons(initialCoupons));
          const dummyCoupon = initialCoupons[0];

          act(() => {
            result.current.addCoupon(dummyCoupon);
          });

          expect(result.current.coupons.length).toBe(3);
        });
      });

      describe("useSelectedCoupon 테스트", () => {
        test("useSelectedCoupon 기본 선택된 쿠폰 없음", () => {
          const { result } = renderHook(() => useSelectedCoupon());

          expect(result.current.selectedCoupon).toBeNull();
        });

        test("useSelectedCoupon 쿠폰 선택", () => {
          const { result } = renderHook(() => useSelectedCoupon());
          const dummyCoupon = initialCoupons[0];

          act(() => {
            result.current.applyCoupon(dummyCoupon);
          });

          expect(result.current.selectedCoupon).toBe(dummyCoupon);
        });
      });

      describe("useRegisterCoupon 테스트", () => {
        test("useRegisterCoupon 기본 쿠폰 등록 폼 확인", () => {
          const { result } = renderHook(() => useRegisterCoupon());

          expect(result.current.newCoupon).toBe(initialRegisterCoupon);
        });

        test("useRegisterCoupon 새 쿠폰 등록", () => {
          const { result } = renderHook(() => useRegisterCoupon());
          const mockOnCouponAdd = vi.fn();

          act(() => {
            result.current.handleAddCoupon(mockOnCouponAdd);
          });

          expect(mockOnCouponAdd).toHaveBeenCalledTimes(1);
          expect(result.current.newCoupon).toBe(initialRegisterCoupon);
        });
      });
    });

    describe("useLocalStorage 테스트", () => {
      test("getLocalStorage 저장되고 잘 가져오는지 확인", () => {
        const { result } = renderHook(() => useLocalStorage());

        act(() => {
          result.current.setLocalStorage("products", mockProducts);
        });

        expect(result.current.getLocalStorage("products")).toEqual(
          mockProducts
        );
      });

      test("removeLocalStorage 저장되고 잘 제거되는지 확인", () => {
        const { result } = renderHook(() => useLocalStorage());

        act(() => {
          result.current.setLocalStorage("products", mockProducts);
        });

        act(() => {
          result.current.removeLocalStorage("products");
        });

        expect(result.current.getLocalStorage("products")).toBeNull();
      });

      test("getLocalStorage 불러온 데이터로 초기 데이터 셋팅이 잘되는지 확인", () => {
        const { result } = renderHook(() => useLocalStorage());

        act(() => {
          result.current.setLocalStorage("products", mockProducts);
        });

        const { result: productsResult } = renderHook(
          () => useProducts(mockProducts),
          {
            wrapper: ({ children }) => (
              <ProductProvider initialProducts={mockProducts}>
                {children}
              </ProductProvider>
            ),
          }
        );

        expect(productsResult.current.products.length).toBe(
          mockProducts.length
        );
      });
    });

    describe("useGrade 테스트", () => {
      describe("useNewGrade 테스트", () => {
        test("useNewGrade 기본 등록 폼 확인", () => {
          const { result } = renderHook(() => useNewGrade());

          expect(result.current.newGrade).toBe(initialGrade);
        });

        test("useNewGrade 새 등급 등록", () => {
          const { result } = renderHook(() => useNewGrade());
          const dummyGrade = mockMemberGrade[0];

          act(() => {
            result.current.setNewGrade(dummyGrade);
          });

          expect(result.current.newGrade).toBe(dummyGrade);
        });
      });

      describe("useGrade 테스트", () => {
        test("msw 서버에서 등급 목록 가져오는지 확인", async () => {
          const { result } = renderHook(() => useGrade());

          await waitFor(() => {
            expect(result.current.grades.length).toBe(mockMemberGrade.length);
          });

          expect(result.current.grades).toEqual(mockMemberGrade);
        });
      });

      describe("useSelectedGrade 테스트", () => {
        test("useSelectedGrade 기본 선택된 등급 없음", () => {
          const { result } = renderHook(() => useSelectedGrade());

          expect(result.current.selectedGrade).toBeNull();
        });

        test("useSelectedGrade 등급 선택", () => {
          const { result } = renderHook(() => useSelectedGrade());
          const dummyGrade = mockMemberGrade[0];

          act(() => {
            result.current.applyGrade(dummyGrade);
          });

          expect(result.current.selectedGrade).toBe(dummyGrade);
        });
      });
    });

    describe("useProduct 테스트", () => {
      describe("useProducts 테스트", () => {
        test("useProducts 기본 상품 목록 확인", () => {
          const { result } = renderHook(() => useProducts(mockProducts));

          expect(result.current.products.length).toBe(mockProducts.length);
        });

        test("useProducts 상품 수정", () => {
          const { result } = renderHook(() => useProducts(mockProducts));
          const dummyProduct = { ...mockProducts[0], name: "상품1-1" };

          act(() => {
            result.current.updateProduct(dummyProduct);
          });

          expect(result.current.products[0].name).toEqual("상품1-1");
        });

        test("useProducts 상품 추가", () => {
          const { result } = renderHook(() => useProducts(mockProducts));
          const dummyProduct = mockProducts[0];

          act(() => {
            result.current.addProduct(dummyProduct);
          });

          expect(result.current.products.length).toBe(mockProducts.length + 1);
        });
      });
    });

    describe("useProductForm 테스트", () => {
      describe("useProductEditForm 테스트", () => {
        test("useProductEditForm 기본 수정 폼 확인", () => {
          const { result } = renderHook(() => useProductEditForm());

          expect(result.current.editingProduct).toBeNull();
        });

        test("useProductEditForm 상품 이름 수정", () => {
          const { result } = renderHook(() => useProductEditForm());
          const dummyProduct = mockProducts[0];

          act(() => {
            result.current.handleEditProduct(dummyProduct);
          });

          act(() => {
            result.current.handleProductNameUpdate("p1", "새로운 상품명");
          });

          // 결과 검증
          expect(result.current.editingProduct?.name).toBe("새로운 상품명");
        });

        test("useProductEditForm 상품 가격 수정", () => {
          const { result } = renderHook(() => useProductEditForm());
          const dummyProduct = mockProducts[0];

          act(() => {
            result.current.handleEditProduct(dummyProduct);
          });

          act(() => {
            result.current.handlePriceUpdate("p1", 5000);
          });

          expect(result.current.editingProduct?.price).toBe(5000);
        });

        test("handleStockUpdate 상품 재고 수정", () => {
          const { result } = renderHook(() => useProductEditForm());
          const dummyProduct = mockProducts[0];
          const mockUpdateProduct = vi.fn();
          const mockSetEditingProduct = vi.fn();

          act(() => {
            result.current.handleEditProduct(dummyProduct);
          });

          act(() => {
            result.current.handleStockUpdate(
              "p1",
              10,
              mockProducts,
              mockUpdateProduct,
              mockSetEditingProduct
            );
          });

          expect(mockUpdateProduct).toHaveBeenCalledTimes(1);
          expect(mockSetEditingProduct).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe("useToggle 테스트", () => {
      describe("useToggleProductAccordion 테스트", () => {
        test("toggleProductAccordion productId 추가 및 제거", () => {
          const { result } = renderHook(() => useToggleProductAccordion());
          const testProductId = "p1";

          act(() => {
            result.current.toggleProductAccordion(testProductId);
          });

          act(() => {
            result.current.toggleProductAccordion(testProductId);
          });

          expect(result.current.openProductIds.has(testProductId)).toBe(false);
          expect(result.current.openProductIds.size).toBe(0);
        });

        test("toggleProductAccordion 여러 productId 추가 및 제거", () => {
          const { result } = renderHook(() => useToggleProductAccordion());
          const testProductId1 = "p1";
          const testProductId2 = "p2";

          act(() => {
            result.current.toggleProductAccordion(testProductId1);
          });

          act(() => {
            result.current.toggleProductAccordion(testProductId2);
          });

          expect(result.current.openProductIds.has(testProductId1)).toBe(true);
          expect(result.current.openProductIds.has(testProductId2)).toBe(true);
          expect(result.current.openProductIds.size).toBe(2);
        });
      });

      describe("useToggleShow 테스트", () => {
        test("useToggleShow 기본 비활성화", () => {
          const { result } = renderHook(() => useToggleShow());

          expect(result.current.show).toBe(false);
        });

        test("useToggleShow 기본 활성화", () => {
          const { result } = renderHook(() => useToggleShow());

          act(() => {
            result.current.setShow(true);
          });

          expect(result.current.show).toBe(true);
        });
      });
    });

    describe("useCart 테스트", () => {
      test("useCart 장바구니 추가 및 제거", () => {
        const { result } = renderHook(() => useCart());

        act(() => {
          result.current.addToCart(mockProducts[0]);
        });

        expect(result.current.cart.length).toBe(1);

        act(() => {
          result.current.removeFromCart(mockProducts[0].id);
        });

        expect(result.current.cart.length).toBe(0);
      });

      test("useCart 장바구니 수량 수정", () => {
        const { result } = renderHook(() => useCart());

        act(() => {
          result.current.addToCart(mockProducts[0]);
        });

        act(() => {
          result.current.updateQuantity(mockProducts[0].id, 2);
        });

        expect(result.current.cart[0].quantity).toBe(2);
      });
    });

    describe("useDiscount 테스트", () => {
      test("useDiscount 할인 추가 및 제거", () => {
        const { result } = renderHook(() => useDiscount());
        const mockEditingProduct = mockProducts[0];
        const mockUpdateProduct = vi.fn();
        const mockSetEditingProduct = vi.fn();

        act(() => {
          result.current.handleAddDiscount(
            mockEditingProduct.id,
            mockProducts,
            mockUpdateProduct,
            mockEditingProduct,
            mockSetEditingProduct
          );
        });

        expect(mockUpdateProduct).toHaveBeenCalledTimes(1);
        expect(mockSetEditingProduct).toHaveBeenCalledTimes(1);
        expect(result.current.newDiscount).toEqual({ quantity: 0, rate: 0 });
      });
    });
  });
});
