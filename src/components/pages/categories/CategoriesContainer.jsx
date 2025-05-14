import { useEffect, useState } from "react";
import { Categories } from "./Categories";
import { getCategories } from "../../../services/api/categories";
import { getBrands } from "../../../services/api/brands";
import { handleError } from "../../../utils/helpers";
import { LoadingContainer } from "../loading/LoadingContainer";
import { Icons } from "../../../assets/Icons";

export const CategoriesContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

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

    to: "/categories/createCategory",
  };

  const categoriesProps = {
    categories,
    ...generalBarContainerProps,
  };

  return <Categories {...categoriesProps} />;
};
