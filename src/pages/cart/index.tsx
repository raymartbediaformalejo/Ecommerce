import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import mergeProductNameID from "../../utils/mergeProductNameID";
import { useGetAllProductsQuery } from "../../redux/products/products.api";
import Product from "../../components/Products/Product";
import classes from "../../styles/pages/cart/Cart.module.css";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import CartItem from "./components/CartItem";
import CartOrderTotal from "./components/OrderTotal";
import CartHeader from "./components/CartHeader";
import { cartParams } from "../../utils/productConstant";
import { TSelectedCart } from "../../redux/cart/cart.types";
import { extractIdFromURLParam } from "../../utils/extractId";

const Cart = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const productParam = searchParams.get(cartParams.product) || "[]";
  const [decodedData, setDecodedData] = useState<TSelectedCart[]>(
    JSON.parse(decodeURIComponent(productParam))
  );

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const cart = useAppSelector((state) => state.cart.products);
  const cartItemsIds = cart && cart.map((cartItem) => cartItem.id);
  const { data: products } = useGetAllProductsQuery({ ids: cartItemsIds });
  const selectedCartItemIds = extractIdFromURLParam(decodedData);
  const isCartEmpty =
    cart && cart.length > 0 && cartItemsIds && cartItemsIds.length > 0;
  const isCartHasTheSelectedCart = cart.some(
    (cartItem) => cartItem.id === selectedCartItemIds[0]
  );
  const isSelectedAllCartItem =
    cart.length !== 0 &&
    decodedData.length !== 0 &&
    cart.length === decodedData.length &&
    isCartHasTheSelectedCart;

  const totalCartItems = cart?.reduce((prevValue, currentValue) => {
    return prevValue + currentValue.quantity;
  }, 0);
  const totalItemSelected = selectedCartItemIds.reduce((acc, prevValue) => {
    const selectedCartItem = cart?.find((product) => product.id === prevValue);
    if (selectedCartItem) {
      return acc + selectedCartItem?.quantity;
    } else {
      return 0;
    }
  }, 0);
  const subtotal = selectedCartItemIds.reduce((prevValue, currentValue) => {
    let subTotal = 0;
    const selectedCart = cart.find((cartItem) => cartItem.id === currentValue);
    const selectedProduct = products?.products.find(
      (product) => product.id === currentValue
    );

    if (selectedCart && selectedCart.quantity && selectedProduct) {
      const discounterPrice =
        selectedProduct.price -
        (selectedProduct.discountPercentage / 100) * selectedProduct.price;
      subTotal = prevValue + discounterPrice * selectedCart?.quantity;
    }

    return subTotal;
  }, 0);

  const totalDiscount = selectedCartItemIds.reduce(
    (prevValue, currentValue) => {
      let totalDiscount = 0;
      const selectedCart = cart.find(
        (cartItem) => cartItem.id === currentValue
      );

      const selectedProduct = products?.products.find(
        (product) => product.id === currentValue
      );

      if (selectedCart && selectedCart.quantity && selectedProduct) {
        const discountedPrice =
          (selectedProduct.discountPercentage / 100) * selectedProduct.price;
        totalDiscount = prevValue + discountedPrice * selectedCart.quantity;
      }
      return totalDiscount;
    },
    0
  );

  const handleSelectAll = () => {
    const allCartItemArrayString: TSelectedCart[] = cart.map((cartItem) => {
      const product = products?.products.find(
        (product) => product.id === cartItem.id
      );

      const { newProductId } = mergeProductNameID({
        productName: product?.title,
        productId: product?.id,
      });

      return {
        ...cartItem,
        id: newProductId || "",
      };
    });

    const encodedCartData = encodeURIComponent(
      JSON.stringify(allCartItemArrayString)
    );
    if (isSelectedAllCartItem) {
      setDecodedData([]);
    } else {
      setDecodedData(allCartItemArrayString);
    }

    setSearchParams((prev) => {
      if (isSelectedAllCartItem) {
        prev.delete(cartParams.product);
      } else {
        prev.set(cartParams.product, encodedCartData);
      }
      return prev;
    });
  };

  const handleToggleDeleteButton = () => {
    setIsOpenDeleteModal((prev) => !prev);
  };

  return (
    <div className={`container ${classes["cart"]}`}>
      <CartHeader
        totalCartItems={totalCartItems}
        selectedCartItem={selectedCartItemIds}
        totalItemSelected={totalItemSelected}
        setSearchParams={setSearchParams}
        isOpenModal={isOpenDeleteModal}
        isCartHasTheSelectedCart={isCartHasTheSelectedCart}
        onToggleDeleteButton={handleToggleDeleteButton}
      />
      {isCartEmpty ? (
        <Product isGridLayout={false} page="cart">
          <CartItem
            products={products?.products}
            cartItems={cart}
            selectedCartItem={selectedCartItemIds}
            setSearchParams={setSearchParams}
            decodedData={decodedData}
            setDecodedData={setDecodedData}
          />
        </Product>
      ) : (
        <div className={classes["empty-cart"]}>
          <p>You have no items in your cart.</p>
        </div>
      )}
      <CartOrderTotal
        cartItems={cart}
        isCartEmpty={isCartEmpty}
        isSelectedAllCartItem={isSelectedAllCartItem}
        totalItemSelected={totalItemSelected}
        selectedCartItem={selectedCartItemIds}
        setSearchParams={setSearchParams}
        subtotal={subtotal}
        totalDiscount={totalDiscount}
        decodedData={decodedData}
        onSelectAll={handleSelectAll}
      />
    </div>
  );
};

export default Cart;
