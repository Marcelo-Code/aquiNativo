import { ScrollToTop } from "./components/common/scrollToTop/ScrollToTop";
import { FooterContainer } from "./components/layouts/footer/FooterContainer";
import { NavBarContainer } from "./components/layouts/navBar/NavBarContainer";
import { AboutUsContainer } from "./components/pages/aboutUs/AboutUsContainer";
import { CartListContainer } from "./components/pages/cart/cartList/CartListContainer";
import { LoginContainer } from "./components/pages/login/LoginContainer";
import { CreateEditProductContainer } from "./components/pages/products/createEditProduct/CreateEditProductContainer";
import { ProductsListContainer } from "./components/pages/products/productsList/ProductsListContainer";
import { ProductsListUpdateModeContainer } from "./components/pages/products/productsListUpdateMode/ProductsListUpdateModeContainer";
import { BuyersDataContainer } from "./components/pages/purchaseOrders/buyersData/BuyersDataContainer";
import { PurchaseOrdersItemsListContainer } from "./components/pages/purchaseOrders/purchaseOrdersItemsList/PurchaseOrdersItemsListContainer_";
import { PurchaseOrdersListContainer } from "./components/pages/purchaseOrders/purchaseOrdersList/PurchaseOrdersListContainer";
import { ConfirmProvider } from "./context/ConfirmContext";
import { GeneralContextProvider } from "./context/GeneralContext";
import { Route, Routes } from "react-router-dom";
import { ProtectedUserRoute } from "./routes/ProtectedUserRoute";
import { ContactUsContainer } from "./components/pages/contactUs/ContactUsContainer";
import { RecoverPasswordContainer } from "./components/pages/recoverPassword/RecoverPasswordContainer";
import { UpdatePasswordContainer } from "./components/pages/updatePassword/UpdatePasswordContainer";
import { SettingsContainer } from "./components/pages/settings/SettingsContainer";
import { CategoriesListContainer } from "./components/pages/categories/categoriesList/CategoriesListContainer";
import { CreateEditCategoriesContainer } from "./components/pages/categories/createEditCategories/CreateEditCategoriesContainer";
import { BrandsListContainer } from "./components/pages/brands/brandsList/BrandsListContainer";
import { CreateEditBrandsContainer } from "./components/pages/brands/createEditBrands/CreateEditBrandsContainer";

function App() {
  return (
    <>
      <GeneralContextProvider>
        <ConfirmProvider>
          <NavBarContainer />
          <ScrollToTop />
          <Routes>
            {/* Lista de productos */}
            <Route path="/" element={<ProductsListContainer />} />
            {/* Carrito de compras */}
            <Route path="/cart" element={<CartListContainer />} />
            {/* Nosotros */}
            <Route path="/aboutUs" element={<AboutUsContainer />} />"
            {/* Login */}
            <Route path="/contactUs" element={<ContactUsContainer />} />"
            {/* Login */}
            <Route path="/login" element={<LoginContainer />} />
            {/* Recuperar contraseña */}
            <Route
              path="/recoverPassword"
              element={<RecoverPasswordContainer />}
            />
            {/* Actualizar contraseña */}
            <Route
              path="/updatePassword"
              element={<UpdatePasswordContainer />}
            />
            {/* 404 */}
            <Route path="*" element={<div>404</div>} />
            {/* Rutas protegidas para el admin */}
            {/* Lista de categorías */}
            <Route
              path="/categories"
              element={
                <ProtectedUserRoute>
                  <CategoriesListContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Editar categoría */}
            <Route
              path="/updateCategories/updateCategory/:categoryId"
              element={
                <ProtectedUserRoute>
                  <CreateEditCategoriesContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Crear categoría */}
            <Route
              path="/updateCategories/createCategory"
              element={
                <ProtectedUserRoute>
                  <CreateEditCategoriesContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Lista de marcas */}
            <Route
              path="/brands"
              element={
                <ProtectedUserRoute>
                  <BrandsListContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Editar marca */}
            <Route
              path="/updateBrands/updateBrand/:brandId"
              element={
                <ProtectedUserRoute>
                  <CreateEditBrandsContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Crear marca */}
            <Route
              path="/updateBrands/createBrand"
              element={
                <ProtectedUserRoute>
                  <CreateEditBrandsContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Settings */}
            <Route
              path="/settings"
              element={
                <ProtectedUserRoute>
                  <SettingsContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Lista editar productos */}
            <Route
              path="/updateProducts"
              element={
                <ProtectedUserRoute>
                  <ProductsListUpdateModeContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Crear producto */}
            <Route
              path="/updateProducts/createProduct"
              element={
                <ProtectedUserRoute>
                  <CreateEditProductContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Editar producto */}
            <Route
              path="/updateProducts/updateProduct/:productId"
              element={
                <ProtectedUserRoute>
                  <CreateEditProductContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Lista de órdenes de compra */}
            <Route path="/checkout" element={<BuyersDataContainer />} />
            <Route
              path="/purchaseOrders"
              element={
                <ProtectedUserRoute>
                  <PurchaseOrdersListContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Detalle de orden de compra */}
            <Route
              path="/purchaseOrders/details/:purchaseOrderId"
              element={
                <ProtectedUserRoute>
                  <PurchaseOrdersItemsListContainer />
                </ProtectedUserRoute>
              }
            />
          </Routes>
          <FooterContainer />
        </ConfirmProvider>
      </GeneralContextProvider>
    </>
  );
}

export default App;
