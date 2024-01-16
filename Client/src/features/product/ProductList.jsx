import React, { useEffect, useState, useTransition } from 'react'

import { BiCartAdd } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { GoHeartFill } from "react-icons/go";

import toast, { Toaster } from 'react-hot-toast';
import { Fragment } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { StarIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import Pagination from '../../Components/Layout/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductsAsync, fetchBrandsAsync, fetchCategoryAsync, fetchProductBySellerIdAsync, fetchProductsByFilterAsync, selectAllBrands, selectAllCategories, selectAllProducts } from './productListSlice';
import {  sortOptions } from '../../Data/data';
import { Link } from 'react-router-dom';
import { selectLoggedInSeller, selectLoggedInUserToken } from '../Auth/authSlice';
import { selectLoggedInUserInfo } from '../user/userSlice';
import { addToWishlistAsync, fetchUserWishlistAsync, selectUserWishList } from '../WishList/wishlistSlice';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export const ProductList = () => {
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const dispatch = useDispatch()
  const loggedInUser = useSelector(selectLoggedInUserInfo)
  const loggedInSeller = useSelector(selectLoggedInSeller);
  const brands = useSelector(selectAllBrands);
  const categories = useSelector(selectAllCategories);
  const products = useSelector(selectAllProducts);
  const wishlist = useSelector(selectUserWishList);
  const userToken = useSelector(selectLoggedInUserToken);



  const handleFilters = (e, option, section) => {
    const userFilter = { ...filter}
    if (e.target.checked) {
      if (userFilter[section.id]) {
        userFilter[section.id].push(option.value);
        setPage(1);
      }
      else {
        userFilter[section.id] = [option.value];
      }
    }
    else {
      // If not checked then remove from the filter list
      const index = userFilter[section.id].findIndex(ex => ex===option.value);
      userFilter[section.id].splice(index, 1);
    }
    // console.log("MyFilter",userFilter)
    setFilter(userFilter);
    setPage(1);
  }

  const handleAddToWishlist = (id) => {
    console.log(wishlist)
    const isIteminWishlist = wishlist.some((item,index) => item.product.id === id);
    if (!userToken) {
      toast.error("Login to Proceed");
      return
    }
    if (isIteminWishlist){
      toast.success("Product Already in Wishlist");
      return;
    }

    dispatch(addToWishlistAsync(id));
  }

  const handleSort = (e, option) => {
    const userSort={ _sort: option.sort,_order:option.order }
    setSort(userSort);
    // console.log(option)
  }

  const filters = [
    {
      id: 'category',
      name: 'Category',
      options: categories
    },
  ]



  useEffect(() => {
    dispatch(fetchProductsByFilterAsync({ filter, sort }))
    // dispatch(fetchAllProductsAsync());
    if (loggedInSeller) {
      dispatch(fetchProductBySellerIdAsync(loggedInSeller.id))
    }

    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoryAsync());
    dispatch(fetchUserWishlistAsync())
  }, [wishlist]);

  return (
    <div className=''>
         <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
          <MobileFilter setMobileFiltersOpen={setMobileFiltersOpen} handleFilters={handleFilters} Fragment={Fragment} mobileFiltersOpen={mobileFiltersOpen}
          filters={filters}
          />

        <main id='ProductList' className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions?.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              onClick={(e)=>handleSort(e,option)}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}

                <DesktopFilter filters={filters} open={open} handleFilters={handleFilters} />                     
              {/* Product grid */}
                <div className="lg:col-span-3">
                <Toaster />
        <h3 id='latestProduct' className="text-4xl font-bold text-center">Latest Products</h3>

                  <ProductGrid products={products} page={page} filters={filters} wishlist={wishlist} handleAddToWishlist={handleAddToWishlist} />
          <Pagination page={Math.ceil(page) } setPage={setPage} totalPage={Math.floor(products?.length)} />
                
                
                </div>
            </div>
          </section>
        </main>
      </div>
    </div>
    </div>
  )
}

