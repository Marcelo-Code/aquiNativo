import { useParams } from "react-router-dom";
import { ProductDetail } from "./ProductDetail";
import { getProduct } from "../../../../services/api/products";
import { useEffect, useState } from "react";
import { handleError } from "../../../../utils/helpers";
import { LoadingContainer } from "../../loading/LoadingContainer";

export const ProductDetailContainer = () => {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getProduct(productId)])
      .then(([productDetailResponse]) => {
        if (productDetailResponse.status !== 200) {
          handleError(productDetailResponse);
        }
        const productDetailResponseData = productDetailResponse.data[0];
        setProduct(productDetailResponseData);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  if (isLoading) return <LoadingContainer />;

  const productDetailProps = { product };

  return <ProductDetail {...productDetailProps} />;
};
