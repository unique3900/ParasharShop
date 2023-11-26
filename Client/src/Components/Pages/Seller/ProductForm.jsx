import React, { useState } from "react";
import { filters } from "../../../Data/data";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoggedInSeller,
  selectLoggedInUser,
} from "../../../features/Auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { createProductAsync } from "../../../features/product/productListSlice";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

import axios from "axios";
import toast from "react-hot-toast";
import ImageUploader from "../../Layout/ImageUploader";

const ProductForm = () => {
  const user = useSelector(selectLoggedInUser);
  const seller = useSelector(selectLoggedInSeller);
  const [imageURL, setImageURL] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addImageByUrl = async () => {
    if (uploadedImages.length < 4) {
      const { data } = await axios.post(
        "http://localhost:8080/upload/upload-link",
        { imageURL }
      );
      setUploadedImages((prev) => {
        return [...prev, data.newName];
      });
    } else {
      toast.error("Maximum 4 Uploads Allowed");
    }
  };

  const addLocalImage = async (e) => {
    e.preventDefault();
    if (uploadedImages.length < 4) {
      const files = e.target.files;
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append("photos", files[i]);
      }

      await axios
        .post("http://localhost:8080/upload", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          const { data } = response;
          setUploadedImages((prev) => [...prev, data.uploadedFiles[0]]);
        });
    } else {
      toast.error("Maximum 4 Uploads Allowed");
    }
  };
  const handleImageDelete = (id) => {
    setUploadedImages(uploadedImages.filter((item, index) => index !== id));
  };
  return (
    <>
      {!user && <Navigate to={"/"} replace={true}></Navigate>}
      {!seller && <Navigate to={"/"} replace={true}></Navigate>}
      <div className="h-screen   flex flex-col  items-center ">
        <form
          noValidate
          onSubmit={handleSubmit((data) => {
            const product = {
              ...data,
            };
            if (keywords.length <= 0) {
              toast.error("Enter Keywords")
              return
            }
            if (uploadedImages.length < 4) {
              toast.error("Please Upload at least 4 images")
              return
            }
            product.thumbnail = uploadedImages[0];
            product.images = [...uploadedImages];
            product.keywords = keywords;
            product.rating = 0;
            product.seller = seller.id;
            console.log(product);
            dispatch(createProductAsync(product));
            navigate("/sellerOptions/seller-Dashboard");
          })}
          className="mt-5 w-3/4 shadow-lg px-5 py-3 bg-white"
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className=" text-4xl font-bold leading-7 text-gray-900 text-center">
                New Product
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-600 text-center">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Product Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        {...register("title", {
                          required: "Title is Required",
                        })}
                        id="title"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Product Title Here"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Product Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      {...register("description", {
                        required: "Description is Required",
                      })}
                      rows="3"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></textarea>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about Product.
                  </p>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Product Keywords
                  </label>
                  <div className="mt-2 relative">
                    <input
                      type="text"
                      value={keyword}
                      onChange={(e) => {
                        setKeyword(e.target.value);
                        console.log(keyword);
                      }}
                      onKeyDown={(e) => {
                        if (e.key == "Enter") {
                          if (keywords.length < 10) {
                            setKeywords([...keywords, keyword]);
                          setKeyword("");
                          } else {
                            toast.error("Maximum 10 Keywords Allowed")
                          }
                        }
                      }}
                      rows="3"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <FaCheckCircle
                      size={20}
                      className="absolute right-7 top-2 cursor-pointer text-green-700"
                      onClick={() => {
                        if (keywords.length < 10) {
                          setKeywords([...keywords, keyword]);
                          setKeyword("");
                        } else {
                          toast.error("Maximum 10 Keywords Allowed")
                        }
                        
                      }}
                    />
                  </div>
                  {keywords.length <= 0 ? (
                    <p className="bg-[#b13333] text-white w-fit  font-bold mt-4 py-1 px-3">
                      Enter Some Keywords
                    </p>
                  ) : (
                    <div className="flex flex-row flex-wrap  gap-2 items-center mt-3">
                      {keywords.map((item, index) => (
                        <p
                          className="bg-[#7b2883] font-bold text-center px-3 py-2 text-white flex items-center justify-between"
                          key={index}
                        >
                          {item}{" "}
                          <span
                            className=""
                            onClick={() => {
                              setKeyword(keywords.splice(index, 1));
                            }}
                          >
                            <IoIosClose
                              className="text-white cursor-pointer text-2xl font-bold"
                              size={28}
                            />
                          </span>
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Product Price
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="number"
                        {...register("price", {
                          required: "Price is Required",
                          max: 100000,
                          min: 1,
                        })}
                        id="price"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Product Price Here"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Discount Percentage
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        defaultValue={0}
                        type="number"
                        {...register("discountPercentage", {
                          required: "Discount is Required(0%-100%)",
                          max: 100,
                          min: 0,
                        })}
                        id="discountPercentage"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Product Discount Here"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Product Stock
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="number"
                        {...register("stock", {
                          required: "Stock is Required",
                          min: 1,
                        })}
                        id="stock"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Product Stock Here"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Images
                  </label>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Note: Your First Image Acts as Thumbnail
                  </p>

                  <ImageUploader
                    addImageByUrl={addImageByUrl}
                    handleImageDelete={handleImageDelete}
                    imageURL={imageURL}
                    setImageURL={setImageURL}
                    uploadedImages={uploadedImages}
                    addLocalImage={addLocalImage}
                  />
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Brand
                  </label>
                  <div className="mt-2">
                    <select
                      id="brand"
                      {...register("brand", { required: "Brand is Required" })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="">--Select Brand--</option>
                      {filters.map(
                        (item, index) =>
                          item.name == "Brands" &&
                          item.options.map((brand, index) => (
                            <option key={index} value={brand.value}>
                              {brand.label}
                            </option>
                          ))
                      )}{" "}
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Category
                  </label>
                  <div className="mt-2">
                    <select
                      id="category"
                      {...register("category", {
                        required: "Category is Required",
                      })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="">--Select Category--</option>
                      {filters.map(
                        (item, index) =>
                          item.name == "Category" &&
                          item.options.map((cat, index) => (
                            <option key={index} value={cat.value}>
                              {cat.label}
                            </option>
                          ))
                      )}{" "}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="reset"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductForm;
