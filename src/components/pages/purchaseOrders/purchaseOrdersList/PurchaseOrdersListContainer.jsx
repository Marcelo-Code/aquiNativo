import { useEffect, useState } from "react";
import { PurchaseOrderList } from "./PurchaseOrderList";
import {
  getPurchaseOrders,
  getPurchaseOrdersItems,
} from "../../../../services/api/purchaseOrders";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { ErrorContainer } from "../../error/ErrorContainer";

export const PurchaseOrdersListContainer = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetOrderDetails = async (orderId) => {
    const response = await getPurchaseOrdersItems(orderId);
    console.log(response);
  };

  useEffect(() => {
    setIsLoading(true);

    getPurchaseOrders()
      .then((response) => {
        console.log(response);
        setOrders(response.data);
      })
      .catch((error) => {
        setError(error.message || "Ocurrió un error inesperado");
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingContainer />;
  if (error) return <ErrorContainer error={error} />;

  const purchaseOrdersListProps = {
    orders,
    handleGetOrderDetails,
  };

  return <PurchaseOrderList {...purchaseOrdersListProps} />;
};
