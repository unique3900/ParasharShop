import React, { useEffect, useState } from "react";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const CardPayment = () => {
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");

  const getToken = async () => {
    try {
      const { data } = await axios.get("/orders/braintree/token");
      setClientToken(data?.response.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrder = () => {
    
  }

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div className="w-full ">
      {clientToken && (
        <>
              <DropIn
        options={{
          authorization: clientToken,
          paypal: {
            flow: "checkout",
          },
        }}
        onInstance={instance => setInstance(instance)}
      />
      <button onClick={handleOrder} className="bg-indigo-600 px-3 py-2 text-white text-center cursor-pointer">
        Buy
      </button>
        
        
        </>
      )}

    </div>
  );
};

export default CardPayment;
