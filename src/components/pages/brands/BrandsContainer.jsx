import { useEffect, useState } from "react";
import { getBrands } from "../../../services/api/brands";
import { handleError } from "../../../utils/helpers";
import { LoadingContainer } from "../loading/LoadingContainer";
import { Icons } from "../../../assets/Icons";
import { Brands } from "./Brands";

export const BrandsContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getBrands()])
      .then(([brandsResponse]) => {
        if (brandsResponse.status !== 200) {
          handleError(brandsResponse);
        }

        const brandsResponseData = brandsResponse.data;
        setBrands(brandsResponseData);
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
    buttonText: "Marca",
    buttonIcon: <Icons.AddIcon />,
    initialActiveBar: "editionBar",

    to: "/brands/createBrand",
  };

  const brandsProps = {
    brands,
    ...generalBarContainerProps,
  };

  return <Brands {...brandsProps} />;
};
