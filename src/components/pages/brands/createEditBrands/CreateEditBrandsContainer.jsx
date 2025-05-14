import { useContext, useEffect, useState } from "react";
import "../../../../assets/css/generalStyles.css";
import { useParams } from "react-router-dom";

import { LoadingContainer } from "../../loading/LoadingContainer";
import { ErrorContainer } from "../../error/ErrorContainer";
import {
  errorToastifyAlert,
  successToastifyAlert,
} from "../../../../utils/alerts";
import { handleError } from "../../../../utils/helpers";
import { GeneralContext } from "../../../../context/GeneralContext";
import { CreateEditBrand } from "./CreateEditBrands";
import {
  createBrand,
  getBrand,
  updateBrand,
} from "../../../../services/api/brands";

export const CreateEditBrandsContainer = () => {
  const [formData, setFormData] = useState({});
  const [modifiedFlag, setModifiedFlag] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const formDataInitialState = {
    name: "",
  };

  const { handleGoBack } = useContext(GeneralContext);

  //Obtiene el id del producto para su edición
  const { brandId } = useParams();

  const handleChange = (event) => {
    const { name, value } = event.target;

    const updatedFormData = { ...formData, [name]: value };

    console.log(updatedFormData);

    setFormData(updatedFormData);
    if (!modifiedFlag) setModifiedFlag(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingButton(true);

    const request = brandId ? updateBrand : createBrand;

    console.log(formData);

    try {
      const response = await request(formData);

      if (response.status !== 200 && response.status !== 201)
        handleError(response);

      const action = brandId ? "actualizada" : "creada";
      successToastifyAlert(`Marca ${action} con éxito`);

      handleGoBack();

      setModifiedFlag(false);
    } catch (error) {
      errorToastifyAlert(error.message);
      setError(error);
    } finally {
      setIsLoadingButton(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      brandId ? getBrand(brandId) : Promise.resolve({ data: [null] }),
    ])
      .then(([brandResponse]) => {
        //Validaciones de marcas
        if (brandResponse.status !== 200 && brandId) {
          handleError(brandResponse);
        }
        if (brandId) {
          setFormData(brandResponse.data[0]);
        } else {
          setFormData(formDataInitialState);
        }
      })
      .catch((error) => {
        console.error("Error en la carga de datos:", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [brandId]);

  if (isLoading) return <LoadingContainer />;
  if (error) {
    const errorContainerProps = {
      error: error.message,
    };
    console.log(errorContainerProps);
    return <ErrorContainer {...errorContainerProps} />;
  }

  const createEditBrandProps = {
    handleGoBack,
    modifiedFlag,
    isLoadingButton,
    formData,
    handleChange,
    handleSubmit,
    brandId,
  };
  return <CreateEditBrand {...createEditBrandProps} />;
};
