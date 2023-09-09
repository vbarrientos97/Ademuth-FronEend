import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import { fetchProducts } from "../../features/productSlice";
import { addToPurchase } from "../../features/purchaseSlice";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import config from "../../api/config";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductsCarousel = () => {
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    accessibility: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsConfirmationOpen(true);
  };

  const handleConfirmPurchase = async (product, amount) => {
    const productWithAmount = { ...product, amount };
    await dispatch(addToPurchase(productWithAmount));
    navigate("/customer-order");

    setIsConfirmationOpen(false);
  };

  return (
    <div className="max-w-screen-lg mx-auto pt-10 pb-10" id="products">
      <h2 className="mb-6 text-darkiblue font-bold text-center">
        Agrega otros productos a tu compra
      </h2>
      <Slider {...settings} className="mb-8 relative">
        {products.map((product, index) => (
          <div key={index} tabIndex={index} className="w-[306px]">
            <div
              className="p-2 w-[100%] h-[350px] cursor-pointer relative"
              onClick={() => handleProductClick(product)}
            >
              <img
                tabIndex={index}
                src={config.backendBaseUrl + product.photoURL}
                alt={`Product ${index}`}
                className="w-[100%] h-[100%] object-cover rounded-lg shadow-md"
              />
              <div
                className="p-2 w-[100%] h-[350px] absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-90"
                onClick={() => handleProductClick(product)}
              >
                <div className="w-[100%] h-[100%] text-white bg-darkiblue rounded-lg p-4 flex flex-col justify-end">
                  <h3 className="text-lg">{product.name}</h3>
                  <p className="font-light">{product.description}</p>
                  <span className="text-lg font-bold leading-loose">
                    ₡{product.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      {selectedProduct && (
        <ConfirmationModal
          product={selectedProduct}
          isOpen={isConfirmationOpen}
          onRequestClose={() => setIsConfirmationOpen(false)}
          onConfirm={handleConfirmPurchase}
        />
      )}
    </div>
  );
};

export default ProductsCarousel;
