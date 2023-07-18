import React from 'react'
import Cart from '../../features/cart/Cart'
import {
    Link
} from 'react-router-dom'

const CheckoutPage = () => {
    const products = [
        {
            id: 1,
            name: 'Throwback Hip Bag',
            href: '#',
            color: 'Salmon',
            price: '$90.00',
            quantity: 1,
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
            imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.'
        }, {
            id: 2,
            name: 'Medium Stuff Satchel',
            href: '#',
            color: 'Blue',
            price: '$32.00',
            quantity: 1,
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
            imageAlt: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.'
        },

    ]
    return (
        <div className='h-screen w-full flex flex-col '>

            <h1 className="text-5xl font-bold p-3 text-center">Checkout</h1>
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5 justify-between px-5">
                <form action="" className="py-5">
                    <h1 className="font-bold text-3xl py-2 underline mb-1">Personal Information</h1>
                    <div className="grid grid-cols-2 gap-3 justify-between">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="">Full Name</label>
                            <input className='px-3 py-3' type="text" required/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="">Email</label>
                            <input className='px-3 py-3' type="email" required/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="">Phone</label>
                            <input className='px-3 py-3' type="text" required/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="">State</label>
                            <input className='px-3 py-3' type="text" required/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="">City</label>
                            <input className='px-3 py-3' type="text" required/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="">Zip Code</label>
                            <input className='px-3 py-3' type="text" required/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="">Street</label>
                            <input className='px-3 py-3' type="text" required/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="">House Number</label>
                            <input className='px-3 py-3' type="text" required/>
                        </div>


                    </div>
                    <div className="flex flex-col gap-2 w-full mt-4">
                        <label htmlFor="">Message
                        </label>
                        <textarea style={
                                {
                                    resize: 'none'
                                }
                            }
                            rows='5'
                            className='px-3 py-3'
                            type="text"
                            required/>
                    </div>

                    <button className='px-3 py-2 bg-red-700 text-white font-bold mt-5 rounded-md shadow-sm' type="reset">Reset</button>
                </form>


                <section> {/* Order Summary */}

                    <div className="shadow-lg flex flex-col gap-2 w-full h-fit p-5">
                        <h3 className="text-center text-2xl font-bold">Order Summary</h3>
                        {/* Cart Page for checkout */}
                        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                            <h1 className="text-center font-bold text-2xl p-2">
                                Cart</h1>
                            <div className="mt-8 p-10">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {
                                        products.map((product) => (
                                            <li key={
                                                    product.id
                                                }
                                                className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img src={
                                                            product.imageSrc
                                                        }
                                                        alt={
                                                            product.imageAlt
                                                        }
                                                        className="h-full w-full object-cover object-center"/>
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href={
                                                                    product.href
                                                                }>
                                                                    {
                                                                    product.name
                                                                }</a>
                                                            </h3>
                                                            <p className="ml-4">
                                                                {
                                                                product.price
                                                            }</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">
                                                            {
                                                            product.color
                                                        }</p>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-gray-500">Qty</p>
                                                            <select name="" id="">
                                                                <option value="1">1</option>
                                                                <option value="1">2</option>
                                                                <option value="1">3</option>
                                                            </select>
                                                        </div>


                                                        <div className="flex">
                                                            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    } </ul>
                                </div>
                            </div>


                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>$262.00</p>
                                </div>

                                <div className="mt-6">
                                    <Link to={'/checkout'}
                                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                                        Pay Now
                                    </Link>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        or
                                        <button type="button" className="font-medium text-purple-600 hover:text-purple-500"
                                            onClick={
                                                () => setOpen(false)
                                        }>
                                            <Link to={'/'}
                                                className='p-2'>Continue Shopping</Link>
                                            <span aria-hidden="true">
                                                &rarr;</span>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </div>
        </div>
    )
}

export default CheckoutPage