import React, {
    useEffect,
    useState
} from 'react'
import axios from 'axios';
import {
    ToastBar,
    Toaster,
    toast
} from 'react-hot-toast';
import {
    Link,
    Navigate,
    useNavigate
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUserAsync } from '../authSlice';
import { selectLoggedInUserInfo } from '../../user/userSlice';


const Register = () => {

        

    const data=useSelector(selectLoggedInUserInfo)
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("male");


    const [error, setError] = useState(false);
    const [emailregErr, setEmailRegErr] = useState(false);
    const [pwdRegErr, setPwdRegErr] = useState(false);
    const [phoneRegErr, setPhoneRegerr] = useState(false);
    const [fullNameRegErr, setFullNameRegErr] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user=useSelector(selectLoggedInUser)

    const validateEmail = (email) => {
        const emailRegEx = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi
        if (!emailRegEx.test(email)) {
            setEmailRegErr(true)
        }
        else {
            setEmailRegErr(false);
        }
    }
    const validateName = (name) => {
        const fullNameRegEx=/^(?:([a-zA-Z]{2,4}\.){0,1} ?([a-zA-Z]{2,24})) ([a-zA-Z]{1,1}\. ){0,1}([a-zA-Z]{2,24} ){0,2}([A-Za-z']{2,24})((?:, ([a-zA-Z]{2,5}\.?)){0,4}?)$/im
        if (!fullNameRegEx.test(name)) {
            setFullNameRegErr(true)
        }
        else {
            setFullNameRegErr(false);
        }
    }
    
    const validatePhone = (phone) => {
        const nepalPhoneRegEx = /(?:[0-9]{10})/g
        if (!nepalPhoneRegEx.test(phone)) {
            setPhoneRegerr(true)
        }
        else {
            setPhoneRegerr(false);
        }
    }
    const validatePassword = (password) => {
        const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
        if (!passwordRegEx.test(password)) {
            setPwdRegErr(true)
        }
        else {
            setPwdRegErr(false);
        }
}

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        if (emailregErr || phoneRegErr || pwdRegErr) {
            setError(true)
            return
        }
       
        if (!fullName || !email || !password || !confirmPassword || !address || !phone || !gender) {
            setError(true);
            return
        }
        else {
            dispatch(createUserAsync({email,password,fullName,phone,gender,role:'buyer'}))
            navigate('/');
        }
    }


    return (
        <div className='flex flex-col h-screen justify-center items-center'>
            {user && <Navigate to={'/'} replace={true} />}
            <Toaster/>
            <div className=" grid mt-0 grid-flow-row gap-3 lg:grid-flow-col items-center align-middle lg:grid-cols-2 w-full lg:w-fit   p-6 round-xl shadow-md shadow-slate-400 overflow-x-auto no-scrollbar">
                <div className="hidden lg:flex relative justify-center place-content-center">
                    <img className='lg:w-full lg:h-[500px] h-60'
                        src={'/img/registerpageImg.png'}
                        alt=""/>
                </div>


                <div className="">
                    <h1 className='text-center text-4xl lg:text-6xl py-5 '>Register</h1>

                    <form noValidate onSubmit={handleSubmit}
                        className="form grid grid-flow-row  lg:grid-cols-1   gap-2  mt-5">

                        <div className="inputBox flex flex-col gap-1">
                            <label htmlFor="Name">Full Name:</label>
                            <input type="text" name='name' required className='outline-black border-b-2 px-2 py-2 rounded-md shadow-sm'
                                value={fullName}
                                onChange={
                                    (e) => {
                                        setFullName(e.target.value)
                                        validateName(e.target.value)
                                    }
                                }/>{
                                    error && !fullName ? (
                                        <p className="italic text-red-500">Full name is Required*</p>
                                    ) : fullNameRegErr ? (
                                        <p className="italic text-red-500">Invalid Name format,Separate by Space*</p>
                                    ) : ""
                                } </div>
                        <div className="inputBox flex flex-col gap-1">
                            <label htmlFor="Name">Email:</label>
                            <input formNoValidate value={email}
                                type="text"
                                name='name'
                                
                                className='outline-black border-b-2 px-2 py-2 rounded-md shadow-sm'
                                onChange={
                                    (e) => {
                                        setEmail(e.target.value)
                                        validateEmail(e.target.value)
                                    }
                                }/> {
                            error && !email ? (
                                <p className="italic text-red-500">Email is Required*</p>
                            ) : emailregErr ? (
                                <p className="italic text-red-500">Invalid Email format*</p>
                            ) : ""
                        } </div>
                        <div className="inputBox flex flex-col gap-1">
                            <label htmlFor="Name">Phone:</label>
                            <input value={phone}
                                type="number"
                                name='name'
                                required
                                className='outline-black border-b-2 px-2 py-2 rounded-md shadow-sm'
                                onChange={
                                    (e) => {
                                        setPhone(e.target.value)
                                        validatePhone(e.target.value)
                                    }
                                }/> {
                                    error && !phone?(
                                        <p className="italic text-red-500">Phone is Required*</p>
                                          ) : phoneRegErr ? (
                                            <p className="italic text-red-500">Invalid Phone format*</p>
                                    ):""
                                } </div>
                        <div className="inputBox flex flex-col gap-1">
                            <label htmlFor="Name">Password:</label>
                            <input value={password}
                                type="password"
                                name='name'
                                required
                                className='outline-black border-b-2 px-2 py-2 rounded-md shadow-sm'
                                onChange={
                                    (e) => {
                                        setPassword(e.target.value)
                                        validatePassword(e.target.value)
                                    }
                                }/> {
                                    error && !password?(
                                        <p className="italic text-red-500">Password is Required*</p>
                                          ) : pwdRegErr==true ? (
                                            <p className="italic text-red-500">- at least 8 characters
                                            - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                                            - Can contain special characters*</p>      
                                    ):""
                                }
                         </div>
                        <div className="inputBox flex flex-col gap-1">
                            <label htmlFor="Name">Confirm Password:</label>
                            <input value={confirmPassword}
                                type="password"
                                name='name'
                                required
                                className='outline-black border-b-2 px-2 py-2 rounded-md shadow-sm'
                                onChange={
                                    (e) => {
                                        setConfirmPassword(e.target.value)
                                    }
                                }/> {
                            error && !confirmPassword ? (
                                <p className="italic text-red-500">Confirm password is Required*</p>
                            ) : password !== confirmPassword ? (
                                <p className="italic text-red-500">Password Doesnot Match*</p>
                            ) : ""
                        } </div>
                        <div className="inputBox flex flex-col gap-1">
                            <label htmlFor="Name">Address:</label>
                            <input value={address}
                                type="text"
                                name='name'
                                required
                                className='outline-black border-b-2 px-2 py-2 rounded-md shadow-sm'
                                onChange={
                                    (e) => {
                                        setAddress(e.target.value)
                                    }
                                }/> {
                            error && !address ? (
                                <p className="italic text-red-500">Address is Required*</p>
                            ) : ""
                        } </div>

                        <div className="inputBox flex flex-col gap-1">
                            <label htmlFor="Name">Gender:</label>

                            <div className="flex flex-row justify-evenly items-center">
                                <div className="flex flex-row gap-1 items-center justify-center">
                                    <label htmlFor="">Male</label>
                                    <input defaultChecked onChange={
                                            (e) => {
                                                setGender(e.target.value)
                                            }
                                        }
                                        type="radio"
                                        name="gender"
                                       
                                        value={'male'}
                                        id=""/>
                                </div>
                            <div className="flex flex-row gap-1 items-center justify-center">
                                <label htmlFor="">Female</label>
                                <input onChange={
                                        (e) => {
                                            setGender(e.target.value)
                                        }
                                    }
                                    type="radio"
                                    name="gender"
                                    value={'female'}
                                    id=""/>
                            </div>
                        <div className="flex flex-row gap-1 items-center justify-center">
                            <label htmlFor="">Other</label>
                            <input onChange={
                                    (e) => {
                                        setGender(e.target.value)
                                    }
                                }
                                type="radio"
                                name="gender"
                                value={'other'}
                                id=""/>
                        </div>
                </div>
                {
                error && !gender ? (
                    <p className="italic text-red-500">Gender is Required*</p>
                ) : ""
            } </div>


            <button type='submit' className='mt-1 bg-blue-500 p-2 w-full text-white'>Register</button>
        </form>

        <Link to={'/login'}
            className='italic text-purple-500  text-lg underline'>Already have Account? Login</Link>
    </div>
</div></div>
    )
}

export default Register
