import { FooterContainer } from "./components/layouts/footer/FooterContainer";
import { NavBarContainer } from "./components/layouts/navBar/NavBarContainer";
import { CartListContainer } from "./components/pages/cart/cartList/CartListContainer";
import { CreateEditProductContainer } from "./components/pages/products/createEditProduct/CreateEditProductContainer";
import { ProductsListContainer } from "./components/pages/products/productsList/ProductsListContainer";
import { ProductsListUpdateModeContainer } from "./components/pages/products/productsListUpdateMode/ProductsListUpdateModeContainer";
import { BuyersDataContainer } from "./components/pages/purchaseOrders/buyersData/BuyersDataContainer";
import { PurchaseOrdersItemsListContainer } from "./components/pages/purchaseOrders/purchaseOrdersItemsList/purchaseOrdersItemsListContainer";
import { PurchaseOrdersListContainer } from "./components/pages/purchaseOrders/purchaseOrdersList/PurchaseOrdersListContainer";
import { ConfirmProvider } from "./context/ConfirmContext";
import { GeneralContextProvider } from "./context/GeneralContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <GeneralContextProvider>
          <ConfirmProvider>
            <NavBarContainer />
            <Routes>
              <Route path="/" element={<ProductsListContainer />} />
              <Route
                path="/updateProducts"
                element={<ProductsListUpdateModeContainer />}
              />
              <Route path="/cart" element={<CartListContainer />} />
              <Route
                path="/updateProducts/createProduct"
                element={<CreateEditProductContainer />}
              />
              <Route
                path="/updateProducts/updateProduct/:productId"
                element={<CreateEditProductContainer />}
              />
              <Route path="/checkout" element={<BuyersDataContainer />} />
              <Route
                path="/purchaseOrders"
                element={<PurchaseOrdersListContainer />}
              />
              <Route
                path="/purchaseOrders/details/:purchaseOrderId"
                element={<PurchaseOrdersItemsListContainer />}
              />
              <Route path="*" element={<div>404</div>} />
            </Routes>
            <FooterContainer />
          </ConfirmProvider>
        </GeneralContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
