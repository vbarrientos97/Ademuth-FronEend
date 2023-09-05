import TeeDesignerForm from "./TeeDesignerForm";
import MenuNav from ".././nav/MenuNav";
import Footer from ".././nav/Footer";
import background_tshirt from "../../images/background_tshirt.png";
import "../../custom.css";
import ProductsCarousel from "../products/ProductsCarousel";

function TeeDesigner() {
  return (
    <>
      <MenuNav />
      <div className="pt-24 pb-8 bg-graypage">
        <div className="flex justify-between gap-x-10 max-w-[90%] mx-auto">
          <div>
            <h2 className="mb-6 text-darkiblue font-bold">
              Personaliza tu Camiseta
            </h2>
            <div className="p-6 bg-white rounded-md">
              <div id="tshirt-div">
                <img
                  alt="imagen de camiseta basica"
                  id="tshirt-backgroundpicture"
                  src={background_tshirt}
                />
                <div id="drawingArea" className="drawing-area">
                  <div className="canvas-container">
                    <canvas
                      id="tshirt-canvas"
                      width="200"
                      height="400"
                    ></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <TeeDesignerForm />
        </div>
      </div>
      <div>
        <ProductsCarousel />
      </div>
      <Footer />
    </>
  );
}

export default TeeDesigner;
