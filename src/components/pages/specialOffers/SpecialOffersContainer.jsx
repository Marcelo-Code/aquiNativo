import { useEffect, useState } from "react";
import { SpecialOffers } from "./SpecialOffers";
import { handleError } from "../../../utils/helpers";
import { getProducts } from "../../../services/api/products";
import { LoadingContainer } from "../loading/LoadingContainer";

export const SpecialOffersContainer = () => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getProducts()])
      .then(([offersResponse]) => {
        if (offersResponse.status !== 200) {
          handleError(offersResponse);
        }

        const offersResponseData = offersResponse.data.filter(
          (product) =>
            product.special_offer !== null && product.special_offer !== ""
        );

        setOffers(offersResponseData);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <LoadingContainer />;

  console.log(offers);

  const specialOffersProps = {
    offers,
  };

  return <SpecialOffers {...specialOffersProps} />;
};
