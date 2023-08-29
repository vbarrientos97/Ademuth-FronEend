import "./App.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ProductsList from "./components/products/ProductsList";
import ProductsForm from "./components/products/ProductsForm";
import TeeDesigner from "./components/designer/TeeDesigner";
import TeeDesignerAdmin from "./components/designer/TeeDesignerAdmin";
import Orders from "./components/purchase-orders/Orders";
import ColorsForm from "./components/designer/ColorsForm";
import DesignsForm from "./components/designer/DesignsForm";
import CustomerOrder from "./components/purchase-orders/CustomerOrder";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="h-screen text-myblacki relative">
          <div className="h-full relative">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<TeeDesigner />} />
                <Route
                  path="/tee-designer-admin"
                  element={<TeeDesignerAdmin />}
                />
                <Route path="/products" element={<ProductsList />} />
                <Route path="/create-product" element={<ProductsForm />} />
                <Route path="/edit-product/:id" element={<ProductsForm />} />
                <Route path="/purchase-orders" element={<Orders />} />
                <Route path="/create-color" element={<ColorsForm />} />
                <Route path="/edit-color/:id" element={<ColorsForm />} />
                <Route path="/create-design" element={<DesignsForm />} />
                <Route path="/edit-design/:id" element={<DesignsForm />} />
                <Route path="/customer-order" element={<CustomerOrder />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
