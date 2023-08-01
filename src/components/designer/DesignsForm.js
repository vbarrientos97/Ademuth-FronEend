import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDesign, editDesign } from "../../features/localDesignSlice";
import { useNavigate, useParams } from "react-router-dom";

function DesignsForm() {
  const [design, setDesign] = useState({
    name: "",
    image: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const designs = useSelector((state) => state.designs.designs);

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
    setTimeout(() => {
      navigate("/tee-designer-admin");
    }, 500);
  };

  useEffect(() => {
    if (params.id) {
      setDesign(designs.find((design) => design.id === Number(params.id)));
    }
  }, [params.id, designs]);

  return (
    <div className="flex items-center justify-center h-full">
      <form
        onSubmit={handleSubmit}
        className="bg-darkiblue rounded-md max-w-sm p-6"
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
          className="w-full p-2 rounded-md mb-2"
        />
        <button className="bg-mainblue text-white font-bold px-2 py-1 rounded-sm">
          Guardar Diseño
        </button>
      </form>
    </div>
  );
}

export default DesignsForm;
