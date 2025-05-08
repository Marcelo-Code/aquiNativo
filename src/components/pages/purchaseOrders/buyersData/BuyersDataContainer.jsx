import { useContext, useState } from "react";
import { createPurchaseOrderRPC } from "../../../../services/api/purchaseOrders";
import {
  errorToastifyAlert,
  successToastifyAlert,
} from "../../../../utils/alerts";
import { BuyersData } from "./BuyersData";
import { GeneralContext } from "../../../../context/GeneralContext";

export const BuyersDataContainer = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const { cart, clearCart, handleGoBack } = useContext(GeneralContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(cart);
    createPurchaseOrderRPC(cart)
      .then((response) => {
        console.log(response);
        successToastifyAlert(response.message);
        clearCart();
      })
      .catch((error) => {
        errorToastifyAlert(error.message || "Ocurrió un error inesperado");
        console.error(error);
      });
  };

  const buyersDataProps = {
    handleSubmit,
    handleGoBack,
    formData,
    handleChange,
  };

  return <BuyersData {...buyersDataProps} />;
};
