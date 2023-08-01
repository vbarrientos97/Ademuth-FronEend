import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductsCarousel = () => {
  const products = useSelector((state) => state.products.products);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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

  return (
    <div className="max-w-screen-lg mx-auto pt-16 pb-16">
      <h2 className="mb-6 text-darkiblue font-bold text-center">
        Agrega otros productos a tu compra
      </h2>
      <Slider {...settings} className="mb-8">
        {products.map((product, index) => (
          <div key={index} className="px-4 w-[100%] h-[350px]">
            <img
              src={product.photoURL}
              alt={`Product ${index}`}
              className="w-[100%] h-[100%] object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductsCarousel;
