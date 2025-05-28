import { useContext, useEffect, useState } from "react";
import { createPurchaseOrder } from "../../../../services/api/purchaseOrders";
import {
  errorToastifyAlert,
  successToastifyAlert,
} from "../../../../utils/alerts";
import { BuyersData } from "./BuyersData";
import { GeneralContext } from "../../../../context/GeneralContext";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { useNavigate } from "react-router-dom";
import { getData } from "../../../../services/api/data";

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
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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

    Promise.all([getData(), createPurchaseOrder(cart, formData, totalPrice)])
      .then(([dataResponse, orderResponse]) => {
        successToastifyAlert(orderResponse.message);
        clearCart();
        setCreatedPurchaseOrder(orderResponse.data);
        setPhoneNumber(dataResponse.data.phone_number);
      })
      .catch((error) => {
        errorToastifyAlert(error.message || "Ocurrió un error inesperado");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (!createdPurchaseOrder || !createdPurchaseOrder.cart) return;

    const lines = [];
    lines.push(`👋 Hola te envío los detalles de mi compra:\n`);
    lines.push(`🧾 *Orden de compra nro ${createdPurchaseOrder.order_id}*\n`);
    lines.push(
      `👤 *Comprador:* ${createdPurchaseOrder.buyer.buyer_name || "N/A"} ${
        createdPurchaseOrder.buyer.buyer_last_name || "N/A"
      }`
    );
    lines.push(
      `🏠 *Dirección:* ${createdPurchaseOrder.buyer.buyer_address || "N/A"}`
    );
    lines.push(
      `📞 *Teléfono:* ${createdPurchaseOrder.buyer.buyer_phone_number || "-"}`
    );
    lines.push(
      `📧 *Email:* ${createdPurchaseOrder.buyer.buyer_email || "N/A"}\n`
    );
    lines.push(`🛒 *Productos:*\n`);

    createdPurchaseOrder.cart.forEach((item, index) => {
      const subtotal = (item.price * item.quantity).toFixed(2);
      lines.push(
        `${index + 1}. ${item.description}\n   Cantidad: ${
          item.quantity
        } | Precio: $${item.price.toFixed(2)} | Subtotal: $${subtotal}`
      );
    });

    const total_price = Number(createdPurchaseOrder.totalPrice) || 0;
    lines.push(`\n📌 *Total:* $${total_price.toFixed(2)}`);

    // ⚠️ Encode only after the string is fully formed
    const message = encodeURIComponent(lines.join("\n"));

    const whatsappUrlUpdated = `https://wa.me/${phoneNumber}?text=${message}`;
    setWhatsappUrl(whatsappUrlUpdated);
  }, [createdPurchaseOrder, phoneNumber]);

  if (isLoading) return <LoadingContainer />;

  const buyersDataProps = {
    handleSubmit,
    handleGoBack,
    formData,
    handleChange,
    createdPurchaseOrder,
    totalPrice,
    handleNavigate,
    whatsappUrl,
  };

  return <BuyersData {...buyersDataProps} />;
};
