import React, {
    useEffect,
    useState
} from 'react'
import {
    useDispatch,
    useSelector
} from 'react-redux';
import {
    citiesData
} from '../../Data/data'
import {
    fetchLoggedInUserInfoAsync,
    fetchLoggedInUserOrdersAsync,
    selectLoggedInUserInfo,
    selectLoggedInUserOrders,
    updateuserInfoAsync
} from '../../features/user/userSlice';
import { selectLoggedInUserToken, updateUserAsync
} from '../../features/Auth/authSlice';
import {
    Link,
    Navigate
} from 'react-router-dom';
import { deleteUserAddressAsync, fetchUserAddressAsync, selectUserAddress, updateUserAddressAsync } from '../../features/Addresses/addressSlice';

const UserProfilePage = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUserInfo);
    const userToken=useSelector(selectLoggedInUserToken)
    const orders = useSelector(selectLoggedInUserOrders);
    const addresses = useSelector(selectUserAddress);


    const [editOption, setEditOption] = useState(false)
    const [editId,setEditId]=useState("")
    const [selectedState, setSelectedState] = useState("");
    const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cash');
    const [selectedCity, setselectedCity] = useState("")
    const [selectedLocation, setSelectedLocation] = useState("")
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


    const validateEmail = (email) => {
        const emailRegEx = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
        if (! emailRegEx.test(email)) {
            setEmailRegErr(true)
        } else {
            setEmailRegErr(false);
        }
    }

    const validateName = (name) => {
        const fullNameRegEx = /^(?:([a-zA-Z]{2,4}\.){0,1} ?([a-zA-Z]{2,24})) ([a-zA-Z]{1,1}\. ){0,1}([a-zA-Z]{2,24} ){0,2}([A-Za-z']{2,24})((?:, ([a-zA-Z]{2,5}\.?)){0,4}?)$/im
        if (! fullNameRegEx.test(name)) {
            setFullNameRegErr(true)
        } else {
            setFullNameRegErr(false);
        }
    }

    const validatePhone = (phone) => {
        const nepalPhoneRegEx = /(?:[0-9]{10})/g
        if (! nepalPhoneRegEx.test(phone)) {
            setPhoneRegerr(true)
        } else {
            setPhoneRegerr(false);
        }
    }

    const handleDelete = async(e, id) => {
        console.log(id)
        await dispatch(deleteUserAddressAsync(id));
        await dispatch(fetchUserAddressAsync());
    }

    const editBtnHandler = (id) => {
        console.log(editOption)
        setFullName(fullName);
        setEmail(email);
        setPhone(phone);
        setselectedCity(selectedCity);
        setSelectedState(selectedState);
        setSelectedLocation(selectedLocation);
        setStreet(street);
        setHouseNumber(houseNumber);
        setMessage(message);
    }

    const handleedit = async() => {
        if (!fullName || !email || !phone || !selectedState || !selectedCity || !selectedLocation || !street) {
            setErr(true);
        }
        else {
            const data = {
                id:editId,
                fullName,
                email,
                phone,
                selectedState,
                selectedCity,
                selectedLocation,
                street,
                houseNumber,
                message
            };
            console.log(data)
            await dispatch(updateUserAddressAsync(data));
            await dispatch(fetchUserAddressAsync());
            setEditOption(false)
            setFullName(""); setEmail(""); setPhone(""); setSelectedState(""); setSelectedLocation(""); setselectedCity("");setMessage("")
        }
    }


    const handleSubmit = (e) => {
        if (!fullName || !email || !phone || !selectedState || !selectedCity || !selectedLocation || !street) {
            setErr(true);
        } else {
            const data = {
                fullName,
                email,
                phone,
                selectedState,
                selectedCity,
                selectedLocation,
                street,
                houseNumber,
                message
            };
            
            dispatch(updateUserAsync({
                ...user,
                addresses: [
                    ...user.addresses,
                    data
                ]
            }));

            setEmail(""); setFullName(""); setHouseNumber(""); setMessage(""); setPhone(""); setStreet("");

        }
    }

    const fetchAddress = async () => {
        await dispatch(fetchUserAddressAsync())
        await dispatch(fetchLoggedInUserInfoAsync());
    }
    useEffect(() => {
        dispatch(fetchUserAddressAsync())
        dispatch(fetchLoggedInUserInfoAsync());
    }, [dispatch])
    
    return (
        <>
            {
            ! userToken && <Navigate to={'/login'}
                replace={true}></Navigate>
        }

            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-5'>
                <h3 className="text-4xl font-bold text-center">Your Profile</h3>
                <div className=" mt-8 p-10">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-col gap-2">
                            <h1 className="font-bold text-indigo-700 text-4xl">Name: {
                                user.fullName
                            }</h1>
                            <h2 className="font-bold italic">Email: {
                                user.email
                            }</h2>
                        </div>
                        <div className="">
                            <p className="text-gray-500 text-sm italic"><span className="font-bold text-red-500">Note:</span> New Address can be added from checkout page</p>
                        </div>
                        <div className="">
                            <Link to={'/change-password'} className='px-3 py-2 bg-indigo-700 text-white rounded-md cursor-pointer'>Change Password</Link>
                        </div>
                    </div>

                    <p className="mt-4 font-bold underline">Saved Addresses</p>
                   
                        <div className="flex flex-col gap-5">
                            {
                            addresses?.map((item, index) => (

                                <div key={index} className='w-full flex flex-col lg:flex-row justify-start lg:justify-between bg-yellow-100 shadow-lg gap-3 lg:items-center p-5'>
                                    <div className="w-full  flex flex-col  gap-2 "
                                        key={index}>
                                        <label className='font-bold' htmlFor="">AddressLine {index}</label>
                                        <p className="">Address: {
                                            item?.selectedState
                                        }&nbsp; {
                                            item?.selectedCity
                                        }&nbsp; {
                                            item?.selectedLocation
                                        } </p>
                                        <p className="">Street/House No. : {
                                            item?.street
                                        }&nbsp; {
                                            item?.houseNumber ? item?.houseNumber : ""
                                        }</p>
                                        <p className="">Message:{
                                            item?.message ? item?.message : ""
                                        }</p>
                                        <p className="">Receiver: {
                                            item?.fullName
                                        }({
                                            item?.phone + '/' + item?.email
                                        })</p>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <button onClick={
                                                (e) => {
                                                    e.preventDefault();
                                                    
                                                    setEditOption(!editOption);
                                                    setEditId(item.id)
                                                    setEmail(item.email)
                                                    setFullName(item.fullName)
                                                    setPhone(item.phone)
                                                    setSelectedLocation(item.selectedLocation)
                                                    setHouseNumber(item.houseNumber)
                                                    setStreet(item.street)
                                                    setMessage(item.message)
                                                    setSelectedState(item.selectedState)
                                                }
                                            }
                                            className='px-3 py-2 bg-green-600 text-white font-bold rounded-full w-full'>Edit</button>
                                        <button onClick={
                                                (e) => {
                                                    handleDelete(e, item.id)
                                                }
                                            }
                                            className='px-3 py-2 bg-red-600 text-white font-bold rounded-full w-full'>Delete</button>
                                    </div>
                                </div>

                            ))
                        }
                            {
                            editOption && (
                                <form noValidate={true} action="#" onSubmit={(e) => {
                                    e.preventDefault()
                                    handleedit()
                                }} className="py-5">
                                    <h1 className="font-bold text-3xl py-2 underline mb-1">Edit Address Information</h1>
                                    <div className="grid grid-cols-2 gap-3 justify-between">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="">Full Name</label>
                                            <input value={fullName}
                                                onChange={
                                                    (e) => {
                                                        validateName(e.target.value);
                                                        setFullName(e.target.value)
                                                    }
                                                }
                                                className='px-3 py-3'
                                                type="text"
                                                required/> {
                                            error && !fullName ? (
                                                <p className="italic text-red-500">Full name is Required*</p>
                                            ) : fullNameRegErr ? (
                                                <p className="italic text-red-500">Invalid Name format,Separate by Space*</p>
                                            ) : ""
                                        } </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="">Email</label>
                                            <input value={email}
                                                onChange={
                                                    (e) => {
                                                        validateEmail(e.target.value);
                                                        setEmail(e.target.value)
                                                    }
                                                }
                                                className='px-3 py-3'
                                                type="email"
                                                required/> {
                                            error && !email ? (
                                                <p className="italic text-red-500">Email is Required*</p>
                                            ) : emailregErr ? (
                                                <p className="italic text-red-500">Invalid Email format*</p>
                                            ) : ""
                                        } </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="">Phone</label>
                                            <input value={phone}
                                                onChange={
                                                    (e) => {
                                                        validatePhone(e.target.value);
                                                        setPhone(e.target.value)
                                                    }
                                                }
                                                className='px-3 py-3'
                                                type="text"
                                                required/> {
                                            error && !phone ? (
                                                <p className="italic text-red-500">Phone is Required*</p>
                                            ) : phoneRegErr ? (
                                                <p className="italic text-red-500">Invalid Phone format*</p>
                                            ) : ""
                                        } </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="">State</label>
                                            <select name="" id=""
                                                onClick={
                                                    (e) => {
                                                        setSelectedState(e.target.value)
                                                        console.log(e.target.value)
                                                    }
                                            }>
                                                {
                                                citiesData.map((item) => (

                                                    <option key={
                                                            item.id
                                                        }
                                                        value={
                                                            item.stateName
                                                    }>
                                                        {
                                                        item.stateName
                                                    }</option>


                                                ))
                                            } </select>
                                            {
                                            error && !selectedState ? (
                                                <p className="italic text-red-500">State is Required*</p>
                                            ) : ""
                                        } </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="">City</label>
                                            <select name="" id=""
                                                onClick={
                                                    (e) => {
                                                        setselectedCity(e.target.value)
                                                        console.log(e.target.value)
                                                    }
                                            }>
                                                {
                                                citiesData.map((item) => (item.stateName == selectedState && item.cities.map((city) => (
                                                    <option key={
                                                            city.id
                                                        }
                                                        value={
                                                            city.name
                                                    }>
                                                        {
                                                        city.name
                                                    }</option>
                                                ))))
                                            } </select>
                                            {
                                            error && !selectedCity ? (
                                                <p className="italic text-red-500">City is Required*</p>
                                            ) : ""
                                        } </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="">Delivery Area</label>
                                            <select name="" id=""
                                                onClick={
                                                    (e) => {
                                                        setSelectedLocation(e.target.value)
                                                    }
                                            }>
                                                {
                                                citiesData.map((item) => (item.stateName == selectedState && item.cities.map((city) => (city.name == selectedCity && city.locations.map((loc) => (
                                                    <option key={
                                                            loc.id
                                                        }
                                                        value={
                                                            loc.address
                                                    }>
                                                        {
                                                        loc.address
                                                    }</option>
                                                ))))))
                                            } </select>
                                            {
                                            error && !selectedLocation ? (
                                                <p className="italic text-red-500">Delivery
                                                                       
                                                                       is Required*</p>
                                            ) : ""
                                        } </div>

                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="">Street</label>
                                            <input value={street}
                                                onChange={
                                                    (e) => setStreet(e.target.value)
                                                }
                                                className='px-3 py-3'
                                                type="text"
                                                required/> {
                                            error && !street ? (
                                                <p className="italic text-red-500">Street is Required*</p>
                                            ) : ""
                                        } </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="">House Number</label>
                                            <input value={houseNumber}
                                                onChange={
                                                    (e) => setHouseNumber(e.target.value)
                                                }
                                                className='px-3 py-3'
                                                type="text"
                                                required/>
                                        </div>


                                    </div>
                                    <div className="flex flex-col gap-2 w-full mt-4">
                                        <label htmlFor="">Message
                                        </label>
                                        <textarea value={message}
                                            onChange={
                                                (e) => setMessage(e.target.value)
                                            }
                                            style={
                                                {
                                                    resize: 'none'
                                                }
                                            }
                                            rows='5'
                                            className='px-3 py-3'
                                            type="text"
                                            required/>
                                    </div>


                                    <div className="flex gap-2">
                                                <button onClick={(e) => {
                                                    e.preventDefault();
                                                    setEditOption({})
                                        }} className='px-3 py-2 text-black font-bold mt-5 rounded-md shadow-sm' type="reset">Cancle</button>
                                        <button type="submit" 
                                            className='px-3 py-2 bg-blue-700 text-white font-bold mt-5 rounded-md shadow-sm'
                                            >Edit</button>
                                    </div>

                                </form>

                            )
                        } </div>

                </div>


            </div>
        </>

    )
}

export default UserProfilePage
