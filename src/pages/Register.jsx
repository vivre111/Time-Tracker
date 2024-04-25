import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:8000/register", {
        username,
        password,
      });
      // save token in Cookie
      const token = response.data.token;
      Cookies.set("userToken", token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      console.log("Registration successful", token);
      // Redirect or do something upon success
      navigate("/home");
    } catch (error) {
      console.error(
        "Registration failed",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
