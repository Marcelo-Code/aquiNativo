import { Box, Card, CardContent, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../assets/css/generalStyles.css";
import "./specialOffers.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { generalBackGroundColor } from "../../../utils/helpers";

export const SpecialOffers = (specialOffersProps) => {
  const { offers } = specialOffersProps;

  const slidesToShow = Math.min(offers.length, 3);

  const settings = {
    dots: true,
    infinite: offers.length > slidesToShow,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: offers.length > slidesToShow,
    autoplaySpeed: 4000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: Math.min(offers.length, 3),
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: Math.min(offers.length, 2),
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Nuestras ofertas</Box>
      <Box sx={{ widthdisplay: "flex", justifyContent: "center" }}>
        <Slider {...settings} className="custom-slider">
          {offers.map((product, index) => (
            <Box key={index} sx={{ padding: "30px" }}>
              <Card
                sx={{
                  height: "400px",
                  width: "100%",
                  maxWidth: "400px",
                }}
              >
                <CardContent sx={{ pt: 0 }}>
                  {/* <Typography sx={{ textAlign: "center" }} variant="h6">
                    {product.description}
                  </Typography> */}
                  <Box
                    sx={{
                      width: "100%",
                      height: "40px",
                      fontSize: "20px",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="offerText"
                  >
                    {product.description}
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src={product.image}
                      alt={product.description}
                      style={{
                        width: "100%",
                        maxWidth: "250px",
                        height: "auto",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Box
                    className="offerText"
                    sx={{
                      width: "100%",
                      height: "110px",
                      fontSize: "25px",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {product.special_offer}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

const PrevArrow = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      width: "40px",
      height: "40px",
      borderRadius: "20px",
      py: 1,
      px: 1.5,
      position: "absolute",
      left: "10px",
      top: "50%",
      zIndex: 1100,
      transform: "translateY(-50%)",
      cursor: "pointer",
      backgroundColor: generalBackGroundColor,
      color: "white",
      boxShadow: 3,
    }}
  >
    <ArrowBackIosIcon />
  </Box>
);

const NextArrow = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      width: "40px",
      height: "40px",
      borderRadius: "20px",
      py: 1,
      px: 1.5,
      position: "absolute",
      right: "10px",
      top: "50%",
      zIndex: 1100,
      transform: "translateY(-50%)",
      cursor: "pointer",
      backgroundColor: generalBackGroundColor,
      color: "white",
      boxShadow: 3,
    }}
  >
    <ArrowForwardIosIcon />
  </Box>
);
