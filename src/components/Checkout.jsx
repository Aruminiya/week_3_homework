import { useState } from "react";
import axios from "axios";
import "../App.css";

function Checkout({ host }) {
  //驗證處理

  const [token, setToken] = useState(); //儲存輸入的token
  const [checkoutResult, setCheckoutResult] = useState(); //儲存驗證結果

  function handleCheckout(e) {
    const { value } = e.target;
    setToken(value);
  }

  const checkout = async () => {
    try {
      const response = await axios.get(`${host}/users/checkout`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("驗證成功");
      console.log(response);
      setCheckoutResult("驗證成功");
    } catch (error) {
      console.log("驗證失敗");
      console.log(error);
      setCheckoutResult("驗證失敗 : " + error.response.data.message);
    }
  };

  return (
    <section>
      <h1>驗證</h1>
      <input
        type="text"
        name="token"
        placeholder="Token"
        onChange={handleCheckout}
      />
      <button onClick={checkout}>Check Out</button>
      <h3>{checkoutResult}</h3>
    </section>
  );
}

export default Checkout;
