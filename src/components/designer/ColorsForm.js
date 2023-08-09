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
  const colors = useSelector((state) => state.colors.colors);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setColor({
      ...color,
      [e.target.name]: e.target.value,
    });
  };

  const getNextColorId = () => {
    const productIds = colors.map((color) => color.id);
    const maxId = Math.max(...productIds);
    return maxId + 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    setIsModalOpen(false);
    setRequestStatus("guardando");

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
      setRequestStatus("éxito");
    } catch (error) {
      setRequestStatus("error");
    }
  };

  useEffect(() => {
    if (requestStatus === "éxito") {
      setTimeout(() => {
        navigate("/tee-designer-admin");
      }, 500);
    }
  }, [requestStatus, navigate]);

  return (
    <div className="flex items-center justify-center h-full">
      <form
        onSubmit={handleSubmit}
        className="bg-darkiblue rounded-md max-w-m p-6"
      >
        <label
          className="text-white block text-xs font-bold mb-2"
          htmlFor="name"
        >
          Color:
        </label>
        <input
          type="text"
          name="name"
          placeholder="Nombre del color"
          value={color.name}
          onChange={handleChange}
          className="w-full p-2 rounded-md mb-2"
        />
        <label
          className="text-white block text-xs font-bold mb-2"
          htmlFor="code"
        >
          Codigo del color:
        </label>
        <input
          type="text"
          name="code"
          placeholder="Código del color"
          value={color.code}
          onChange={handleChange}
          className="w-full p-2 rounded-md mb-2"
        />
        <div className="mt-2 flex gap-x-2">
          <button className="bg-mainblue text-white font-bold px-2 py-1 rounded-sm">
            Guardar Color
          </button>
          <Link
            to={"/tee-designer-admin"}
            className="bg-summer text-darkiblue font-bold px-2 py-1 rounded-sm"
          >
            Cancelar
          </Link>
        </div>
      </form>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirmation Modal"
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0"
      >
        <div className="bg-black opacity-90 absolute inset-0"></div>
        <div className="bg-white p-6 rounded-md shadow-md text-center relative">
          <p className="mb-4">
            ¿Estás seguro de que deseas guardar los cambios?
          </p>
          <button
            className="bg-mainblue text-white px-3 py-1 rounded-md mt-3 mr-2"
            onClick={handleConfirm}
          >
            Sí, guardar
          </button>
          <button
            className="bg-summer text-darkiblue px-3 py-1 rounded-md mt-3"
            onClick={() => setIsModalOpen(false)}
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ColorsForm;
