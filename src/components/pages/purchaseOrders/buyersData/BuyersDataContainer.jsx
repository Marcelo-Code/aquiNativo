import { useContext, useState } from "react";
import { createPurchaseOrder } from "../../../../services/api/purchaseOrders";
import {
  errorToastifyAlert,
  successToastifyAlert,
} from "../../../../utils/alerts";
import { BuyersData } from "./BuyersData";
import { GeneralContext } from "../../../../context/GeneralContext";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { useNavigate } from "react-router-dom";

export const BuyersDataContainer = () => {
  const [formData, setFormData] = useState({
    buyer_name: "",
    buyer_last_name: "",
    buyer_address: "",
    buyer_phone_number: "",
    buyer_email: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [createdPurchaseOrder, setCreatedPurchaseOrder] = useState({});
  const navigate = useNavigate();

  const { cart, clearCart, handleGoBack } = useContext(GeneralContext);

  const handleNavigate = () => {
    navigate("/");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    createPurchaseOrder(cart, formData, totalPrice)
      .then((response) => {
        console.log(response);
        successToastifyAlert(response.message);
        clearCart();
        setCreatedPurchaseOrder(response.data);
      })
      .catch((error) => {
        errorToastifyAlert(error.message || "Ocurrió un error inesperado");
      })
      .finally(() => setIsLoading(false));
  };

  if (isLoading) return <LoadingContainer />;

  const buyersDataProps = {
    handleSubmit,
    handleGoBack,
    formData,
    handleChange,
    createdPurchaseOrder,
    totalPrice,
    handleNavigate,
  };

  return <BuyersData {...buyersDataProps} />;
};
