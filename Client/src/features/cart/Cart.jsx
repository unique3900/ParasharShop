import {
    Fragment,
    useState
} from 'react'
import {
    Dialog,
    Transition
} from '@headlessui/react'
import {
    XMarkIcon
} from '@heroicons/react/24/outline'
import {
    Link, Navigate
} from 'react-router-dom'
import {
    useSelector
} from 'react-redux'
import {
    selectCartLengtg,
    selectcartItems
} from './cartSlice'

const product = [
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


export default function Cart() {
    const [open, setOpen] = useState(true)
    const items = useSelector(selectcartItems);

    const totalItems = useSelector(selectCartLengtg);
    return (
        <>
            {!items.length&& <Navigate to={'/'}></Navigate>}
                               <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>

                    <h1 className="text-center font-bold text-4xl p-2">Your Cart</h1>
                    <p className="text-center text-purple-700 font-bold">Total {totalItems}
                        items in Cart</p>
                    <div className="mt-8 p-10">
                        <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {
                                items.map((product) => (
                                    <li key={
                                            product.id
                                        }
                                        className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img src={
                                                    product.thumbnail
                                                }
                                                alt={
                                                    product.title
                                                }
                                                className="h-full w-full object-cover object-center"/>
                                        </div>
    
                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <a href={
                                                            product.id
                                                        }>
                                                            {
                                                            product.title
                                                        }</a>
                                                    </h3>
                                                    <p className="ml-4">
                                                        NPR &nbsp; {
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
                            <p>Npr &nbsp; {
                                items.reduce((accumulator, object) => {
                                    return accumulator + object.price
                                }, 0)
                            }</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                            <Link to={'/checkout'}
                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                                Checkout
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
        </>
        
 


    )
}
