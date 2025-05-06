import { useEffect, useRef, useState } from "react";
import "../../../../assets/css/generalStyles.css";
import { useNavigate } from "react-router-dom";
import { CreateEditProduct } from "./CreateEditProduct";
import { getBrands } from "../../../../services/api/brands";
import { getCategories } from "../../../../services/api/categories";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { ErrorContainer } from "../../error/ErrorContainer";
import { createProduct, getProduct } from "../../../../services/api/products";
import {
  errorToastifyAlert,
  successToastifyAlert,
} from "../../../../utils/alerts";
import { uploadImage } from "../../../../services/api/images";

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

  //hook para obtener el id del producto creado
  const [productCreatedId, setProductCreatedId] = useState(null);
  const [productCreated, setProductCreated] = useState(false);
  const [documentName, setDocumentName] = useState(null);
  //hook para el selector de archivos
  const fileInputRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = { ...formData, [name]: value };

    setFormData(updatedFormData);
    if (!modifiedFlag) setModifiedFlag(true);
  };

  const handleUploadDocument = (documentName) => {
    if (formData[documentName]) {
      errorToastifyAlert(
        "Ya existen documentos, para cargar otros, primero elimine los anteriores"
      );
      return;
    }
    setDocumentName(documentName);
    fileInputRef.current.click();
  };

  // Función para manejar la carga de archivos
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Verifica el formato del archivo
      const allowedFileTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/msword", // .doc
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      ];
      if (!allowedFileTypes.includes(file.type)) {
        errorToastifyAlert("Formato de archivo no permitido");
        console.error("Formato no permitido");
        return;
      }
      console.log("Archivo seleccionado:", file);

      const halfFileName = `imagen`;

      // Llama a la función para subir el archivo
      uploadImage(file, documentName, productCreated, halfFileName)
        .then((response) => {
          console.log(response);
          return getProduct(productCreated.id);
        })
        .then((response) => {
          setFormData(response.data);
          console.log("Producto actualizado:", response.data);
        })
        .catch((error) => console.log(error));
    }
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
        setProductCreated(response.data);
        console.log(response.data.id);
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
    handleUploadDocument,
    handleFileChange,
    fileInputRef,
    productCreatedId,
  };

  return <CreateEditProduct {...createEditProductProps} />;
};
