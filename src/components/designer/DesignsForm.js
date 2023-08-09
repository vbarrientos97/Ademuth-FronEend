import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDesign, editDesign } from "../../features/localDesignSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Modal from "react-modal";

function DesignsForm() {
  const [design, setDesign] = useState({
    name: "",
    image: null,
  });
  const params = useParams();
  const designs = useSelector((state) => state.designs.designs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDesign({
      ...design,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDesign({
          ...design,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const getNextDesignId = () => {
    const productIds = designs.map((design) => design.id);
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
        await dispatch(
          editDesign({ id: Number(params.id), designData: design })
        );
      } else {
        await dispatch(
          addDesign({
            ...design,
            id: getNextDesignId(),
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
          Nombre del diseño:
        </label>
        <input
          type="text"
          name="name"
          placeholder="Nombre del diseño"
          value={design.name}
          onChange={handleChange}
          className="w-full p-2 rounded-md mb-2"
        />
        <label
          className="text-white block text-xs font-bold mb-2"
          htmlFor="image"
        >
          Vista del Diseño:
        </label>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={(e) => handleImageChange(e)}
          className="w-full p-2 rounded-md mb-2 text-white"
        />
        <div className="mt-2 flex gap-x-2">
          <button className="bg-mainblue text-white font-bold px-2 py-1 rounded-sm">
            Guardar Diseño
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

export default DesignsForm;
