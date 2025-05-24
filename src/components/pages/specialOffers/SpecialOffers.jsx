import { Box, Card, CardContent, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../assets/css/generalStyles.css";
import "./specialOffers.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { generalBackGroundColor } from "../../../utils/helpers";
import { CurrencyFormat } from "../../common/currencyFormat/CurrencyFormat";
import { currencyFormat } from "../../common/currencyFormat/CurrencyFormatContainer";

export const SpecialOffers = (specialOffersProps) => {
  const { offers, handleProductDetail } = specialOffersProps;

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
        breakpoint: 1100,
        settings: {
          slidesToShow: Math.min(offers.length, 2),
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  if (offers.length === 0) {
    return (
      <Box className="generalContainer">
        <Box className="generalSubTitle">
          Sin ofertas por el momento... visitá nuestros productos
        </Box>
      </Box>
    );
  }

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Nuestras ofertas</Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: "1500px",
          margin: "0 auto",
        }}
      >
        <Slider {...settings} className="custom-slider">
          {offers.map((product, index) => (
            <Box
              key={index}
              pl={6}
              display="flex"
              justifyContent="center"
              mt={5}
              mb={3}
            >
              <Card
                key={index}
                onClick={() => handleProductDetail(product.id)}
                sx={{
                  cursor: "pointer",
                  boxShadow: 10,
                  height: "400px",
                  maxWidth: "350px",
                  borderRadius: "30px 30px 47px 47px",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                {/* <CardContent> */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      minHeight: "60px",
                      fontSize: "15px",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: generalBackGroundColor,
                      borderRadius: "45px",
                      color: "white",
                      boxShadow: 5,
                      zIndex: 2,
                      textShadow: "0px 0px 5px black",
                      padding: "10px",
                    }}
                  >
                    {product.description}
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <img
                        src={product.image}
                        alt="producto"
                        style={{
                          width: "100%",
                          maxWidth: "200px",
                          maxHeight: "200px",
                          objectFit: "contain",
                          display: "block",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: "140px",
                        fontSize: "20px",
                        fontWeight: "bold",
                        backgroundColor: "black",
                        padding: "5px",
                        borderRadius: "25px 0 0 25px",
                        color: "white",
                        textAlign: "center",
                        marginLeft: "10px",
                      }}
                    >
                      {currencyFormat(product.price)}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      marginTop: "20px",
                      width: "100%",
                      height: "90px",
                      fontSize: "20px",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: generalBackGroundColor,
                      borderRadius: "45px",
                      color: "white",
                      fontWeight: "bold",
                      textShadow: "0px 0px 5px black",
                      boxShadow: 5,
                      fontFamily: "arial",
                    }}
                  >
                    {product.special_offer.toUpperCase()}
                  </Box>
                </Box>
                {/* </CardContent> */}
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
