import React, { useEffect, useState } from "react";
import { filters } from "../../../Data/data";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoggedInSeller
} from "../../../features/Auth/authSlice";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  createProductAsync,
  fetchProductByIdAsync,
  selectAllCategories,
  selectProductById,
  updateProductAsync,
} from "../../../features/product/productListSlice";
import { data } from "autoprefixer";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";
import { selectLoggedInUserInfo } from "../../../features/user/userSlice";
import ProductHighlightForm from "./ProductHighlightForm";
import ProductFormFeatures from "./ProductFormFeatures";
import ImageUploader from "../../Layout/ImageUploader";

const EditProduct = () => {
  const [imageURL, setImageURL] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [feature1Title, setFeature1Title] = useState("");
  const [feature1Option, setFeature1Option] = useState("");
  const [feature1, setFeature1] = useState([]);
  const [feature2Title, setFeature2Title] = useState("");
  const [feature2Option, setFeature2Option] = useState("");
  const [feature2, setFeature2] = useState([]);
  const [highlightInput, setHighlightInput] = useState('');
  const [highlights, setHighlights] = useState([]);
  const user = useSelector(selectLoggedInUserInfo);
  const seller = useSelector(selectLoggedInSeller);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedProduct = useSelector(selectProductById);
  const categories = useSelector(selectAllCategories);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    }
    console.log(selectedProduct);
  }, [params.id, dispatch, user]);

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

  const handleHighlightChange = (e) => {
    setHighlightInput(e.target.value);
  }

  useEffect(() => {
    if (selectedProduct) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("keywords", selectedProduct.keywords);
      setKeywords(selectedProduct.keywords);
      setValue("price", selectedProduct.price);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("stock", selectedProduct.stock);
      setValue("category", selectedProduct.category);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("brand", selectedProduct.brand);
      setUploadedImages(selectedProduct.images);
      setHighlightInput(selectedProduct.highlights);
      setFeature1Title(selectedProduct.features[0].title);
      setFeature1(selectedProduct.features[0].options);
      setFeature2Title(selectedProduct.features[1].title);
      setFeature2(selectedProduct.features[1].options);

      console.log(selectedProduct);
    }
  }, [selectedProduct]);

  return (
    <>
      {!user && <Navigate to={"/"} replace={true}></Navigate>}
      {!seller && <Navigate to={"/"} replace={true}></Navigate>}
      <div className="h-screen  flex flex-col  items-center ">
        <form
          noValidate
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              e.preventDefault()
            }
           return
          }}
          onSubmit={handleSubmit(async(data) => {
              const product = {
                ...data,
              };
              if (product.description.length < 300 || product.description.length > 500) {
                toast.error("Product Description Should be Between 300 and 500 Words")
                return
              }
              if (keywords.length <= 0) {
                toast.error("Enter Keywords")
                return
              }
              if (uploadedImages.length < 4) {
                toast.error("Please Upload at least 4 images")
                return
              }
              product.id = params.id;
              product.thumbnail = uploadedImages[0];
              product.images = [...uploadedImages];
              product.keywords = keywords;
              product.rating = 0;
              product.seller = seller.id;
              product.features =[{title:feature1Title,options:[...feature1]},{title:feature2Title,options:[...feature2]}]
              product.highlights = highlightInput;
            
             await dispatch(updateProductAsync(product));
             navigate("/sellerOptions/seller-Dashboard/manage-products");
            })}
          className="mt-5 w-3/4 shadow-lg px-5 py-3 bg-white"
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className=" text-4xl font-bold leading-7 text-gray-900 text-center">
                Edit Product
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

                <ProductHighlightForm handleHighlightChange={handleHighlightChange} highlightInput={highlightInput} />


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

                {/* Product Form Features Adder */}
                <ProductFormFeatures feature1Title={feature1Title} feature1={feature1} feature2Title={feature2Title} feature2={feature2} setFeature1Title={setFeature1Title} setFeature2Title={setFeature2Title} setFeature1={setFeature1} setFeature2={setFeature2} feature1Option={feature1Option} setFeature1Option={setFeature1Option} feature2Option={feature2Option} setFeature2Option={setFeature2Option} register={register} />

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
                    <input type="text" {...register("brand", { required: "Brand is Required" })}/>
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
                      {categories.map(
                        (item, index) =>
                            <option key={index} value={item.value}>
                              {item.label}
                            </option>
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
              onClick={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault(); // Prevents the default Enter key behavior
                }
              }}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProduct;