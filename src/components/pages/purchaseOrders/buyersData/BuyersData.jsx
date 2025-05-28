import {
  Box,
  Button,
  FormGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import "../../../../assets/css/generalStyles.css";
import { buttonColor, generalBackGroundColor } from "../../../../utils/helpers";
import { FormButtonGroupContainer } from "../../../common/formButtonGroup/FormButtonGroupContainer";
import { currencyFormat } from "../../../common/currencyFormat/CurrencyFormatContainer";
import { Icons } from "../../../../assets/Icons";
import { Link } from "react-router-dom";

export const BuyersData = (buyerDataProps) => {
  const {
    formData,
    handleChange,
    handleSubmit,
    handleGoBack,
    createdPurchaseOrder,
    handleNavigate,
    whatsappUrl,
  } = buyerDataProps;

  const buttonGroupContainerProps = {
    handleSubmit,
    handleGoBack,
  };

  const inputStyles = {
    "& label": {
      top: "-5px",
      color: "gray",
    },
    "& label.Mui-focused": {
      color: buttonColor,
    },
    "& .MuiOutlinedInput-root": {
      height: 43,
      alignItems: "center",
      "& fieldset": {
        borderColor: "gray",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: generalBackGroundColor,
      },
    },
  };

  return (
    <Box className="generalContainer">
      {Object.keys(createdPurchaseOrder).length === 0 && (
        <>
          <Box className="generalTitle">Datos del comprador</Box>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "800px",
                  mx: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 2,
                  mt: 3,
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    flex: { xs: "1 1 100%", sm: "1 1 45%" },
                    minWidth: "250px",
                    maxWidth: "350px",
                  }}
                >
                  <TextField
                    label="Nombre"
                    variant="outlined"
                    name="buyer_name"
                    onChange={handleChange}
                    required
                    value={formData.buyer_name}
                    fullWidth
                    sx={inputStyles}
                  />
                </Box>

                <Box
                  sx={{
                    flex: { xs: "1 1 100%", sm: "1 1 45%" },
                    minWidth: "250px",
                    maxWidth: "350px",
                  }}
                >
                  <TextField
                    label="Apellido"
                    variant="outlined"
                    name="buyer_last_name"
                    onChange={handleChange}
                    required
                    value={formData.buyer_last_name}
                    fullWidth
                    sx={inputStyles}
                  />
                </Box>

                <Box
                  sx={{
                    flex: { xs: "1 1 100%", sm: "1 1 45%" },
                    minWidth: "250px",
                    maxWidth: "350px",
                  }}
                >
                  <TextField
                    label="Dirección"
                    variant="outlined"
                    name="buyer_address"
                    onChange={handleChange}
                    required
                    value={formData.buyer_address}
                    fullWidth
                    sx={inputStyles}
                  />
                </Box>

                <Box
                  sx={{
                    flex: { xs: "1 1 100%", sm: "1 1 45%" },
                    minWidth: "250px",
                    maxWidth: "350px",
                  }}
                >
                  <TextField
                    label="Teléfono"
                    variant="outlined"
                    name="buyer_phone_number"
                    onChange={handleChange}
                    required
                    value={formData.buyer_phone_number}
                    fullWidth
                    sx={inputStyles}
                  />
                </Box>
                <Box
                  sx={{
                    flex: { xs: "1 1 100%", sm: "1 1 45%" },
                    minWidth: "250px",
                    maxWidth: "350px",
                  }}
                >
                  <TextField
                    type="email"
                    label="email"
                    variant="outlined"
                    name="buyer_email"
                    onChange={handleChange}
                    required
                    value={formData.buyer_email}
                    fullWidth
                    sx={inputStyles}
                  />
                </Box>
                <FormButtonGroupContainer {...buttonGroupContainerProps} />
              </Box>
            </FormGroup>
          </form>
        </>
      )}
      {Object.keys(createdPurchaseOrder).length !== 0 && (
        <>
          <Box className="generalTitle">¡Gracias por tu compra!</Box>
          <Typography sx={{ textAlign: "center", padding: 2 }}>
            Orden de compra nro: {createdPurchaseOrder.order_id}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
              mb: 2,
              flexWrap: "wrap",
            }}
          >
            <Typography>
              <b>Comprador: </b> {createdPurchaseOrder.buyer.buyer_name}{" "}
              {createdPurchaseOrder.buyer.buyer_last_name}
            </Typography>
            <Typography>
              <b>Teléfono: </b> {createdPurchaseOrder.buyer.buyer_phone_number}
            </Typography>
            <Typography>
              <b>Dirección: </b> {createdPurchaseOrder.buyer.buyer_address}
            </Typography>
            <Typography>
              <b>Email: </b> {createdPurchaseOrder.buyer.buyer_email}
            </Typography>
          </Box>

          <Box
            sx={{
              overflowX: "auto",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TableContainer sx={{ width: "auto" }} component={Paper}>
              <Table sx={{ width: "auto" }} aria-label="simple table">
                <TableHead>
                  <TableRow
                    style={{
                      backgroundColor: generalBackGroundColor,
                    }}
                  >
                    <TableCell
                      align="center"
                      style={{ minWidth: "200px", whiteSpace: "nowrap" }}
                    >
                      Producto
                    </TableCell>
                    <TableCell align="center" style={{ whiteSpace: "nowrap" }}>
                      Cantidad
                    </TableCell>
                    <TableCell align="center" style={{ whiteSpace: "nowrap" }}>
                      Precio
                    </TableCell>
                    <TableCell align="center" style={{ whiteSpace: "nowrap" }}>
                      Subtotal
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {createdPurchaseOrder.cart.map((item) => (
                    <TableRow
                      key={item.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {item.description}
                      </TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                        {currencyFormat(item.price)}
                      </TableCell>
                      <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                        {currencyFormat(item.price * item.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      align="right"
                      style={{ fontWeight: "bold" }}
                    >
                      Total
                    </TableCell>
                    <TableCell align="right" style={{ fontWeight: "bold" }}>
                      {currencyFormat(createdPurchaseOrder.totalPrice)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: 4,
              flexWrap: "wrap",
              gap: 3,
            }}
          >
            <Button
              sx={{
                width: "100%",
                maxWidth: "340px",
                border: "1px solid black",
                color: "white",
                backgroundColor: buttonColor,
                "&:active": {
                  backgroundColor: generalBackGroundColor,
                  color: "white",
                  border: `1px solid white`,
                },
              }}
              component="a"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              size="small"
              startIcon={<Icons.WhatsAppIcon />}
            >
              Enviar por Whatsapp
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
