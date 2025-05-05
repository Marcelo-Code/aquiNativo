import { useEffect, useState } from "react";
import "../../../../assets/css/generalStyles.css";
import { useNavigate } from "react-router-dom";
import { CreateEditProduct } from "./CreateEditProduct";
import { getBrands } from "../../../../services/api/brands";
import { getCategories } from "../../../../services/api/categories";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { ErrorContainer } from "../../error/ErrorContainer";
import { createProduct } from "../../../../services/api/products";
import { successToastifyAlert } from "../../../../utils/alerts";

export const CreateEditProductContainer = () => {
  const [formData, setFormData] = useState({});
  const [modifiedFlag, setModifiedFlag] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const formDataInitialState = {
    description: "",
    brand_id: "",
    category_id: "",
    price: "",
    stock: "",
  };
  const [productCreated, setProductCreated] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = { ...formData, [name]: value };

    setFormData(updatedFormData);
    if (!modifiedFlag) setModifiedFlag(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoadingButton(true);
    createProduct(formData)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          const errorMessage =
            typeof response.error === "string"
              ? response.error
              : JSON.stringify(response.error);
          throw new Error(`${response.message}: ${errorMessage}`);
        }
        successToastifyAlert("Producto creado con éxito");
        console.log(response);
        setProductCreated(true);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        setIsLoadingButton(false);
      });
  };

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getBrands(), getCategories()])
      .then(([brandsResponse, categoriesResponse]) => {
        if (brandsResponse.status !== 200) {
          const errorMessage =
            typeof brandsResponse.error === "string"
              ? brandsResponse.error
              : JSON.stringify(brandsResponse.error);
          throw new Error(`Error al obtener marcas: ${errorMessage}`);
        }
        if (categoriesResponse.status !== 200) {
          const errorMessage =
            typeof categoriesResponse.error === "string"
              ? categoriesResponse.error
              : JSON.stringify(categoriesResponse.error);
          throw new Error(`Error al obtener categorías: ${errorMessage}`);
        }
        setBrands(brandsResponse.data);
        setCategories(categoriesResponse.data);
        setFormData(formDataInitialState);
        console.log(brandsResponse);
        console.log(categoriesResponse);
      })
      .catch((error) => {
        console.error("Error en la carga de datos:", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <LoadingContainer />;
  if (error) {
    const errorContainerProps = {
      error: error.message,
    };
    console.log(errorContainerProps);
    return <ErrorContainer {...errorContainerProps} />;
  }

  const createEditProductProps = {
    handleGoBack,
    modifiedFlag,
    isLoadingButton,
    brands,
    categories,
    handleChange,
    formData,
    handleSubmit,
    productCreated,
  };

  return <CreateEditProduct {...createEditProductProps} />;
};
