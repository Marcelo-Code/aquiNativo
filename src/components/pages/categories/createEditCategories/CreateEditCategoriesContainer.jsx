import { useContext, useEffect, useState } from "react";
import "../../../../assets/css/generalStyles.css";
import { useParams } from "react-router-dom";
import {
  createCategory,
  getCategory,
  updateCategory,
} from "../../../../services/api/categories";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { ErrorContainer } from "../../error/ErrorContainer";
import {
  errorToastifyAlert,
  successToastifyAlert,
} from "../../../../utils/alerts";
import { handleError } from "../../../../utils/helpers";
import { GeneralContext } from "../../../../context/GeneralContext";
import { CreateEditCategories } from "./CreateEditCategories";

export const CreateEditCategoriesContainer = () => {
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
  const { categoryId } = useParams();

  console.log(categoryId);

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

    const request = categoryId ? updateCategory : createCategory;

    console.log(formData);

    try {
      const response = await request(formData);

      if (response.status !== 200 && response.status !== 201)
        handleError(response);

      const action = categoryId ? "actualizada" : "creada";
      successToastifyAlert(`Categoría ${action} con éxito`);

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
    console.log("Cargando datos...");
    Promise.all([
      categoryId ? getCategory(categoryId) : Promise.resolve({ data: [null] }),
    ])
      .then(([categoryResponse]) => {
        //Validaciones de marcas
        if (categoryResponse.status !== 200 && categoryId) {
          handleError(categoryResponse);
        }
        if (categoryId) {
          setFormData(categoryResponse.data[0]);
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
  }, [categoryId]);

  if (isLoading) return <LoadingContainer />;
  if (error) {
    const errorContainerProps = {
      error: error.message,
    };
    console.log(errorContainerProps);
    return <ErrorContainer {...errorContainerProps} />;
  }

  console.log(formData);
  console.log(categoryId);

  const createEditProps = {
    handleGoBack,
    modifiedFlag,
    isLoadingButton,
    formData,
    handleChange,
    handleSubmit,
    categoryId,
  };
  return <CreateEditCategories {...createEditProps} />;
};
