import { useContext } from "react";
import { GeneralContext } from "../../../../context/GeneralContext";
import { CartList } from "./CartList";

export const CartListContainer = () => {
  const { cart, removeProduct, addProduct, removeProductFromCart } =
    useContext(GeneralContext);

  //Calculo del precio total
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const cartListProps = {
    cart,
    removeProduct,
    addProduct,
    totalPrice,
    removeProductFromCart,
  };

  return <CartList {...cartListProps} />;
};
