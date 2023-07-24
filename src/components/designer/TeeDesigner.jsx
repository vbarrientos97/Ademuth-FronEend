import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import MenuNav from ".././nav/MenuNav";
import Footer from ".././nav/Footer";
import background_tshirt from "../../images/background_tshirt.png";
import batman from "../../images/batman.png";
import "../../custom.css";
import ProductsCarousel from "../products/ProductsCarousel";
import im1 from "../../carousel-images/im1.jpg";
import im2 from "../../carousel-images/im2.jpg";
import im3 from "../../carousel-images/im3.jpg";
import im4 from "../../carousel-images/im4.jpg";
import im5 from "../../carousel-images/im5.jpg";
import tallas from "../../images/tallas.jpg";

function TeeDesigner() {
  const images = [im1, im2, im3, im4, im5];
  const [selectedDesign, setSelectedDesign] = useState("");
  const [tshirtColor, setTshirtColor] = useState("");
  const [tshirtSize, setTshirtSize] = useState("");
  const [tshirtAmount, setTshirtAmount] = useState("");
  const [tshirtCustomerName, setTshirtCustomerName] = useState("");
  const [tshirtCustomerLastname, setTshirtCustomerLastname] = useState("");
  const [tshirtComments, setTshirtComments] = useState("");

  const [selectedColor, setSelectedColor] = useState("");
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

  const handleColorRadioChange = (event) => {
    const color = event.target.value;
    document.getElementById("tshirt-div").style.backgroundColor = color;
    setSelectedColor(color);
    setTshirtColor(color);
  };

  const handleSize = (event) => {
    const size = event.target.value;
    setTshirtSize(size);
  };

  const handleAmount = (event) => {
    const amount = event.target.value;
    setTshirtAmount(amount);
  };

  const handleCustomerName = (event) => {
    const customerName = event.target.value;
    setTshirtCustomerName(customerName);
  };

  const handleCustomerLastname = (event) => {
    const customerLastname = event.target.value;
    setTshirtCustomerLastname(customerLastname);
  };

  const handleComments = (event) => {
    const comments = event.target.value;
    setTshirtComments(comments);
  };

  // Handler for selecting a local T-shirt design
  const handleDesignChange = (event) => {
    const design = event.target.value;
    setSelectedDesign(design);
    updateTshirtImage(design);
  };

  // Handler for uploading a custom T-shirt picture
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
      size: tshirtSize,
      customDesign: tshirtCustomPicture,
      amount: tshirtAmount,
      customerName: tshirtCustomerName,
      customerLastname: tshirtCustomerLastname,
      comments: tshirtComments,
    };

    return selectedData;
  }

  // Handler for the Save button
  const handleSaveClick = () => {
    const selectedData = getSelectedData();
    console.log(selectedData);
  };

  return (
    <>
      <MenuNav />
      <div className="pt-24 pb-8 bg-graypage">
        <div className="flex justify-center gap-x-16 max-w-[95%] mx-auto">
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

          <div className="p-12 rounded-md border-2 border-grayline">
            <form className="flex gap-x-12">
              <div className="flex flex-col gap-y-6">
                <h2 className="mb-2 font-bold text-mainblue">
                  Escoge aquí cómo quieres que se vea tu camiseta:
                </h2>
                <div className="flex flex-col gap-y-4">
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

                <div className="flex flex-col gap-y-4">
                  <label className="text-sm font-medium text-babygray">
                    Colores disponibles:
                  </label>
                  <div className="flex gap-x-4">
                    <label className="text-babygray" htmlFor="white">
                      <div
                        className="circle-color"
                        style={{ backgroundColor: "#fff" }}
                        onClick={() =>
                          handleColorRadioChange({ target: { value: "#fff" } })
                        }
                      />
                      Blanco
                    </label>
                    <label className="text-babygray" htmlFor="black">
                      <div
                        className="circle-color"
                        style={{ backgroundColor: "#000" }}
                        onClick={() =>
                          handleColorRadioChange({ target: { value: "#000" } })
                        }
                      />
                      Negro
                    </label>
                    <label className="text-babygray" htmlFor="red">
                      <div
                        className="circle-color"
                        style={{ backgroundColor: "#f00" }}
                        onClick={() =>
                          handleColorRadioChange({ target: { value: "#f00" } })
                        }
                      />
                      Rojo
                    </label>
                    <label className="text-babygray" htmlFor="green">
                      <div
                        className="circle-color"
                        style={{ backgroundColor: "#008000" }}
                        onClick={() =>
                          handleColorRadioChange({
                            target: { value: "#008000" },
                          })
                        }
                      />
                      Verde
                    </label>
                    <label className="text-babygray" htmlFor="yellow">
                      <div
                        className="circle-color"
                        style={{ backgroundColor: "#ff0" }}
                        onClick={() =>
                          handleColorRadioChange({ target: { value: "#ff0" } })
                        }
                      />
                      Amarillo
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-y-4">
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
                <div
                  className="w-auto h-48 bg-cover bg-top rounded-lg border border-grayline"
                  style={{ backgroundImage: `url(${tallas})` }}
                ></div>
              </div>

              <div className="h-200 w-0.5 bg-grayline opacity-100 dark:opacity-50"></div>

              <div className="flex flex-col gap-y-6">
                <div className="flex flex-col gap-y-4">
                  <label
                    htmlFor="tshirt-size"
                    className="text-sm font-medium text-babygray"
                  >
                    Tallas disponibles:
                  </label>
                  <select
                    id="tshirt-size"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    onChange={handleSize}
                    value={tshirtSize}
                  >
                    <option value="">Selecciona tu talla...</option>
                    <option value="#fff">XS</option>
                    <option value="#000">S</option>
                    <option value="#f00">M</option>
                    <option value="#008000">L</option>
                    <option value="#ff0">XL</option>
                  </select>
                </div>

                <div className="flex flex-col gap-y-4">
                  <label
                    htmlFor="tshirt-amount"
                    className="text-sm font-medium text-babygray"
                  >
                    Cantidad de camisetas que deseas ordenar:
                  </label>
                  <input
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    type="number"
                    id="tshirt-amount"
                    placeholder="Digita la cantidad"
                    value={tshirtAmount}
                    onChange={handleAmount}
                  ></input>
                </div>

                <div className="flex flex-col gap-y-4">
                  <label
                    htmlFor="tshirt-customer-name"
                    className="text-sm font-medium text-babygray"
                  >
                    Nombre del cliente:
                  </label>
                  <input
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    type="text"
                    id="tshirt-customer-name"
                    placeholder="Escribe aquí tu nombre"
                    value={tshirtCustomerName}
                    onChange={handleCustomerName}
                  ></input>
                </div>

                <div className="flex flex-col gap-y-4">
                  <label
                    htmlFor="tshirt-customer-lastname"
                    className="text-sm font-medium text-babygray"
                  >
                    Apellido del cliente:
                  </label>
                  <input
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    type="text"
                    id="tshirt-customer-lastname"
                    placeholder="Escribe aquí tu apellido"
                    value={tshirtCustomerLastname}
                    onChange={handleCustomerLastname}
                  ></input>
                </div>

                <div className="flex flex-col gap-y-4">
                  <label
                    htmlFor="tshirt-comments"
                    className="text-sm font-medium text-babygray"
                  >
                    Añadir comentarios:
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    id="tshirt-comments"
                    placeholder="Escribe aquí tus comentarios adicionales..."
                    value={tshirtComments}
                    onChange={handleComments}
                  ></textarea>
                </div>
                <span className="text-darkiblue text-xs font-bold">
                  Si necesitas un diseño aún más personalizado puedes
                  contactarnos
                  <br /> llamando al{" "}
                  <a
                    className="text-blue-600 visited:text-purple-600"
                    href="tel:84232830"
                  >
                    8423-2830{" "}
                  </a>
                  y con gusto te atenderemos!
                </span>
                <button
                  type="button"
                  className="w-20 bg-summer text-darkiblue font-bold px-2 py-1 text-s rounded-md"
                  id="save-button"
                  onClick={handleSaveClick}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <ProductsCarousel images={images} />
      </div>
      <Footer />
    </>
  );
}

export default TeeDesigner;
