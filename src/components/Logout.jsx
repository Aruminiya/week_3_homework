import { useState } from "react";
import axios from "axios";
import "../App.css";

function Logout({ host }) {
  //登出處裡
  const [logOutToken, setLogOutToken] = useState(); //儲存輸入的token
  const [logOutResult, setLogOutResult] = useState(); //儲存登出結果

  function handlogOut(e) {
    const { value } = e.target;
    setLogOutToken(value);
  }

  const logOut = async () => {
    try {
      const response = await axios.post(
        `${host}/users/sign_out`,
        {},
        {
          headers: {
            Authorization: logOutToken,
          },
        }
      );
      console.log("登出成功");
      console.log(response);
      setLogOutResult("登出成功");
    } catch (error) {
      console.log("登出失敗");
      console.log(error);
      setLogOutResult("登出失敗 : " + error.response.data.message);
    }
  };

  return (
    <section>
      <h1>登出</h1>
      <input
        type="text"
        name="token"
        placeholder="Token"
        onChange={handlogOut}
      />
      <button onClick={logOut}>Sign Out</button>
      <h3>{logOutResult}</h3>
    </section>
  );
}

export default Logout;
