import { FooterContainer } from "./components/layouts/footer/FooterContainer";
import { NavBarContainer } from "./components/layouts/navBar/NavBarContainer";
import { CartListContainer } from "./components/pages/cart/cartList/CartListContainer";
import { ProductsListContainer } from "./components/pages/products/productsList/ProductsListContainer";
import { GeneralContextProvider } from "./context/GeneralContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <GeneralContextProvider>
          <NavBarContainer />
          <Routes>
            <Route path="/" element={<ProductsListContainer />} />
            <Route path="/cart" element={<CartListContainer />} />
          </Routes>
          <FooterContainer />
        </GeneralContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
