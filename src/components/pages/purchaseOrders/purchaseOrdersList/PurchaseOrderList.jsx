import { Box, Button, Card } from "@mui/material";
import "../../../../assets/css/generalStyles.css";
import "./purchaseOrderList.css";
import { GeneralBarContainer } from "../../../layouts/generalBar/GeneralBarContainer";
import { Icons } from "../../../../assets/Icons";
import { currencyFormat } from "../../../common/currencyFormat/CurrencyFormatContainer";
import { dateFormat, generalBackGroundColor } from "../../../../utils/helpers";
import { Link } from "react-router-dom";

export const PurchaseOrderList = (purchaseOrdersListProps) => {
  const { filteredOrders, ...generalBarContainerProps } =
    purchaseOrdersListProps;

  const iconStyle = { fontSize: "25px", verticalAlign: "middle" };

  console.log(filteredOrders);

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Lista de ordenes de compra</Box>
      <GeneralBarContainer {...generalBarContainerProps} />
      <Box className="generalSubTitle">
        {filteredOrders.length} registros encontrados
      </Box>
      <Box className="generalList">
        {filteredOrders.map((order) => (
          <Card sx={{ minWidth: 275, height: 300 }} key={order.id}>
            <Box
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                justifyContent: "center",
              }}
            >
              <Box className="itemStyle">
                <Icons.ShoppingCartIcon sx={iconStyle} />
                <b>Número: </b> {order.id}
              </Box>
              <Box className="itemStyle">
                <Icons.PersonIcon sx={iconStyle} />
                <b>Comprador: </b> {order.buyer_name} {order.buyer_last_name}
              </Box>
              <Box className="itemStyle">
                <Icons.WhatsAppIcon sx={iconStyle} />
                <b>Teléfono: </b>
                <a
                  href={`https://wa.me/${order.buyer_phone_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {order.buyer_phone_number}
                </a>
              </Box>
              <Box className="itemStyle">
                <Icons.AlternateEmailIcon sx={iconStyle} />
                <b>Email: </b>
                <a href={`mailto:${order.buyer_email}`}>{order.buyer_email}</a>
              </Box>
              <Box className="itemStyle">
                <Icons.CalendarMonthIcon sx={iconStyle} />
                <b>Fecha: </b> {dateFormat(order.date)}
              </Box>
              <Box className="itemStyle">
                <Icons.MonetizationOnIcon sx={iconStyle} />
                <b>Total: </b>{" "}
                <Box sx={{ marginBottom: "5px" }}>
                  {currencyFormat(order.total_price)}
                </Box>
              </Box>
              <Button
                variant="outlined"
                size="small"
                // onClick={() => handleGetOrderDetails(order.id)}
                component={Link}
                to={`/purchaseOrders/details/${order.id}`}
                sx={{
                  border: "1px solid black",
                  marginTop: "30px",
                  width: "100%",
                  color: "black",
                  backgroundColor: "white",

                  "&:active": {
                    backgroundColor: generalBackGroundColor,
                    color: "white",
                    border: `1px solid white`,
                  },
                }}
              >
                Ver detalles
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
