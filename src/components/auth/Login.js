import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth.status);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(
      loginUser({
        username,
        password,
      })
    );
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loginStatus === "loading"}>
        {loginStatus === "loading" ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default Login;
