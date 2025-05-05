import { Box, FormGroup, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Icons } from "../../../../assets/Icons";
import "../../../../assets/css/generalStyles.css";
import { OptionSelect } from "../../../common/optionSelect/OptionSelect";
import { useNavigate } from "react-router-dom";
import { FormButtonGroupContainer } from "../../../common/formButtonGroup/FormButtonGroupContainer";
import { CreateEditProduct } from "./CreateEditProduct";
import { getBrands } from "../../../../services/api/brands";
import { getCategories } from "../../../../services/api/categories";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { ErrorContainer } from "../../error/ErrorContainer";

export const CreateEditProductContainer = () => {
  const [formData, setFormData] = useState({});
  const [modifiedFlag, setModifiedFlag] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    if (!modifiedFlag) setModifiedFlag(true);
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
        console.log(brandsResponse.data);
        console.log(categoriesResponse.data);
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
  };

  return <CreateEditProduct {...createEditProductProps} />;
};
