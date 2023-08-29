import { useState } from "react";
import axios from "axios";
import "../App.css";

function SingUp({ host }) {
  //註冊處理
  const [singUpform, setSingUpForm] = useState({
    email: "",
    password: "",
    nickname: "",
  });
  const [singUpResult, setSingUpResult] = useState(); //儲存註冊結果

  function handelSingUp(e) {
    const { name, value } = e.target;
    setSingUpForm({ ...singUpform, [name]: value }); //[name]是計算屬姓名
  }

  const singUp = async () => {
    try {
      const response = await axios.post(`${host}/users/sign_up`, singUpform);
      console.log("註冊成功");
      console.log(response);
      setSingUpResult("註冊成功");
    } catch (error) {
      console.log("註冊失敗 ");
      console.log(error);
      setSingUpResult("註冊失敗 : " + error.response.data.message);
    }
  };

  return (
    <section>
      <h1>註冊</h1>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handelSingUp}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handelSingUp}
      />
      <input
        type="text"
        name="nickname"
        placeholder="Nickname"
        onChange={handelSingUp}
      />
      <button onClick={singUp}>Sign Up</button>
      <h3>{singUpResult}</h3>
    </section>
  );
}

export default SingUp;
