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
  const [filteredOrders, setFilteredOrders] = useState([]);
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

  //Array de campos a buscar
  const FIELDS_TO_SEARCH = [
    (r) => r.buyer_name,
    (r) => r.buyer_last_name,
    (r) => r.buyer_address,
    (r) => r.buyer_email,
    (r) => r.buyer_phone_number,
  ];

  const SORT_OPTIONS = [
    { value: "none", label: "Sin ordenar", name: "" },
    {
      value: "alphabetical-asc-buyer_name",
      label: "Nombre (A-Z)",
      name: "buyer_name",
    },
    {
      value: "alphabetical-desc-buyer_name",
      label: "Nombre (Z-A)",
      name: "buyer_name",
    },
    {
      value: "alphabetical-asc-buyer_last_name",
      label: "Apellido (A-Z)",
      name: "buyer_last_name",
    },
    {
      value: "alphabetical-desc-buyer_last_name",
      label: "Apellido (Z-A)",
      name: "buyer_last_name",
    },
    {
      value: "alphabetical-asc-buyer_address",
      label: "Dirección (A-Z)",
      name: "buyer_address",
    },
    {
      value: "alphabetical-desc-buyer_address",
      label: "Dirección (Z-A)",
      name: "buyer_address",
    },
    {
      value: "date-asc",
      label: "Fecha (ascendente)",
      name: "date",
    },
    {
      value: "date-desc",
      label: "Fecha (descendente)",
      name: "date",
    },
    {
      value: "number-asc",
      label: "Total (ascendente)",
      name: "total_price",
    },
    {
      value: "number-desc",
      label: "Total (descendente)",
      name: "total_price",
    },
  ];

  const generalBarContainerProps = {
    enableSearchFilterBar: true,
    // buttonText: "Producto",
    // buttonIcon: <Icons.AddIcon />,
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
  };

  return <PurchaseOrderList {...purchaseOrdersListProps} />;
};
