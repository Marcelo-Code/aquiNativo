import { useEffect, useRef, useState } from "react";
import "../../../../assets/css/generalStyles.css";
import { useNavigate, useParams } from "react-router-dom";
import { CreateEditProduct } from "./CreateEditProduct";
import { getBrands } from "../../../../services/api/brands";
import { getCategories } from "../../../../services/api/categories";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { ErrorContainer } from "../../error/ErrorContainer";
import {
  createProduct,
  getProduct,
  updateProduct,
} from "../../../../services/api/products";
import {
  errorToastifyAlert,
  successToastifyAlert,
} from "../../../../utils/alerts";
import { deleteImage, uploadImage } from "../../../../services/api/images";
import { useConfirm } from "../../../../context/ConfirmContext";

export const CreateEditProductContainer = () => {
  const [formData, setFormData] = useState({});
  const [modifiedFlag, setModifiedFlag] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
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

  //Flag para saber si se creo el producto
  const [createdProduct, setCreatedProduct] = useState(false);

  //hook para guardar el nombre de la imagen
  const [documentName, setDocumentName] = useState(null);

  //hook para el selector de archivos
  const fileInputRef = useRef(null);

  //Obtiene el id del producto para su edición
  const { productId } = useParams();

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const confirm = useConfirm();

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = { ...formData, [name]: value };

    console.log(updatedFormData);

    setFormData(updatedFormData);
    if (!modifiedFlag) setModifiedFlag(true);
  };

  const handleUploadImage = (documentName) => {
    if (formData[documentName]) {
      errorToastifyAlert(
        "Ya existe una imagen, eliminá antes de cargar una nueva"
      );
      return;
    }
    setDocumentName(documentName);
    fileInputRef.current.click();
  };

  const handleDeleteImage = async (documentName) => {
    if (!formData[documentName]) {
      errorToastifyAlert("No existe imagen para eliminar");
      return;
    }

    const isConfirmed = await confirm(`¿Querés eliminar la imagen?`);

    if (!isConfirmed) return;

    setIsLoadingImage(true);
    // Llama a la función para eliminar el archivo
    deleteImage(documentName, formData)
      .then((response) => {
        console.log(response);
        return getProduct(formData.id);
      })
      .then((response) => {
        setFormData(response.data[0]);
        console.log("Producto actualizado:", response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoadingImage(false));
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

      // Llama a la función para subir el archivo
      setIsLoadingImage(true);
      uploadImage(file, documentName, formData)
        .then(() => getProduct(formData.id))
        .then(({ data }) => {
          setFormData(data[0]);
          console.log("Producto actualizado:", data);
        })
        .catch(console.error)
        .finally(() => setIsLoadingImage(false));
    }
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingButton(true);
    setCreatedProduct(false);

    const request = productId ? updateProduct : createProduct;

    console.log(formData);

    try {
      const response = await request(formData);

      if (response.status !== 200 && response.status !== 201) {
        const errorMessage =
          typeof response.error === "string"
            ? response.error
            : JSON.stringify(response.error);
        throw new Error(`${response.message}: ${errorMessage}`);
      }

      const action = productId ? "actualizado" : "creado";
      successToastifyAlert(`Producto ${action} con éxito`);

      console.log(response);

      if (!productId) {
        // setFormData(response.data);
        setCreatedProduct(true);
      } else {
        // const refreshed = await getProduct(productId);
        // setFormData(refreshed.data);
      }

      setModifiedFlag(false);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoadingButton(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getBrands(),
      getCategories(),
      productId ? getProduct(productId) : Promise.resolve({ data: [null] }),
    ])
      .then(([brandsResponse, categoriesResponse, productResponse]) => {
        //Validaciones de marcas
        if (brandsResponse.status !== 200) {
          const errorMessage =
            typeof brandsResponse.error === "string"
              ? brandsResponse.error
              : JSON.stringify(brandsResponse.error);
          throw new Error(`Error al obtener marcas: ${errorMessage}`);
        }

        console.log(productResponse.status);

        //Validaciones de categorias
        if (categoriesResponse.status !== 200) {
          const errorMessage =
            typeof categoriesResponse.error === "string"
              ? categoriesResponse.error
              : JSON.stringify(categoriesResponse.error);
          throw new Error(`Error al obtener categorías: ${errorMessage}`);
        }

        // Validaciones de producto (si aplica)
        if (productId && productResponse.status !== 200) {
          const errorMessage =
            typeof productResponse.error === "string"
              ? productResponse.error
              : JSON.stringify(productResponse.error);
          throw new Error(`Error al obtener producto: ${errorMessage}`);
        }

        setBrands(brandsResponse.data);
        setCategories(categoriesResponse.data);

        if (productId) {
          setFormData(productResponse.data[0]);
        } else {
          setFormData(formDataInitialState);
        }

        console.log(brandsResponse);
        console.log(categoriesResponse);
        console.log(productResponse);
      })
      .catch((error) => {
        console.error("Error en la carga de datos:", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

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
    createdProduct,
    handleUploadImage,
    handleFileChange,
    fileInputRef,
    handleDeleteImage,
    isLoadingImage,
    productId,
  };

  return <CreateEditProduct {...createEditProductProps} />;
};
