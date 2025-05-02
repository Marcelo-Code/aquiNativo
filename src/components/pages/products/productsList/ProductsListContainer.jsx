import { useContext, useEffect, useMemo, useState } from "react";
import { Icons } from "../../../../assets/Icons";
import { ProductsList } from "./ProductsList";
import { productosDietetica } from "../../../../data/data";
import "./productsList.css";
import { GeneralContext } from "../../../../context/GeneralContext";

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
    const counteredProducts = productosDietetica.map((product) => ({
      ...product,
      counter: 1,
    }));
    setProducts(counteredProducts);
    setFilteredProducts(counteredProducts);
    setIsLoading(false);
  }, []);

  //Array de opciones de filtros por marca
  const STATUS_OPTIONS_1 = useMemo(
    () => [
      { value: "all", label: "Todas las marcas" },
      ...Array.from(new Set(products.map((p) => p.brand)))
        .sort()
        .map((brand) => ({ value: brand, label: brand })),
    ],
    [products]
  );

  //Array de opciones de filtros por categoria
  const STATUS_OPTIONS_2 = useMemo(
    () => [
      { value: "all", label: "Todas las categorías" },
      ...Array.from(new Set(products.map((p) => p.category)))
        .sort()
        .map((category) => ({ value: category, label: category })),
    ],
    [products]
  );

  if (isLoading) return <h1>Loading...</h1>;

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
      name: "category",
    },
    {
      value: "alphabetical-desc-category",
      label: "Categoría (Z-A)",
      name: "category",
    },
    {
      value: "alphabetical-asc-brand",
      label: "Marca (A-Z)",
      name: "Marca",
    },
    {
      value: "alphabetical-desc-brand",
      label: "Marca (Z-A)",
      name: "Marca",
    },

    // {
    //   value: "date-desc",
    //   label: "Fecha reclamo (más recientes)",
    //   name: "fechareclamo",
    // },
    // {
    //   value: "date-asc",
    //   label: "Fecha reclamo (más antiguos)",
    //   name: "fechareclamo",
    // },
  ];

  const FILTER_OPTIONS = [STATUS_OPTIONS_1, STATUS_OPTIONS_2];

  //Array de campos a buscar
  const FIELDS_TO_SEARCH = [
    (r) => r.description,
    (r) => r.category,
    (r) => r.brand,
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
  };

  const productsListProps = {
    ...generalBarContainerProps,
    products: filteredProducts,
    setProducts: setFilteredProducts,
    addProduct,
    removeProduct,
    addProductToCart,
  };
  return <ProductsList {...productsListProps} />;
};
