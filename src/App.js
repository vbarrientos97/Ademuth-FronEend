import "./App.css";
import ProductsList from "./components/ProductsList";
import ProductsForm from "./components/ProductsForm";
import TeeDesigner from "./components/TeeDesigner";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="h-screen text-myblacki relative">
      <div className="h-full relative">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProductsList />} />
            <Route path="/create-product" element={<ProductsForm />} />
            <Route path="/edit-product/:id" element={<ProductsForm />} />
            <Route path="/tee-designer" element={<TeeDesigner />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
