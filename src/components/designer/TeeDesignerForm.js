import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import { fetchColors } from "../../features/colorSlice";
import { fetchDesigns } from "../../features/localDesignSlice";
import { addTshirt } from "../../features/tshirtSlice";
import { fetchTeeprice } from "../../features/priceSlice";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import config from "../../api/config";
import tallas from "../../images/tallas.jpg";

function TeeDesignerForm() {
  const [selectedDesign, setSelectedDesign] = useState("");
  const [tshirtColor, setTshirtColor] = useState("");
  const [tshirtSize, setTshirtSize] = useState("");
  const [tshirtAmount, setTshirtAmount] = useState("");
  const [tshirtComments, setTshirtComments] = useState("");
  const [customDesignFile, setCustomDesignFile] = useState(null);
  const colors = useSelector((state) => state.colors.colors);
  const status = useSelector((state) => state.colors.status);
  const designs = useSelector((state) => state.designs.designs);
  const statusDesign = useSelector((state) => state.designs.status);
  const tshirtPrice = useSelector((state) => state.teeprice.teeprice);
  const statusPrice = useSelector((state) => state.teeprice.status);
  const [errors, setErrors] = useState({});
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (statusPrice === "idle") {
      dispatch(fetchTeeprice());
    }
  }, [statusPrice, dispatch]);

  const handleColorRadioChange = (event) => {
    const color = event.target.value;
    document.getElementById("tshirt-div").style.backgroundColor = color;
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

  const handleComments = (event) => {
    const comments = event.target.value;
    setTshirtComments(comments);
  };

  const handleDesignChange = (event) => {
    const design = event.target.value;
    setSelectedDesign(design);
    updateTshirtImage(design);
  };

  const handleCustomDesignChange = (e) => {
    const file = e.target.files[0];
    setCustomDesignFile(file);

    var reader = new FileReader();
    reader.onload = function (e) {
      var imgObj = new Image();
      imgObj.src = e.target.result;

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

  const handleResetClick = () => {
    const canvas = canvasRef.current;
    canvas.clear();
    setTshirtColor("");
    setSelectedDesign("");
    setCustomDesignFile(null);
    canvas.renderAll();
  };

  const generateUniqueTshirtId = () => {
    return uuidv4();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!selectedDesign) {
      newErrors.selectedDesign = "Por favor selecciona un diseño.";
    }
    if (!tshirtColor) {
      newErrors.tshirtColor = "Por favor selecciona un color.";
    }
    if (!tshirtSize) {
      newErrors.tshirtSize = "Por favor selecciona una talla.";
    }
    if (!tshirtAmount) {
      newErrors.tshirtAmount = "Por favor ingresa la cantidad.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newTshirt = {
        localDesign: selectedDesign,
        color: tshirtColor,
        size: tshirtSize,
        customDesign: customDesignFile,
        amount: tshirtAmount,
        comments: tshirtComments,
        price: tshirtPrice[0].teeprice,
        id: generateUniqueTshirtId(),
      };

      await dispatch(addTshirt(newTshirt)).then(() => {
        navigate("/customer-order");
      });

      setSelectedDesign("");
      setTshirtColor("");
      setTshirtSize("");
      setTshirtAmount("");
      setTshirtComments("");
      setCustomDesignFile(null);
    }
  };

  return (
    <div className="p-x-6">
      <form onSubmit={handleSubmit} className="flex gap-x-12 mt-8">
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
              className="w-full px-4 py-2 border rounded-md"
              onChange={handleDesignChange}
              value={selectedDesign}
            >
              <option value="">Seleccionar diseño...</option>
              {designs.map((design, index) => (
                <option
                  key={index}
                  value={config.backendBaseUrl + design.image}
                >
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
                onChange={(e) => handleCustomDesignChange(e)}
              />
              <div
                role="button"
                tabIndex="0"
                className="cursor-pointer w-full px-4 py-2 border rounded-md bg-white hover:bg-gray-100 text-gray-800"
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
            {errors.selectedDesign && (
              <p className="text-red-500">{errors.selectedDesign}</p>
            )}
          </div>

          <div className="">
            <button
              type="button"
              className="px-4 py-2 font-semibold text-xs text-white bg-mainblue hover:bg-blue-700 text-white font-bold rounded-md"
              onClick={handleResetClick}
            >
              Click aquí para eliminar diseño
            </button>
          </div>

          <div className="flex flex-col gap-y-4">
            <label className="text-sm font-medium text-babygray">
              Colores disponibles:
            </label>
            <div className="flex gap-4 flex-wrap">
              {colors.map((color, index) => (
                <label
                  key={index}
                  className="text-babygray text-center"
                  htmlFor={color.name}
                >
                  <div
                    className="circle-color"
                    title={color.name}
                    style={{ backgroundColor: color.code }}
                    tabIndex={0}
                    onClick={() =>
                      handleColorRadioChange({ target: { value: color.code } })
                    }
                  />
                </label>
              ))}
            </div>
            {errors.tshirtColor && (
              <p className="text-red-500">{errors.tshirtColor}</p>
            )}
          </div>
          <div
            className="w-auto h-32 bg-cover bg-top rounded-lg border border-grayline"
            style={{ backgroundImage: `url(${tallas})` }}
          ></div>
        </div>

        <div className="h-200 w-0.5 bg-grayline opacity-100 dark:opacity-50"></div>

        <div className="flex flex-col gap-y-6 mt-[70px]">
          <div className="flex flex-col gap-y-4">
            <label
              htmlFor="tshirt-size"
              className="text-sm font-medium text-babygray"
            >
              Tallas disponibles:
            </label>
            <select
              id="tshirt-size"
              className="w-full px-4 py-2 border rounded-md"
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
            {errors.tshirtSize && (
              <p className="text-red-500">{errors.tshirtSize}</p>
            )}
          </div>

          <div className="flex flex-col gap-y-4">
            <label
              htmlFor="tshirt-amount"
              className="text-sm font-medium text-babygray"
            >
              Cantidad de camisetas que deseas ordenar:
            </label>
            <input
              className="w-full px-4 py-2 border rounded-md"
              type="number"
              min={1}
              max={1000}
              id="tshirt-amount"
              placeholder="Digita la cantidad"
              value={tshirtAmount}
              onChange={handleAmount}
            ></input>
            {errors.tshirtAmount && (
              <p className="text-red-500">{errors.tshirtAmount}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-4">
            <label
              htmlFor="tshirt-comments"
              className="text-sm font-medium text-babygray"
            >
              Añadir comentarios:
            </label>
            <textarea
              className="w-full px-4 py-2 border rounded-md"
              id="tshirt-comments"
              placeholder="Escribe aquí tus comentarios adicionales..."
              value={tshirtComments}
              onChange={handleComments}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-20 bg-summer text-darkiblue hover:bg-summerhovered transition font-bold px-2 py-1 text-s rounded-md"
            id="save-button"
          >
            Guardar
          </button>
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
        </div>
      </form>
    </div>
  );
}

export default TeeDesignerForm;
