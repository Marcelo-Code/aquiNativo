import { FooterContainer } from "./components/layouts/footer/FooterContainer";
import { NavBarContainer } from "./components/layouts/navBar/NavBarContainer";
import { CartListContainer } from "./components/pages/cart/cartList/CartListContainer";
import { CreateEditProductContainer } from "./components/pages/products/createEditProduct/CreateEditProductContainer";
import { ProductsListContainer } from "./components/pages/products/productsList/ProductsListContainer";
import { ProductsListUpdateModeContainer } from "./components/pages/products/productsListUpdateMode/ProductsListUpdateModeContainer";
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
            </Routes>
            <FooterContainer />
          </ConfirmProvider>
        </GeneralContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
