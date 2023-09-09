import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addColor, editColor } from "../../features/colorSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Modal from "react-modal";

function ColorsForm() {
  const [color, setColor] = useState({
    name: "",
    code: "",
  });

  const params = useParams();
  const colorsData = useSelector((state) => state.colors.colors);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setColor({
      ...color,
      [e.target.name]: e.target.value,
    });
  };

  const getNextColorId = () => {
    const productIds = colorsData.map((color) => color.id);
    const maxId = Math.max(...productIds);
    return maxId + 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!color.name || !color.code) {
      setErrors({
        name: !color.name ? "Campo obligatorio" : "",
        code: !color.code ? "Campo obligatorio" : "",
      });
      return;
    }

    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    setIsLoading(true);

    try {
      if (params.id) {
        await dispatch(editColor({ id: Number(params.id), colorData: color }));
      } else {
        await dispatch(
          addColor({
            ...color,
            id: getNextColorId(),
          })
        );
      }
      setRequestStatus("succeeded");
    } catch (error) {
      setRequestStatus("failed");
    }
  };

  useEffect(() => {
    const redirectToAdmin = async () => {
      if (requestStatus === "succeeded") {
        await new Promise((resolve) => setTimeout(resolve, 500));
        navigate("/tee-designer-admin");
      }
    };

    redirectToAdmin();
  }, [requestStatus, navigate]);

  return (
    <>
      <div>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
          <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
            <h1 className="text-center text-3xl font-light text-darkiblue">
              {params.id ? "Editar Color" : "Agregar Color"}
            </h1>
            <div className="mt-8">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      placeholder="Nombre del color"
                      value={color.name}
                      onChange={handleChange}
                      className={`text-sm sm:text-base placeholder-gray-500 pl-2 pr-4 rounded-lg border ${
                        errors.name ? "border-red-500" : "border-gray-400"
                      } w-full py-2`}
                    />
                  </div>
                  {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>

                <div className="flex flex-col mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      name="code"
                      placeholder="Código del color"
                      value={color.code}
                      onChange={handleChange}
                      className={`text-sm sm:text-base placeholder-gray-500 pl-2 pr-4 rounded-lg border ${
                        errors.code ? "border-red-500" : "border-gray-400"
                      } w-full py-2`}
                    />
                  </div>
                  {errors.code && <p className="text-red-500">{errors.code}</p>}
                </div>
                <div className="mt-2 flex gap-x-2">
                  <button className="bg-mainblue hover:bg-blue-700 text-white font-bold px-2 py-1 rounded-md">
                    Guardar Color
                  </button>
                  <Link
                    to={"/tee-designer-admin"}
                    className="bg-summer text-darkiblue hover:bg-summerhovered transition font-bold px-2 py-1 rounded-md"
                  >
                    Cancelar
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirmation Modal"
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0"
        isLoading={isLoading}
      >
        <div className="bg-black opacity-90 absolute inset-0"></div>
        <div className="bg-white p-6 rounded-md shadow-md text-center relative">
          <p className="mb-4">
            ¿Estás seguro de que deseas guardar los cambios?
          </p>
          <button
            className="bg-mainblue hover:bg-blue-700 text-white px-3 py-1 rounded-md mt-3 mr-2"
            disabled={isLoading}
            onClick={handleConfirm}
          >
            <span className="mr-2">
              {isLoading ? "Guardando" : "Sí, guardar"}
            </span>
          </button>
          <button
            className="bg-summer text-darkiblue hover:bg-summerhovered transition px-3 py-1 rounded-md mt-3"
            onClick={() => setIsModalOpen(false)}
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </>
  );
}

export default ColorsForm;
