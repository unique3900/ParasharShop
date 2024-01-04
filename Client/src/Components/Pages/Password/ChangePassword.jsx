import axios from 'axios';
import React, {
    useState
} from 'react'
import {
    Toaster,
    toast
} from 'react-hot-toast';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import {
    Link,
    Navigate,
    useNavigate
} from 'react-router-dom';
import {
    changePasswordAsync
} from '../../../features/Auth/authSlice';
import { selectLoggedInUserInfo } from '../../../features/user/userSlice';


const ChangePassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [emailregErr, setEmailRegErr] = useState();
    const [pwdRegErr, setPwdRegErr] = useState();
    const [oldpwdRegErr, setoldPwdRegErr] = useState();
    const dispatch = useDispatch();

    const user = useSelector(selectLoggedInUserInfo);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailRegEx = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi
        const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
        if (!email || !password) {
            setError(true);
        }
        if (! emailRegEx.test(email)) {
            setEmailRegErr(true);
        }
        if (!oldPassword) {
            setoldPwdRegErr(true)
        }
        if (! passwordRegEx.test(password)) {
            setPwdRegErr(true);
        } else {
            const data = {
                password: oldPassword,
                newPassword: password,
                id:user.id
            }
            await dispatch(changePasswordAsync(data))
            navigate('/')
        }
    }
    return (
        <div className='flex flex-col h-screen justify-center items-center'>
            <Toaster/>
            <div className=" grid mt-0 grid-flow-row gap-3 lg:grid-flow-col items-center align-middle lg:grid-cols-2 w-full lg:w-fit   p-6 round-xl shadow-md shadow-slate-400 overflow-x-auto no-scrollbar">
                <div className="hidden lg:flex relative justify-center place-content-center">
                    <img className='lg:w-full lg:h-[500px] h-60'
                        src={'/img/changepassword.jpg'}
                        alt=""/>
                </div>


                <div className="">
                    <h1 className='text-center text-5xl lg:text-5xl py-5 '>Change Password</h1>

                    <form noValidate
                        onSubmit={handleSubmit}
                        className="form grid grid-flow-row  lg:grid-cols-1   gap-2  mt-5">

                        <div className="inputBox flex flex-col gap-1">
                            <label htmlFor="Name">Old Password:</label>
                            <input value={oldPassword}
                                type="password"
                                name='name'
                                required
                                className='outline-black border-b-2 px-2 py-2 rounded-md shadow-sm'
                                onChange={
                                    (e) => {
                                        setOldPassword(e.target.value)
                                    }
                                }/> {
                            error && !oldPassword ? (
                                <p className="italic text-red-500">Old Password is Required*</p>
                            ):""
                        } </div>

                        <div className="inputBox flex flex-col gap-1">
                            <label htmlFor="Name">New Password:</label>
                            <input value={password}
                                type="password"
                                name='name'
                                required
                                className='outline-black border-b-2 px-2 py-2 rounded-md shadow-sm'
                                onChange={
                                    (e) => {
                                        setPassword(e.target.value)
                                    }
                                }/> {
                            error && !password ? (
                                <p className="italic text-red-500">Password is Required*</p>
                            ) : pwdRegErr ? (
                                <p className="italic text-red-500">- at least 8 characters
                                - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                                - Can contain special characters*</p>
                            ) : ""
                        } </div>

                        <button type='submit' className='mt-1 bg-blue-500 p-2 w-full text-white'>Change</button>
                    </form>
                    <Link to={'/forgot-password'}
                        className='italic text-purple-500  text-lg underline'>Forgot Password?</Link>
                </div>
            </div>

        </div>
    )
}

export default ChangePassword
