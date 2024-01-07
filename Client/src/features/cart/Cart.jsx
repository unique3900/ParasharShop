import {
    Fragment,
    useEffect,
    useState,
} from 'react'
import {
    Dialog,
    Transition
} from '@headlessui/react'
import {
    XMarkIcon
} from '@heroicons/react/24/outline'
import {
    Link,
    Navigate
} from 'react-router-dom'
import {
    useDispatch,
    useSelector
} from 'react-redux'
import {
    getCartByEmailAsync,
    removeFromCartAsync,
    selectcartItems,
    updateCartAsync
} from './cartSlice';
import { discountedPrice } from '../../app/constants'
import { selectLoggedInUserInfo } from '../user/userSlice'
import { selectLoggedInUserToken } from '../Auth/authSlice'

export default function Cart() {
    const [open, setOpen] = useState(true);
   
    const items = useSelector(selectcartItems);
    const user = useSelector(selectLoggedInUserInfo);
    const userToken=useSelector(selectLoggedInUserToken);
    const dispatch = useDispatch();

    const [totalItems, setTotalItems] = useState(1);
    console.log("Cart Page",{items})


    const handleRemove = async(id) => {
        await dispatch(removeFromCartAsync(id));
        await dispatch(getCartByEmailAsync());
    }

    const handleQuantityChange = async(e, value,id) => { // Existing items obj. spread then change its quantity
        console.log("Change",value,id)
       await dispatch(updateCartAsync({
            id,
            quantity: value,
           
        }))
       
    }
    useEffect(() => {
        dispatch(getCartByEmailAsync())
        const totalItems = items?.reduce((accumulator, object) => {
            return object.quantity + accumulator;
        }, 0)
        setTotalItems(totalItems)
    }, [])
    
    return (
        <> {
            totalItems<=0 && <Navigate to={'/'} ></Navigate> 
        }
            
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>

                <h1 className="text-center font-bold text-4xl p-2">Your Cart</h1>
                <p className="text-center text-purple-700 font-bold">Total {totalItems}
                    &nbsp; items in Cart</p>
                <div className="mt-8 p-10">
                    <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {
                               items && items.map((data,index) => (
                                <li key={
                                        index
                                    }
                                        className="flex py-6">
                                     
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img

                                                src={
                                                `http://localhost:8080/uploads/${data.product.thumbnail}`
                                            }
                                            alt={
                                                data.product.title
                                            }
                                            className="h-full w-full object-cover object-center"/>
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <a href={
                                                        data.product.id
                                                    }>
                                                        {
                                                        data.product.title
                                                    }</a>
                                                </h3>
                                                <p className="ml-4">
                                                    NPR &nbsp; {
                                                   discountedPrice(data.product) * data.quantity 
                                                } </p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {
                                                data.product.color
                                            }</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <p className="text-gray-500">Qty</p>
                                                <select name=""
                                                    onChange={
                                                        (e) => {
                                                            handleQuantityChange(e,e.target.value,data.id);
                                                        }
                                                    }
                                                        defaultValue={data.quantity}
                                                    id=""
                                                    >
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </select>
                                            </div>


                                            <div className="flex">
                                                <button onClick={
                                                        (e) => {
                                                            e.preventDefault();
                                                            handleRemove(data.id);
                                                        }
                                                    }
                                                    type="button"
                                                    className="font-medium text-indigo-600 hover:text-indigo-500">
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
                                console.log("Objecc",object.quantity)
                                return accumulator + discountedPrice(object.product) * object.quantity
                            }, 0)
                        }</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Terms and Condions Applied</p>
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