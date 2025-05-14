import { useEffect, useState } from "react";
import { CategoriesList } from "./CategoriesList";
import { getCategories } from "../../../../services/api/categories";
import { getBrands } from "../../../../services/api/brands";
import { handleError } from "../../../../utils/helpers";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { Icons } from "../../../../assets/Icons";
import { useNavigate } from "react-router-dom";

export const CategoriesListContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleUpdateCategory = (categoryId) => {
    navigate(`/updateCategories/updateCategory/${categoryId}`);
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getCategories(), getBrands()])
      .then(([categoriesResponse]) => {
        if (categoriesResponse.status !== 200) {
          handleError(categoriesResponse);
        }

        const categories = categoriesResponse.data;
        setCategories(categories);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingContainer />;
  if (error) {
    const errorContainerProps = {
      error: error.message,
    };
    console.log(errorContainerProps);
    return <ErrorContainer {...errorContainerProps} />;
  }

  const generalBarContainerProps = {
    enableSearchFilterBar: false,
    buttonText: "Categoría",
    buttonIcon: <Icons.AddIcon />,
    initialActiveBar: "editionBar",
    to: "/updateCategories/createCategory",
  };

  const categoriesProps = {
    categories,
    handleUpdateCategory,
    ...generalBarContainerProps,
  };

  return <CategoriesList {...categoriesProps} />;
};
