import { useContext, useEffect, useMemo, useState } from "react";
import { Icons } from "../../../../assets/Icons";
import { ProductsList } from "./ProductsList";
import { GeneralContext } from "../../../../context/GeneralContext";
import { getProducts } from "../../../../services/api/products";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { getUniqueSortedOptions } from "../../../../utils/helpers";
import { ErrorContainer } from "../../error/ErrorContainer";

export const ProductsListContainer = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Obtiene funciones del contexto GeneralContext
  const { addProduct, removeProduct, addProductToCart } =
    useContext(GeneralContext);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([getProducts()])
      .then(([productsResponse]) => {
        //Captura erores en caso de que existan
        if (productsResponse.status !== 200) {
          const errorMessage =
            typeof productsResponse.error === "string"
              ? productsResponse.error
              : JSON.stringify(productsResponse.error);
          throw new Error(`${productsResponse.message}: ${errorMessage}`);
        }
        //Agrega el contador de cada producto
        const productsResponseData = productsResponse.data;
        const counteredProducts = productsResponseData.map((product) => ({
          ...product,
          counter: 1,
        }));

        setProducts(counteredProducts);
        setFilteredProducts(counteredProducts);
        console.log(productsResponse);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  //Array de opciones de filtros por marca
  const STATUS_OPTIONS_1 = useMemo(
    () =>
      getUniqueSortedOptions(products, "brands.name", {
        value: "all",
        label: "Todas las marcas",
      }),

    [products]
  );

  //Array de opciones de filtros por categoria
  const STATUS_OPTIONS_2 = useMemo(
    () =>
      getUniqueSortedOptions(products, "categories.name", {
        value: "all",
        label: "Todas las categorías",
      }),
    [products]
  );

  if (isLoading) return <LoadingContainer />;
  if (error) {
    const errorContainerProps = {
      error: error.message,
    };
    console.log(errorContainerProps);
    return <ErrorContainer {...errorContainerProps} />;
  }

  //Array de opciones de ordenamiento
  const SORT_OPTIONS = [
    { value: "none", label: "Sin ordenar", name: "" },
    {
      value: "alphabetical-asc-description",
      label: "Descripción (A-Z)",
      name: "description",
    },
    {
      value: "alphabetical-desc-description",
      label: "Descripción (Z-A)",
      name: "description",
    },
    {
      value: "alphabetical-asc-category",
      label: "Categoría (A-Z)",
      name: "categories.name",
    },
    {
      value: "alphabetical-desc-category",
      label: "Categoría (Z-A)",
      name: "categories.name",
    },
    {
      value: "alphabetical-asc-brand",
      label: "Marca (A-Z)",
      name: "brands.name",
    },
    {
      value: "alphabetical-desc-brand",
      label: "Marca (Z-A)",
      name: "brands.name",
    },
  ];

  const FILTER_OPTIONS = [STATUS_OPTIONS_1, STATUS_OPTIONS_2];

  //Array de campos a buscar
  const FIELDS_TO_SEARCH = [
    (r) => r.description,
    (r) => r.categories.name,
    (r) => r.brands.name,
  ];

  const generalBarContainerProps = {
    enableSearchFilterBar: true,
    buttonText: "Producto",
    buttonIcon: <Icons.AddIcon />,
    setFilteredRecords: setFilteredProducts,
    records: products,
    SORT_OPTIONS,
    FILTER_OPTIONS,
    FIELDS_TO_SEARCH,
    enableEditionBar: false,
  };

  const productsListProps = {
    ...generalBarContainerProps,
    filteredProducts,
    setFilteredProducts,
    addProduct,
    removeProduct,
    addProductToCart,
  };

  return <ProductsList {...productsListProps} />;
};
