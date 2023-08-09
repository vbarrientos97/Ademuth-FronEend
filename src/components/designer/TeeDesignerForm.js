import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import { fetchColors } from "../../features/colorSlice";
import { fetchDesigns } from "../../features/localDesignSlice";
import { addOrder } from "../../features/orderSlice";
import { useNavigate } from "react-router-dom";
import tallas from "../../images/tallas.jpg";

function TeeDesignerForm() {
  const [selectedDesign, setSelectedDesign] = useState("");
  const [tshirtColor, setTshirtColor] = useState("");
  const [tshirtSize, setTshirtSize] = useState("");
  const [tshirtAmount, setTshirtAmount] = useState("");
  const [tshirtCustomerName, setTshirtCustomerName] = useState("");
  const [tshirtCustomerLastname, setTshirtCustomerLastname] = useState("");
  const [tshirtComments, setTshirtComments] = useState("");
  const [customDesignFile, setCustomDesignFile] = useState(null);

  const colors = useSelector((state) => state.colors.colors);
  const status = useSelector((state) => state.colors.status);

  const designs = useSelector((state) => state.designs.designs);
  const statusDesign = useSelector((state) => state.designs.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // Function to update the T-shirt image on the canvas
  function updateTshirtImage(imageURL) {
    const canvas = canvasRef.current;
    canvas.clear();

    fabric.Image.fromURL(imageURL, function (img, object) {
      img.scaleToHeight(250);
      img.scaleToWidth(250);

      img.set({
        selectable: true,
        evented: true,
        resizable: true,
        hasControls: true,
        hasBorders: true,
        borderColor: "red",
        cornerColor: "blue",
        cornerSize: 20,
        borderDashArray: [5, 5],
        cornerStyle: "circle",
      });

      canvas.centerObject(img);
      canvas.add(img);
      canvas.renderAll();
    });
  }

  // UseEffects
  useEffect(() => {
    const canvas = new fabric.Canvas("tshirt-canvas");
    canvasRef.current = canvas;

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchColors());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (statusDesign === "idle") {
      dispatch(fetchDesigns());
    }
  }, [statusDesign, dispatch]);

  // Handler for selecting color
  const handleColorRadioChange = (event) => {
    const color = event.target.value;
    document.getElementById("tshirt-div").style.backgroundColor = color;
    setTshirtColor(color);
  };

  // Handler for selecting a T-shirt size
  const handleSize = (event) => {
    const size = event.target.value;
    setTshirtSize(size);
  };

  // Handler for selecting the amount
  const handleAmount = (event) => {
    const amount = event.target.value;
    setTshirtAmount(amount);
  };

  // Handler for selecting a customer name and lastname
  const handleCustomerName = (event) => {
    const customerName = event.target.value;
    setTshirtCustomerName(customerName);
  };

  const handleCustomerLastname = (event) => {
    const customerLastname = event.target.value;
    setTshirtCustomerLastname(customerLastname);
  };

  // Handler for selecting the aditional comments
  const handleComments = (event) => {
    const comments = event.target.value;
    setTshirtComments(comments);
  };

  // Handler for selecting a local T-shirt picture
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

        img.set({
          selectable: true,
          evented: true,
          resizable: true,
          hasControls: true,
          hasBorders: true,
          borderColor: "red",
          cornerColor: "blue",
          cornerSize: 20,
          borderDashArray: [5, 5],
          cornerStyle: "circle",
        });

        img.scaleToHeight(250);
        img.scaleToWidth(250);
        canvas.centerObject(img);
        canvas.add(img);
        canvas.renderAll();
      };
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handler to reset the design on canvas
  const handleResetClick = () => {
    const canvas = canvasRef.current;
    canvas.clear();
    setTshirtColor("");
    setSelectedDesign("");
    setCustomDesignFile(null);
    canvas.renderAll();
  };

  // Handler to set an id
  const getNextOrderId = () => {
    const orderIds = designs.map((order) => order.id);
    const maxId = Math.max(...orderIds);
    return maxId + 1;
  };

  // Handler to submit data to the server
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newOrder = {
      localDesign: selectedDesign,
      color: tshirtColor,
      size: tshirtSize,
      customDesign: customDesignFile ? customDesignFile.name : null,
      amount: tshirtAmount,
      customerName: tshirtCustomerName,
      customerLastname: tshirtCustomerLastname,
      comments: tshirtComments,
      id: getNextOrderId(),
    };

    await dispatch(addOrder(newOrder)).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="p-12 rounded-md border-2 border-grayline">
      <form onSubmit={handleSubmit} className="flex gap-x-12">
        <div className="flex flex-col gap-y-6">
          <h2 className="mb-2 font-bold text-mainblue">
            Escoge aquí cómo quieres que se vea tu camiseta:
          </h2>
          <div className="flex flex-col gap-y-4">
            <label
              htmlFor="tshirt-local-design"
              className="text-sm font-medium text-babygray"
            >
              Selecciona uno de nuestros diseños:
            </label>
            <select
              id="tshirt-local-design"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleDesignChange}
              value={selectedDesign}
            >
              <option value="">Seleccionar diseño...</option>
              {designs.map((design, index) => (
                <option key={index} value={design.image}>
                  {design.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-y-4">
            <label
              htmlFor="tshirt-custom-design"
              className="text-sm font-medium text-gray-600"
            >
              O sube aquí tu propio diseño:
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

          <div className="">
            <button
              type="button"
              className="px-4 py-2 font-semibold text-xs text-white bg-mainblue rounded-md"
              onClick={handleResetClick}
            >
              Click aquí para eliminar diseño
            </button>
          </div>

          <div className="flex flex-col gap-y-4">
            <label className="text-sm font-medium text-babygray">
              Colores disponibles:
            </label>
            <div className="flex gap-x-4">
              {colors.map((color, index) => (
                <label
                  key={index}
                  className="text-babygray"
                  htmlFor={color.name}
                >
                  <div
                    className="circle-color"
                    style={{ backgroundColor: color.code }}
                    onClick={() =>
                      handleColorRadioChange({ target: { value: color.code } })
                    }
                  />
                  {color.name}
                </label>
              ))}
            </div>
          </div>
          {/* Sizes */}
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
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
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
            Si necesitas un diseño aún más personalizado puedes contactarnos
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
            type="submit"
            className="w-20 bg-summer text-darkiblue font-bold px-2 py-1 text-s rounded-md"
            id="save-button"
            // onClick={handleSaveClick}
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

export default TeeDesignerForm;