function MobileFilter({mobileFiltersOpen,Fragment,setMobileFiltersOpen,handleFilters,filters}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
      <Transition.Child
        as={Fragment}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>

      <div className="fixed inset-0 z-40 flex">
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4 border-t border-gray-200">
              <h3 className="sr-only">Categories</h3>


              {filters?.map((section) => (
                <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-mx-2 -my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <PlusIcon className="h-5 w-5" aria-hidden="true" />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-6">
                          {section.options?.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                defaultChecked={option.checked}
                                onChange={(e)=>handleFilters(e,option,section)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-500"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition.Root>
  )
}

function ProductGrid({products,page,filters,wishlist,handleAddToWishlist}) {
  return (
    <div className="grid grid-cols-2 justify-center lg:grid-cols-3 gap-3">
    {
        products?.slice(page*12-12,page*12)?.map((item, index) => (
          <div key={index} className="relative flex flex-col gap-2 lg:items-stretch  justify-between px-3 py-4 lg:w-72 shadow-lg">
          <Link to={`/products/${item.id}`} className="flex items-center justify-center">
              <img className='object-cover place-content-center h-56 max-h-60' src={`http://localhost:8080/uploads/${ item.thumbnail}`} alt={ item.thumbnail} />
            </Link>
            <p className=' bg-red-600 px-3 py-2 w-fit text-white '>{item.category}</p>
            {
            
              wishlist.map((items, ind) => { return items.product.id == item.id }) && (
                <>
                  
                  <AiOutlineHeart className='absolute top-0 right-1  fill-red-600 cursor-pointer w-8 h-8 text-red-500' onClick={()=>{
                  handleAddToWishlist(item.id)
            }} />
                </>
               
              )
            }

            
          <div className="">
                    <h2 className=" text-xl text-purple-700 ">{item.title }</h2>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <StarIcon className='w-6 h-6'/>
              <p className="text-gray-600 italic">{item.rating }</p>
            </div>
            <div className="flex flex-row justify-between items-center">
              {item.discountPercentage ? (
                <>
                   <del className="text-lg italic text-purple-700">NRS {item.price}</del>
                 <p className="text-lg italic font-bold text-red-700">NRS {Math.round(item.price*(1-item.discountPercentage/100)) }</p>
                </>
                
              ) : <p className="text-lg italic  text-purple-700">NRS {item.price }</p>}
             
          </div>

            {/* 
            
            
            
            */}
            {/* <div className="flex justify-center items-center"> */}
            {/* <Link to={`/products/${item.id}`} className="flex items-center justify-center"></Link> */}
            
              {/* { */}
                {/* item.stock > 0 ? */}
                 
                    {/* <> */}
                    {/* <button  className="relative w-full bg-purple-800 text-white px-3 py-2 rounded-full">Add to Cart</button> */}
                          {/* <BiCartAdd className='absolute right-10 lg:right-14 text-white w-5 h-5 lg:w-7 lg:h-8'/> */}
                    {/* </> */}
                  
                {/* : <p className='text-red-600 font-bold'>Out Of Stock</p> */}
             {/* } */}

            
                    
          {/* </div> */}
      </div>
        ))
    }

</div>
  )
}

function DesktopFilter({filters,open,handleFilters}) {
  return (
    <form className="hidden lg:block">
    <h3 className="sr-only">Categories</h3>

    {filters?.map((section) => (
      <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-900">{section.name}</span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
            </h3>
            <Disclosure.Panel className="pt-6">
              <div className="space-y-4">
        
                {section.options?.map((option, optionIdx) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      id={`filter-${section.id}-${optionIdx}`}
                      name={`${section.id}[]`}
                      defaultValue={option.value}
                      type="checkbox"
                      defaultChecked={option.checked}
                      onChange={(e)=>handleFilters(e,option,section)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`filter-${section.id}-${optionIdx}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    ))}
  </form>
  )
}
export default ProductList
