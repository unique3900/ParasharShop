import React, { useEffect } from "react";
import { BiCartAdd } from "react-icons/bi";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductByIdAsync, selectProductById } from "./productListSlice";
import {
  addToCartAsync,
  getCartByEmailAsync,
  selectcartItems,
} from "../cart/cartSlice";
import { discountedPrice } from "../../app/constants";
import toast, { Toaster } from "react-hot-toast";
import { getCartByUserEmail } from "../cart/cartAPI";
import { selectLoggedInUserInfo } from "../user/userSlice";
import { selectLoggedInUserToken } from "../Auth/authSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SingleProductPage = () => {
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();

  const params = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProductById);
  const userToken = useSelector(selectLoggedInUserToken);
  const loggedInUser = useSelector(selectLoggedInUserInfo);
  const [feature1, setFeature1] = useState({ title: "", option: "" });
  const [feature2, setFeature2] = useState({ title: "", option: "" });

  const cart = useSelector(selectcartItems);

  const handleCart = async (e) => {
    e.preventDefault();
    if (!userToken) {
      toast.error("Login to Proceed");
    } else {
      const isProductInCart = cart.some(
        (item, index) => item.product.id === product.id
      );
      console.log(isProductInCart, cart, product.id);
      if (isProductInCart) {
        toast.success("This product is already in cart");
        return;
      }
      if (!feature1.title || !feature2.title) {
        toast.error("Please Select Product Features");
      } else {
        const newCartItem = {
          ...product,
          productId: product.id,
          quantity: 1,
          status: "Pending",
          rated:false,
          seller: product.seller,
          features: [feature1, feature2],
        };
        //Fix for duplicate id in the cart
        // delete newCartItem['id'];
        await dispatch(addToCartAsync(newCartItem));
        await dispatch(getCartByEmailAsync());
      }
    }
  };
  useEffect(() => {
    console.log(params.id, loggedInUser.id);
    dispatch(fetchProductByIdAsync(params.id));
  }, []);

  return (
    <div className="bg-white">
      <Toaster />
      {product ? (
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              {product.breadcrumbs &&
                product.breadcrumbs.map((breadcrumb) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center">
                      <a
                        href={breadcrumb.href}
                        className="mr-2 text-sm font-medium text-gray-900"
                      >
                        {breadcrumb.name}{" "}
                      </a>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                ))}
              <li className="text-sm">
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.title}{" "}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={`http://localhost:8080/uploads/${product.images[0]}`}
                alt={product.images[0]}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={`http://localhost:8080/uploads/${product.images[1]}`}
                  alt={product.images[1]}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={`http://localhost:8080/uploads/${product.images[2]}`}
                  alt={product.images[2]}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={`http://localhost:8080/uploads/${product.images[3]}`}
                alt={product.images[3]}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                NPR &nbsp;
                {discountedPrice(product)} /-
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating/product.totalRatings>rating ? "text-gray-900" : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}{" "}
                  </div>
                  <p className="sr-only">
                    {product.rating/product.totalRatings}
                    out of 5 stars
                  </p>
                </div>
              </div>
              {/* Features Selection */}
              <form
                className="mt-10 flex flex-col items-center justify-center gap-4"
                onSubmit={(e) => e.preventDefault()}
              >
                {/* 1. Feature 1 */}
                <div className="w-full border-2 rounded-md border-black/30  px-3 py-2">
                  <h3 className="capitalize">{product.features[0].title}</h3>
                  <div className="mt-5 flex flex-wrap whitespace-nowrap justify-center gap-2 items-center">
                    {product.features[0].options.map((item, index) => (
                      <button
                        key={index}
                        className={`border-2 border-slate-500 capitalize cursor-pointer px-3 py-4 w-32 hover:bg-violet-600 hover:text-white duration-200 ${
                          feature1.option == item
                            ? "bg-violet-600 text-white"
                            : "bg-transparent text-black"
                        }`}
                        value={item}
                        onClick={(e) => {
                          setFeature1({
                            title: product.features[0].title,
                            option: e.target.value,
                          });
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 1. Feature 2 */}
                <div className="w-full border-2 rounded-md border-black/30 px-3 py-2">
                  <h3 className="capitalize">{product.features[1].title}</h3>
                  <div className="mt-5 flex flex-wrap whitespace-nowrap justify-center gap-2 items-center">
                    {product.features[1].options.map((item, index) => (
                      <button
                        key={index}
                        className={`border-2 border-slate-500 cursor-pointer px-3 py-4 w-32 hover:bg-violet-600 hover:text-white duration-200 capitalize ${
                          feature2.option === item
                            ? "bg-violet-600 text-white"
                            : "bg-transparent text-black"
                        }`}
                        value={item}
                        onClick={(e) => {
                          setFeature2({
                            title: product.features[1].title,
                            option: e.target.value,
                          });
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    handleCart(e);
                  }}
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product?.highlights.map((highlight, index) => (
                      <li key={index} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}{" "}
                  </ul>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-2">
                    <h3 className=""> <span className="font-bold">Brand:</span> {product?.brand }</h3>
                    <h3 className=""> <span className="font-bold">Category:</span> {product?.category }</h3>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SingleProductPage;
