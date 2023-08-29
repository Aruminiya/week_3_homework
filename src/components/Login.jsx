import { useState } from "react";
import axios from "axios";
import "../App.css";

function Login({ host, handleTokenChange }) {
  //登入處理

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginResult, setLoginResult] = useState(); //儲存登入結果

  function handleLogin(e) {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  }

  const login = async () => {
    try {
      const response = await axios.post(`${host}/users/sign_in`, loginForm);
      // console.log(response);
      console.log("登入成功");
      setLoginResult("登入成功 您的Token是 : " + response.data.token);
      handleTokenChange(response.data.token);
    } catch (error) {
      console.log("登入失敗");
      console.log(error);
      setLoginResult("登入失敗 : " + error.response.data.message);
    }
  };
  return (
    <section>
      <h1>登入</h1>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleLogin}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleLogin}
      />
      <button onClick={login}>Sign in</button>
      <h3>{loginResult}</h3>
    </section>
  );
}

export default Login;
