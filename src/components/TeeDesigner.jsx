import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import MenuNav from "../components/MenuNav";
import background_tshirt from "../images/background_tshirt.png";
import batman from "../images/batman.png";
import "../custom.css";
import ProductsCarousel from "./ProductsCarousel";
import im1 from "../carousel-images/im1.jpg";
import im2 from "../carousel-images/im2.jpg";
import im3 from "../carousel-images/im3.jpg";
import im4 from "../carousel-images/im4.jpg";
import im5 from "../carousel-images/im5.jpg";

function TeeDesigner() {
  const images = [im1, im2, im3, im4, im5];
  const [selectedDesign, setSelectedDesign] = useState("");
  const [tshirtColor, setTshirtColor] = useState("");
  const [customDesignFile, setCustomDesignFile] = useState(null);
  const canvasRef = useRef(null);

  // Function to update the T-shirt image on the canvas
  function updateTshirtImage(imageURL) {
    const canvas = canvasRef.current;
    canvas.clear();

    fabric.Image.fromURL(imageURL, function (img) {
      img.scaleToHeight(300);
      img.scaleToWidth(300);

      // Enable dragging and resizing for the image
      img.set({
        selectable: true,
        evented: true,
        resizable: true,
        hasControls: true,
        hasBorders: true,
      });

      canvas.centerObject(img);
      canvas.add(img);
      canvas.renderAll();
    });
  }

  useEffect(() => {
    const canvas = new fabric.Canvas("tshirt-canvas");
    canvasRef.current = canvas;

    return () => {
      canvas.dispose();
    };
  }, []);

  // Event handler for changing T-shirt color
  const handleColorChange = (event) => {
    const color = event.target.value;
    document.getElementById("tshirt-div").style.backgroundColor = color;
    setTshirtColor(color);
  };

  // Event handler for selecting a local T-shirt design
  const handleDesignChange = (event) => {
    const design = event.target.value;
    setSelectedDesign(design);
    updateTshirtImage(design);
  };

  // Event handler for uploading a custom T-shirt picture
  const handleCustomDesignChange = (event) => {
    const file = event.target.files[0];
    setCustomDesignFile(file);

    var reader = new FileReader();
    reader.onload = function (event) {
      var imgObj = new Image();
      imgObj.src = event.target.result;

      imgObj.onload = function () {
        var canvas = canvasRef.current;
        var img = new fabric.Image(imgObj);

        img.scaleToHeight(300);
        img.scaleToWidth(300);
        canvas.centerObject(img);
        canvas.add(img);
        canvas.renderAll();
      };
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Function to obtain selected data
  function getSelectedData() {
    const tshirtDesign = selectedDesign;
    const tshirtCustomPicture = customDesignFile ? customDesignFile.name : null;

    const selectedData = {
      localDesign: tshirtDesign,
      color: tshirtColor,
      customDesign: tshirtCustomPicture,
    };

    return selectedData;
  }

  // Event handler for the Save button
  const handleSaveClick = () => {
    const selectedData = getSelectedData();
    console.log(selectedData);
  };

  return (
    <>
      <MenuNav />
      <div className="pt-24 pb-8 bg-graypage">
        <div className="flex justify-center gap-x-20">
          <div className="p-6 bg-white rounded-md">
            <div id="tshirt-div">
              <img
                alt="imagen de camiseta basica"
                id="tshirt-backgroundpicture"
                src={background_tshirt}
              />
              <div id="drawingArea" className="drawing-area">
                <div className="canvas-container">
                  <canvas id="tshirt-canvas" width="200" height="400"></canvas>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-md border-2 border-grayline">
            <form className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2">
                <label
                  htmlFor="tshirt-local-design"
                  className="text-sm font-medium text-babygray"
                >
                  Nuestros diseños:
                </label>
                <select
                  id="tshirt-local-design"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  onChange={handleDesignChange}
                  value={selectedDesign}
                >
                  <option value="">
                    Selecciona uno de nuestros diseños...
                  </option>
                  <option value={batman}>Batman</option>
                </select>
              </div>

              <div className="flex flex-col gap-y-2">
                <label
                  htmlFor="tshirt-color"
                  className="text-sm font-medium text-babygray"
                >
                  Colores disponibles:
                </label>
                <select
                  id="tshirt-color"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  onChange={handleColorChange}
                  value={tshirtColor}
                >
                  <option value="">Selecciona un color...</option>
                  <option value="#fff">White</option>
                  <option value="#000">Black</option>
                  <option value="#f00">Red</option>
                  <option value="#008000">Green</option>
                  <option value="#ff0">Yellow</option>
                </select>
              </div>

              <div className="flex flex-col gap-y-2">
                <label
                  htmlFor="tshirt-custom-design"
                  className="text-sm font-medium text-gray-600"
                >
                  Sube aquí tu propio diseño:
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="tshirt-custom-design"
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    onChange={handleCustomDesignChange}
                  />
                  <div
                    role="button"
                    tabIndex="0"
                    className="cursor-pointer w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-white hover:bg-gray-100 text-gray-800"
                  >
                    <span className="inline-block mr-2">
                      <svg
                        className="w-5 h-5 text-gray-600 pt-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </span>
                    Escoger imagen
                  </div>
                  <span className="pl-1 text-xs text-gray-600">
                    {customDesignFile
                      ? customDesignFile.name
                      : "No se ha seleccionado una imagen"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="w-16 bg-summer text-darkiblue font-bold px-2 py-1 text-xs rounded-md"
                id="save-button"
                onClick={handleSaveClick}
              >
                Save
              </button>
            </form>
          </div>
        </div>
        <div>{/* <ProductsCarousel images={images} /> */}</div>
      </div>
    </>
  );
}

export default TeeDesigner;
