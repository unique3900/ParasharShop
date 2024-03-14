import React, { useEffect, useState } from "react";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast'

import { orderByCardAsync, selectCurrentOrder } from "../../features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";

const CardPayment = ({totalAmount,totalItems,products,selectedPaymentMethod,selectedDeliveryAddress}) => {
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentOrder  = useSelector(selectCurrentOrder);

  const getToken = async () => {
    try {
      const { data } = await axios.get("/orders/braintree/token");
      setClientToken(data?.response.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrder = async() => {
    try {
      if (!selectedDeliveryAddress || !selectedPaymentMethod) {
        toast.error("Please Select All Required Fields");
      } else {
        console.log("Sellecttttt", selectedDeliveryAddress.user);
        const { nonce } = await instance?.requestPaymentMethod();
        const order = {
          products,
          nonce,
          selectedPaymentMethod:'online',
          selectedDeliveryAddress,
          totalItems,
          totalAmount,
        }

        await dispatch(orderByCardAsync(order));
        navigate(`/order-success/${currentOrder?.length}`);
      }
    } catch (error) {
      console.log(error)
    }
    
  }

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div className="w-full ">
      <Toaster/>
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
      <button onClick={handleOrder} className="bg-purple-600 w-full rounded-md px-8 py-3 text-white text-center cursor-pointer">
        Place Order
      </button>
        
        
        </>
      )}

    </div>
  );
};

export default CardPayment;
