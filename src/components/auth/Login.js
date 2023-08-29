import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth.status);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrors({});
    setFormError("");

    if (!username || !password) {
      setErrors({
        username: !username ? "Campo obligatorio" : "",
        password: !password ? "Campo obligatorio" : "",
      });
      return;
    }

    setIsLoggingIn(true);

    try {
      const response = await dispatch(
        loginUser({
          username,
          password,
        })
      ).unwrap();

      if (response.meta.requestStatus === "fulfilled") {
        if (isAdmin) {
          navigate("/purchase-orders");
        } else {
          navigate("/dashboard");
        }
      } else {
        setFormError("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      setFormError("Usuario o contraseña incorrectos");
    } finally {
      setIsLoggingIn(false);
    }
  };

  useEffect(() => {
    if (loginStatus === "succeeded" && isAdmin) {
      navigate("/purchase-orders");
    } else if (loginStatus === "succeeded") {
      navigate("/dashboard");
    }
  }, [loginStatus, isAdmin, navigate]);

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
          <h1 className="text-center text-5xl font-light">Ademuth App</h1>
          <div className="mt-10">
            <form>
              <div className="flex flex-col mb-6">
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="username"
                    type="text"
                    className={`text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border ${
                      errors.username ? "border-red-500" : "border-gray-400"
                    } w-full py-2 focus:outline-none focus:border-blue-400`}
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
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                  </div>

                  <input
                    id="password"
                    type="password"
                    className={`text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border ${
                      errors.password ? "border-red-500" : "border-gray-400"
                    } w-full py-2 focus:outline-none focus:border-blue-400`}
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
                  className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
                  disabled={isLoggingIn}
                  onClick={handleLogin}
                >
                  <span className="mr-2 uppercase">
                    {isLoggingIn ? "Entrando" : "Entrar"}
                  </span>
                </button>
              </div>
              <div className="text-babygray mt-2">
                <Link to="/register" className="">
                  Aún no tienes una cuenta?{" "}
                  <span className="text-mainblue underline">
                    Click aquí para crearla
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

export default Login;
