import React, { useEffect, useState } from "react";
import { BiCartAdd } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";

import toast, { Toaster } from "react-hot-toast";

import { Fragment } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { StarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

import { useDispatch, useSelector } from "react-redux";

import {
  deleteProductAsync,
  fetchAllProductsAsync,
  fetchBrandsAsync,
  fetchCategoryAsync,
  fetchProductBySellerIdAsync,
  fetchProductsByFilterAsync,
  selectAllBrands,
  selectAllCategories,
  selectAllProducts,
  sellerProducts,
} from "../../../features/product/productListSlice";

import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../Layout/Pagination";
import { sortOptions } from "../../../Data/data";
import {
  fetchAllBrands,
  fetchProductBySellerId,
} from "../../../features/product/productListApi";
import { selectLoggedInSeller } from "../../../features/Auth/authSlice";
import { selectLoggedInUserInfo } from "../../../features/user/userSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductPage = () => {
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const dispatch = useDispatch();

  const user = useSelector(selectLoggedInUserInfo);
  const seller = useSelector(selectLoggedInSeller);
  const brands = useSelector(selectAllBrands);
  const categories = useSelector(selectAllCategories);
  const products = useSelector(sellerProducts);
  const navigate = useNavigate();

  const handleFilters = (e, option, section) => {
    const userFilter = { ...filter };
    if (e.target.checked) {
      if (userFilter[section.id]) {
        userFilter[section.id].push(option.value);
        // setPage(1);
      } else {
        userFilter[section.id] = [option.value];
        // dispatch(fetchProductsByFilterAsync({ filter, sort }))
      }
    } else {
      // If not checked then remove from the filter list
      const index = userFilter[section.id].findIndex(
        (ex) => ex === option.value
      );
      userFilter[section.id].splice(index, 1);
    }

    setFilter(userFilter);
    setPage(1);
  };

  const handleSort = (e, option) => {
    const userSort = { _sort: option.sort, _order: option.order };
    setSort(userSort);
    // console.log(option)
  };

  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
  ];

  const handlePage = (page) => {
    setPage(page);
  };

  const handleDeleteProduct = async (id) => {
    await dispatch(deleteProductAsync(id));
    await dispatch(fetchProductBySellerIdAsync(seller.id));
  };

  useEffect(() => {
    dispatch(fetchProductsByFilterAsync({ filter, sort, page }));
  }, [dispatch, filter, sort, page]);

  // useEffect(() => {
  //   setPage(1);
  // }, [products, sort]);

  useEffect(() => {
    if (seller) {
      dispatch(fetchProductBySellerIdAsync(seller.id));
    }

    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoryAsync());
  }, [sort, dispatch]);

  return (
    <div className="">
      <div className="bg-white">
        <Toaster />
        <div>
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end">
              <Link
                className="px-3 py-2 cursor-pointer bg-green-700 text-white font-bold"
                to={"add-product"}
              >
                Add Product
              </Link>
            </div>
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Your Products
              </h1>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="">
                <div className="lg:col-span-3 flex flex-col items-center justify-center">
                  <Toaster />
                  <h3 className="text-4xl font-bold text-center">
                    All Products
                  </h3>

                  <ProductGrid
                    products={products}
                    page={page}
                    filters={filters}
                    handleDeleteProduct={handleDeleteProduct}
                  />
                  <Pagination
                    page={Math.ceil(page)}
                    setPage={setPage}
                    totalPage={Math.floor(products.length)}
                  />
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

function ProductGrid({ products, page, filters, handleDeleteProduct }) {
  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4  gap-2">
      {products?.slice(page * 12 - 12, page * 12).map((item, index) => (
        <div
          key={index}
          className="relative flex flex-col gap-2 lg:items-stretch  justify-between px-3 py-4 lg:w-72 shadow-lg"
        >
          <Link
            to={`/products/${item.id}`}
            className="flex items-center justify-center"
          >
            <img
              className="object-cover place-content-center h-56 max-h-60"
              src={`http://localhost:8080/uploads/${item.thumbnail}`}
              alt={item.thumbnail}
            />
          </Link>
          <p className=" bg-red-600 px-3 py-2 capitalize w-fit text-white ">
            {item.category}
          </p>
          <div className="">
            <h2 className=" text-xl text-purple-700 ">{item.title}</h2>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <StarIcon className="w-6 h-6" />
            <p className="text-gray-600 italic">
              {item.rating > 0 ? item.rating / item.totalRatings : 0}
            </p>
          </div>
          <div className="flex flex-row justify-between items-center">
            {item.discountPercentage ? (
              <>
                <del className="text-lg italic text-purple-700">
                  NRS {item.price}
                </del>
                <p className="text-lg italic font-bold text-red-700">
                  NRS{" "}
                  {Math.round(item.price * (1 - item.discountPercentage / 100))}
                </p>
              </>
            ) : (
              <p className="text-lg italic  text-purple-700">
                NRS {item.price}
              </p>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-3 justify-center items-center">
            <Link
              to={`edit-product/${item.id}`}
              className="relative w-full text-center bg-purple-800 text-white px-3 py-2 rounded-full"
            >
              Edit
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log(item.id);
                handleDeleteProduct(item.id);
              }}
              className="relative w-full text-center bg-red-700 text-white px-3 py-2 rounded-full"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductPage;
