import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addColor, editColor } from "../../features/colorSlice";
import { useNavigate, useParams } from "react-router-dom";

function ColorsForm() {
  const [color, setColor] = useState({
    name: "",
    code: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const colors = useSelector((state) => state.colors.colors);

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
    if (params.id) {
      await dispatch(
        editColor({ id: Number(params.id), colorData: color })
      );
    } else {
      await dispatch(
        addColor({
          ...color,
          id: getNextColorId(),
        })
      );
    }
    setTimeout(() => {
      navigate("/tee-designer-admin");
    }, 500);
  };

  useEffect(() => {
    if (params.id) {
      setColor(colors.find((color) => color.id === Number(params.id)));
    }
  }, [params.id, colors]);

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
        <button className="bg-mainblue text-white font-bold px-2 py-1 rounded-sm">
          Guardar Color
        </button>
      </form>
    </div>
  );
}

export default ColorsForm;
