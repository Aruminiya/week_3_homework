import "./App.css";

import SingUp from "./components/SingUp";
import Login from "./components/Login";
import Checkout from "./components/Checkout";
import Logout from "./components/Logout";
import Todolist from "./components/Todolist";
import { useEffect, useState } from "react";

function App() {
  // useEffect(() => {
  //   console.log(token);
  // });

  const host = "https://todolist-api.hexschool.io";

  const [token, setToken] = useState(null);

  const handleTokenChange = (newToken) => {
    setToken(newToken);
  };

  // 先處裡載入資料

  return (
    <main>
      <SingUp host={host} />
      <hr />
      <Login host={host} handleTokenChange={handleTokenChange} />
      <hr />
      <Checkout host={host} />
      <hr />
      <Logout host={host} />
      <hr />
      <Todolist host={host} token={token} />
    </main>
  );
}

export default App;
