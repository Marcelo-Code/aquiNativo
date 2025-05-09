import { useParams } from "react-router-dom";
import { PurchaseOrdersItemsList } from "./PurchaseOrdersItemsList";
import { useEffect, useState } from "react";
import {
  getPurchaseOrder,
  getPurchaseOrdersItems,
} from "../../../../services/api/purchaseOrders";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { ErrorContainer } from "../../error/ErrorContainer";

export const PurchaseOrdersItemsListContainer = () => {
  const { purchaseOrderId } = useParams();

  const [items, setItems] = useState([]);
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Función para manejar errores y mostrar el mensaje adecuado
  const handleError = (response) => {
    const errorMessage =
      typeof response.error === "string"
        ? response.error
        : JSON.stringify(response.error);
    throw new Error(`${response.message}: ${errorMessage}`);
  };

  useEffect(() => {
    setIsLoading(true);

    Promise.all([
      getPurchaseOrdersItems(purchaseOrderId),
      getPurchaseOrder(purchaseOrderId),
    ])
      .then(([responsePurchaseOrdersItems, responsePurchaseOrder]) => {
        //Captura erores en caso de que existan
        if (responsePurchaseOrdersItems.status !== 200) {
          handleError(responsePurchaseOrdersItems);
        }

        if (responsePurchaseOrder.status !== 200) {
          handleError(responsePurchaseOrder);
        }

        const responsePurchaseOrdersItemsData =
          responsePurchaseOrdersItems.data;
        const responsePurchaseOrderData = responsePurchaseOrder.data;
        setItems(responsePurchaseOrdersItemsData);
        setOrder(responsePurchaseOrderData);
      })
      .catch((error) => {
        setError(error.message || "Ocurrió un error inesperado");
      })
      .finally(() => setIsLoading(false));
  }, [purchaseOrderId]);

  if (isLoading) return <LoadingContainer />;
  if (error) return <ErrorContainer error={error} />;

  console.log(purchaseOrderId);

  const purchaseOrdersItemsListProps = {
    items,
    order,
  };

  return <PurchaseOrdersItemsList {...purchaseOrdersItemsListProps} />;
};
