import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const registerStatus = useSelector((state) => state.auth.status);

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isRegisteringIn, setIsRegisteringIn] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    setErrors({});
    setFormError("");

    if (!name || !lastname || !email || !phone || !username || !password) {
      setErrors({
        name: !name ? "Campo obligatorio" : "",
        lastname: !lastname ? "Campo obligatorio" : "",
        email: !email ? "Campo obligatorio" : "",
        phone: !phone ? "Campo obligatorio" : "",
        username: !username ? "Campo obligatorio" : "",
        password: !password ? "Campo obligatorio" : "",
      });
      return;
    }

    setIsRegisteringIn(true);

    try {
      const response = await dispatch(
        registerUser({
          name,
          lastname,
          email,
          phone,
          username,
          password,
          isAdmin: false,
        })
      ).unwrap();

      if (response.meta.requestStatus === "fulfilled") {
        navigate("/");
      }
    } catch (error) {
      setFormError("Ya existe un usuario con ese nombre");
    } finally {
      setIsRegisteringIn(false);
    }
  };

  useEffect(() => {
    if (registerStatus === "succeeded") {
      navigate("/");
    }
  }, [registerStatus, navigate]);

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
          <h1 className="text-center text-5xl font-light">Ademuth App</h1>
          <div className="mt-10">
            <form>
              <div className="flex flex-col mb-6">
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    className={`text-sm sm:text-base placeholder-gray-500 pl-2 pr-4 rounded-lg border ${
                      errors.name ? "border-red-500" : "border-gray-400"
                    } w-full py-2`}
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>
              <div className="flex flex-col mb-6">
                <div className="relative">
                  <input
                    id="lastname"
                    type="text"
                    className={`text-sm sm:text-base placeholder-gray-500 pl-2 pr-4 rounded-lg border ${
                      errors.lastname ? "border-red-500" : "border-gray-400"
                    } w-full py-2`}
                    placeholder="Apellido"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
                {errors.lastname && (
                  <p className="text-red-500">{errors.lastname}</p>
                )}
              </div>
              <div className="flex flex-col mb-6">
                <div className="relative">
                  <input
                    id="email"
                    type="text"
                    className={`text-sm sm:text-base placeholder-gray-500 pl-2 pr-4 rounded-lg border ${
                      errors.email ? "border-red-500" : "border-gray-400"
                    } w-full py-2`}
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div className="flex flex-col mb-6">
                <div className="relative">
                  <input
                    id="phone"
                    type="text"
                    className={`text-sm sm:text-base placeholder-gray-500 pl-2 pr-4 rounded-lg border ${
                      errors.phone ? "border-red-500" : "border-gray-400"
                    } w-full py-2`}
                    placeholder="Teléfono"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                {errors.phone && <p className="text-red-500">{errors.phone}</p>}
              </div>
              <div className="flex flex-col mb-6">
                <div className="relative">
                  <input
                    id="username"
                    type="text"
                    className={`text-sm sm:text-base placeholder-gray-500 pl-2 pr-4 rounded-lg border ${
                      errors.username ? "border-red-500" : "border-gray-400"
                    } w-full py-2`}
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500">{errors.username}</p>
                )}
              </div>
              <div className="flex flex-col mb-6">
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    className={`text-sm sm:text-base placeholder-gray-500 pl-2 pr-4 rounded-lg border ${
                      errors.password ? "border-red-500" : "border-gray-400"
                    } w-full py-2`}
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password}</p>
                )}
                {formError && <p className="text-red-500">{formError}</p>}
              </div>

              <div className="flex w-full">
                <button
                  type="button"
                  className="flex items-center justify-center text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
                  disabled={isRegisteringIn}
                  onClick={handleRegister}
                >
                  <span className="mr-2 uppercase">
                    {isRegisteringIn ? "Guardando" : "Guardar"}
                  </span>
                </button>
              </div>
              <div className="text-babygray mt-2">
                <Link to="/">
                  Ya tienes una cuenta?{" "}
                  <span className="text-mainblue underline">
                    Click aquí para ingresar
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
