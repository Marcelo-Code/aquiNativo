import { useEffect, useState } from "react";
import { PurchaseOrderList } from "./PurchaseOrderList";
import {
  getPurchaseOrders,
  getPurchaseOrdersItems,
  updatePurchaseOrderStatus,
} from "../../../../services/api/purchaseOrders";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { ErrorContainer } from "../../error/ErrorContainer";
import { FIELDS_TO_SEARCH, SORT_OPTIONS } from "./filtersPurchaseOrdersList";

export const PurchaseOrdersListContainer = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusIsLoading, setStatusIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const handleGetOrderDetails = async (orderId) => {
    const response = await getPurchaseOrdersItems(orderId);
    console.log(response);
  };

  const handleChangeStatus = async (orderId) => {
    try {
      setStatusIsLoading(orderId);
      await updatePurchaseOrderStatus(orderId);

      setFilteredOrders((prevFiltered) =>
        prevFiltered.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status:
                  order.status === "pendiente" ? "finalizado" : "pendiente",
              }
            : order
        )
      );
    } catch (error) {
      console.error("Error al actualizar status:", error);
    } finally {
      setStatusIsLoading(null);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    getPurchaseOrders()
      .then((response) => {
        console.log(response);
        setOrders(response.data);
        setFilteredOrders(response.data);
      })
      .catch((error) => {
        setError(error.message || "Ocurrió un error inesperado");
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingContainer />;
  if (error) return <ErrorContainer error={error} />;

  const generalBarContainerProps = {
    enableSearchFilterBar: true,
    enableEditionBar: false,
    setFilteredRecords: setFilteredOrders,
    records: orders,
    SORT_OPTIONS,
    FILTER_OPTIONS: [],
    FIELDS_TO_SEARCH,
  };

  const purchaseOrdersListProps = {
    ...generalBarContainerProps,
    filteredOrders,
    handleGetOrderDetails,
    setFilteredOrders,
    handleChangeStatus,
    statusIsLoading,
  };

  return <PurchaseOrderList {...purchaseOrdersListProps} />;
};
