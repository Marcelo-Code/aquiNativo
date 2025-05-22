import { Box } from "@mui/material";
import "../../../../assets/css/generalStyles.css";
import { generalBackGroundColor } from "../../../../utils/helpers";
import { currencyFormat } from "../../../common/currencyFormat/CurrencyFormatContainer";
import { BackButtonContainer } from "../../../common/backButton/BackButtonContainer";
export const PurchaseOrdersItemsList = (purchaseOrdersItemsListProps) => {
  const { items, order } = purchaseOrdersItemsListProps;

  console.log(items);
  console.log(order);

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Detalles order de compra {order.id}</Box>
      <Box
        sx={{
          margin: "10px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <b>Comprador: </b> {order.buyer_name} {order.buyer_last_name}
        <b>Dirección: </b> {order.buyer_address}
        <b>Telefono: </b> {order.buyer_phone}
        <b>Email: </b> {order.buyer_email}
      </Box>
      <Box
        sx={{
          margin: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          style={{
            overflowX: "auto",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <table
            style={{
              borderCollapse: "collapse",
              border: `1px solid ${generalBackGroundColor}`,
              width: "100%",
              maxWidth: "710px",
            }}
          >
            <thead style={{ backgroundColor: generalBackGroundColor }}>
              <tr>
                <th style={{ padding: "5px" }}>Producto</th>
                <th style={{ padding: "5px" }}>Cantidad</th>
                <th style={{ padding: "5px" }}>Precio</th>
                <th style={{ padding: "5px" }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td style={{ paddingLeft: "15px", minWidth: "120px" }}>
                    {item.products.description}
                  </td>
                  <td style={{ textAlign: "center", padding: "5px" }}>
                    {item.quantity}
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      padding: "5px",
                      minWidth: "115px",
                    }}
                  >
                    {currencyFormat(item.price)}
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      padding: "5px",
                      minWidth: "115px",
                    }}
                  >
                    {" "}
                    {currencyFormat(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot style={{ border: `1px solid ${generalBackGroundColor}` }}>
              <tr>
                <td style={{ textAlign: "center", padding: "5px" }} colSpan={3}>
                  <b>Total: </b>
                </td>
                <td style={{ textAlign: "right", padding: "5px" }}>
                  {currencyFormat(order.total_price)}
                </td>
              </tr>
            </tfoot>
          </table>
        </Box>
        <BackButtonContainer />
      </Box>
    </Box>
  );
};
