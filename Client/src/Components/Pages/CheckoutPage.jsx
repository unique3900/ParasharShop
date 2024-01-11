import React, { useEffect, useState } from "react";
import Cart from "../../features/cart/Cart";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartByEmailAsync,
  removeFromCartAsync,
  resetCartAsync,
  selectcartItems,
  updateCartAsync,
} from "../../features/cart/cartSlice";
import { citiesData } from "../../Data/data";
import { updateUserAsync } from "../../features/Auth/authSlice";
import { newOrder } from "../../features/order/orderApi";
import {
  makeCardPaymentAsync,
  newOrderAsync,
  selectCurrentOrder,
} from "../../features/order/orderSlice";
import {
  selectLoggedInUserInfo,
  selectLoggedInUserOrders,
} from "../../features/user/userSlice";
import { discountedPrice } from "../../app/constants";
import {
  addUserAddressAsync,
  fetchUserAddressAsync,
  selectUserAddress,
} from "../../features/Addresses/addressSlice";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // States
  const [totalItems, setTotalItems] = useState(1);
  // const [totalAmount,setTotalAmount]=useState()
  const [selectedState, setSelectedState] = useState("");
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");
  const [selectedCity, setselectedCity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [message, setMessage] = useState("");

  const [error, setErr] = useState(false);
  const [emailregErr, setEmailRegErr] = useState(false);
  const [phoneRegErr, setPhoneRegerr] = useState(false);
  const [fullNameRegErr, setFullNameRegErr] = useState(false);

  const user = useSelector(selectLoggedInUserInfo);
  const items = useSelector(selectcartItems);
  const addresses = useSelector(selectUserAddress);

  const currentOrder = useSelector(selectLoggedInUserOrders);

  const validateEmail = (email) => {
    const emailRegEx = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
    if (!emailRegEx.test(email)) {
      setEmailRegErr(true);
    } else {
      setEmailRegErr(false);
    }
  };

  const validateName = (name) => {
    const fullNameRegEx =
      /^(?:([a-zA-Z]{2,4}\.){0,1} ?([a-zA-Z]{2,24})) ([a-zA-Z]{1,1}\. ){0,1}([a-zA-Z]{2,24} ){0,2}([A-Za-z']{2,24})((?:, ([a-zA-Z]{2,5}\.?)){0,4}?)$/im;
    if (!fullNameRegEx.test(name)) {
      setFullNameRegErr(true);
    } else {
      setFullNameRegErr(false);
    }
  };

  const validatePhone = (phone) => {
    const nepalPhoneRegEx = /(?:[0-9]{10})/g;
    if (!nepalPhoneRegEx.test(phone)) {
      setPhoneRegerr(true);
    } else {
      setPhoneRegerr(false);
    }
  };

  // const totalItems = items.reduce((accumulator, object) => {
  //     return object.quantity + accumulator;
  // }, 0);

  const totalAmount = items.reduce((accumulator, object) => {
    return accumulator + discountedPrice(object.product) * object.quantity;
  }, 0);

  const handleRemove = async (id) => {
    await dispatch(removeFromCartAsync(id));
  };

  const handleQuantityChange = async (e, value, id) => {
    // Existing items obj. spread then change its quantity
    console.log("Change", value, id);
    await dispatch(
      updateCartAsync({
        id,
        quantity: value,
      })
    );
    // await dispatch(getCartByEmailAsync(user.id));
  };

  const handleDeliveryAddress = async (index) => {
    await setSelectedDeliveryAddress(addresses[index]);
  };

  const handleSubmit = async (e) => {
    if (
      !fullName ||
      !email ||
      !phone ||
      !selectedState ||
      !selectedCity ||
      !selectedLocation ||
      !street
    ) {
      setErr(true);
    } else {
      const data = {
        user: user.id,
        fullName,
        email,
        phone,
        selectedState,
        selectedCity,
        selectedLocation,
        street,
        houseNumber,
        totalAmount,
        message,
      };

      console.log(data)
      await dispatch(addUserAddressAsync(data));
      setEmail("");
      setFullName("");
      setHouseNumber("");
      setMessage("");
      setPhone("");
      setStreet("");
    }
  };

  // //For Delivery Info
  // const handleSubmit = (e) => {
  //     if (!fullName || !email || !phone || !selectedState || !selectedCity || !selectedLocation || !street) {
  //         setErr(true);
  //     } else {
  //         const data = {
  //             fullName,
  //             email,
  //             phone,
  //             selectedState,
  //             selectedCity,
  //             selectedLocation,
  //             street,
  //             houseNumber,
  //             message
  //         };

  //         dispatch(updateUserAsync({
  //             ...user,
  //             addresses: [
  //                 ...user.addresses,
  //                 data
  //             ]
  //         }));

  //         setEmail(""); setFullName(""); setHouseNumber(""); setMessage(""); setPhone(""); setStreet("");

  //     }
  // }

  //For Placing Order
  const handleOrder = async (e) => {
    e.preventDefault();

    if (!selectedDeliveryAddress || !selectedPaymentMethod) {
      alert("Please Select All Required Fields");
    } else {
      console.log("Sellecttttt", selectedDeliveryAddress.user);
      const order = {
        user: user.id,
        products: items,
        selectedPaymentMethod,
        selectedDeliveryAddress: selectedDeliveryAddress.id,
        totalItems,
        totalAmount,
      };
      

      if (selectedPaymentMethod == "cash") {
        navigate(`/order-success/${currentOrder.length}`);
        await dispatch(newOrderAsync(order));
      } else if(selectedPaymentMethod == "card") {
        navigate(`/card-payment`);
        dispatch(makeCardPaymentAsync(order))
      }
      
    }
  };

  useEffect(() => {
    dispatch(fetchUserAddressAsync(user.id));

    const totalItems = items.reduce((accumulator, object) => {
      return object.quantity + accumulator;
    }, 0);
    setTotalItems(totalItems);
  }, [dispatch]);

  return (
    <>
      {" "}
      {!items.length || (!user && <Navigate to={"/"}></Navigate>)}
      <div className="h-screen w-full flex flex-col ">
        <h1 className="text-5xl font-bold p-3 text-center">Checkout</h1>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5 justify-between px-5">
            <form action="" className="py-5">
              <h1 className="font-bold text-3xl py-2 underline mb-1">
                Personal Information
              </h1>
              <div className="grid grid-cols-2 gap-3 justify-between">
                <div className="flex flex-col gap-2">
                  <label htmlFor="">Full Name</label>
                  <input
                    value={fullName}
                    onChange={(e) => {
                      validateName(e.target.value);
                      setFullName(e.target.value);
                    }}
                    className="px-3 py-3"
                    type="text"
                    required
                  />{" "}
                  {error && !fullName ? (
                    <p className="italic text-red-500">
                      Full name is Required*
                    </p>
                  ) : fullNameRegErr ? (
                    <p className="italic text-red-500">
                      Invalid Name format,Separate by Space*
                    </p>
                  ) : (
                    ""
                  )}{" "}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="">Email</label>
                  <input
                    value={email}
                    onChange={(e) => {
                      validateEmail(e.target.value);
                      setEmail(e.target.value);
                    }}
                    className="px-3 py-3"
                    type="email"
                    required
                  />{" "}
                  {error && !email ? (
                    <p className="italic text-red-500">Email is Required*</p>
                  ) : emailregErr ? (
                    <p className="italic text-red-500">Invalid Email format*</p>
                  ) : (
                    ""
                  )}{" "}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="">Phone</label>
                  <input
                    value={phone}
                    onChange={(e) => {
                      validatePhone(e.target.value);
                      setPhone(e.target.value);
                    }}
                    className="px-3 py-3"
                    type="text"
                    required
                  />{" "}
                  {error && !phone ? (
                    <p className="italic text-red-500">Phone is Required*</p>
                  ) : phoneRegErr ? (
                    <p className="italic text-red-500">Invalid Phone format*</p>
                  ) : (
                    ""
                  )}{" "}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="">State</label>
                  <select
                    name=""
                    id=""
                    onClick={(e) => {
                      setSelectedState(e.target.value);
                      console.log(e.target.value);
                    }}
                  >
                    {citiesData.map((item) => (
                      <option key={item.id} value={item.stateName}>
                        {item.stateName}
                      </option>
                    ))}{" "}
                  </select>
                  {error && !selectedState ? (
                    <p className="italic text-red-500">State is Required*</p>
                  ) : (
                    ""
                  )}{" "}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="">City</label>
                  <select
                    name=""
                    id=""
                    onClick={(e) => {
                      setselectedCity(e.target.value);
                      console.log(e.target.value);
                    }}
                  >
                    {citiesData.map(
                      (item) =>
                        item.stateName == selectedState &&
                        item.cities.map((city) => (
                          <option key={city.id} value={city.name}>
                            {city.name}
                          </option>
                        ))
                    )}{" "}
                  </select>
                  {error && !selectedCity ? (
                    <p className="italic text-red-500">City is Required*</p>
                  ) : (
                    ""
                  )}{" "}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="">Delivery Area</label>
                  <select
                    name=""
                    id=""
                    onClick={(e) => {
                      setSelectedLocation(e.target.value);
                    }}
                  >
                    {citiesData.map(
                      (item) =>
                        item.stateName == selectedState &&
                        item.cities.map(
                          (city) =>
                            city.name == selectedCity &&
                            city.locations.map((loc) => (
                              <option key={loc.id} value={loc.address}>
                                {loc.address}
                              </option>
                            ))
                        )
                    )}{" "}
                  </select>
                  {error && !selectedLocation ? (
                    <p className="italic text-red-500">Delivery is Required*</p>
                  ) : (
                    ""
                  )}{" "}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="">Street</label>
                  <input
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="px-3 py-3"
                    type="text"
                    required
                  />{" "}
                  {error && !street ? (
                    <p className="italic text-red-500">Street is Required*</p>
                  ) : (
                    ""
                  )}{" "}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="">House Number</label>
                  <input
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                    className="px-3 py-3"
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full mt-4">
                <label htmlFor="">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    resize: "none",
                  }}
                  rows="5"
                  className="px-3 py-3"
                  type="text"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  className="px-3 py-2 bg-red-700 text-white font-bold mt-5 rounded-md shadow-sm"
                  type="reset"
                >
                  Reset
                </button>
                <button
                  onClick={(e) => {
                    handleSubmit(e);
                    e.preventDefault();
                  }}
                  className="px-3 py-2 bg-blue-700 text-white font-bold mt-5 rounded-md shadow-sm"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>

            <section>
              {" "}
              {/* Order Summary */}
              <div className="shadow-lg flex flex-col gap-2 w-full h-fit p-5">
                <h3 className="text-center text-2xl font-bold">
                  Order Summary
                </h3>
                {/* Cart Page for checkout */}

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <h1 className="text-center font-bold text-4xl p-2">
                    Your Cart
                  </h1>
                  <p className="text-center text-purple-700 font-bold">
                    Total {totalItems}
                    &nbsp; items in Cart
                  </p>
                  <div className="mt-8 p-10">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {items.map((data, index) => (
                          <li key={index} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={`http://localhost:8080/uploads/${data.product.thumbnail}`}
                                alt={data.product.title}
                                className="h-full w-full object-cover object-center"
                              />

                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="w-full  flex justify-center gap-4 text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={data.product.id}>
                                      {data.product.title}
                                    </a>
                                  </h3>
                                  
                                  <p className="ml-4">
                                    NPR &nbsp;{" "}
                                    {discountedPrice(data.product) *
                                      data.quantity}
                                  </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {data.product.color}
                                </p>
                              </div>
                              <div className="flex flex-1 mt-4 gap-4 text-sm">
                              <div className="flex justify-center  gap-2 items-center">
                                    {data.features.map((option, ind) => (
                                                                <p className="capitalize z-10 text-sm">
                                                                <span className="font-bold">{option.title}: </span>
                                                                {option.option}
                                                              </p>
                                    ))}

                      </div>
                              </div>
                              <div className="flex flex-1 mt-4 gap-4 items-end justify-between text-sm">
                                <div className="flex items-center">
                                  <p className="text-gray-500 mr-2">Qty</p>
                                  <select
                                    name=""
                                    onChange={(e) => {
                                      handleQuantityChange(
                                        e,
                                        e.target.value,
                                        data.id
                                      );
                                    }}
                                    id=""
                                    defaultValue={data.quantity}
                                  >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                  </select>
                                </div>

                                <div className="flex">
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleRemove(data.id);
                                    }}
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}{" "}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>Npr &nbsp; {totalAmount}</p>

                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Terms and Conditons Applied
                    </p>
                    <div className="mt-6">
                      <button
                        onClick={(e) => {
                          handleOrder(e);
                          e.preventDefault();
                        }}
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Place Order
                      </button>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or
                        <button
                          type="button"
                          className="font-medium text-purple-600 hover:text-purple-500"
                          onClick={() => setOpen(false)}
                        >
                          <Link to={"/"} className="p-2">
                            Continue Shopping
                          </Link>
                          <span aria-hidden="true">&rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {addresses ? (
              <section className="p-5 flex flex-col gap-2  ">
                <h3 className="font-bold text-xl">Saved Addresses</h3>
                <div className="flex p-7 flex-col gap-2 outline-black border-black">
                  {addresses?.map((item, index) => (
                    <div
                      key={index}
                      className="p-2 flex gap-2 items-center bg-yellow-100"
                    >
                      <input
                        value={index}
                        onClick={() => handleDeliveryAddress(index)}
                        type="radio"
                        name="address"
                        id=""
                      />
                      <div className="flex flex-col gap-2">
                        <label className="font-bold" htmlFor="">
                          AddressLine {index}
                        </label>
                        <p className="">
                          Address: {item?.selectedState}&nbsp;
                          {item?.selectedCity}&nbsp;
                          {item?.selectedLocation}{" "}
                        </p>
                        <p className="">
                          Street/House No. : {item?.street}&nbsp;
                          {item?.houseNumber ? item?.houseNumber : ""}
                        </p>
                        <p className="">
                          Message:{item?.message ? item?.message : ""}
                        </p>
                        <p className="">
                          Receiver: {item?.fullName}(
                          {item?.phone + "/" + item?.email})
                        </p>
                      </div>
                    </div>
                  ))}{" "}
                </div>
              </section>
            ) : (
              <p className="text-lg font-bold text-red-600">No Saved Address</p>
            )}

            <section className="p-5 flex flex-col gap-2 shadow-lg">
              <h3 className="font-bold text-xl">Payment Method</h3>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-2">
                  <input
                    value={"Cash"}
                    defaultChecked
                    onClick={(e) => {
                      setSelectedPaymentMethod(e.target.value);
                      console.log(e.target.value);
                    }}
                    type="radio"
                    name="paymentMethod"
                    id=""
                  />
                  <label htmlFor="" className="font-bold">
                    Cash
                  </label>
                </div>
                <div className="flex flex-row gap-2">
                  <input
                    onClick={(e) => {
                      setSelectedPaymentMethod(e.target.value);
                      console.log(e.target.value);
                    }}
                    value={"card"}
                    type="radio"
                    name="paymentMethod"
                    id=""
                  />
                  <label htmlFor="" className="font-bold">
                    Card
                  </label>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
