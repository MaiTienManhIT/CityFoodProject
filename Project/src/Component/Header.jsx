import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { app } from '../firebaseconnect';
import logo from '../img/logo.png';
import avatar from '../img/avatar.png';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { async } from '@firebase/util';  
import { actionType } from './reducer';
import { useStateValue } from './StateProvider';
import { MdBookmarkAdd } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";


export const Header = () => {
    const frirebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [{ user }, dispatch] = useStateValue();
    const [isMenu, setIsMenu] = useState(false);
    
    const login = async () => {
        if (!user) {
            const { user: { refreshToken, providerData } } = await signInWithPopup(frirebaseAuth, provider);
            // console.log(response);
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0],
            });
            localStorage.setItem('user', JSON.stringify(providerData[0]));
        }
        else {
            setIsMenu(!isMenu)
        }
    }
    //Logout
    const logout = () => {
        setIsMenu(false);
        localStorage.clear();
        dispatch({
            type: actionType.SET_USER,
            user: null,
        });
    }
    return (
        <div className='fixed z-10 w-screen bg-gray-100  p-5 px-16'>
            {/* desktop and tablet */}
            <div className='hidden md:flex w-full h-full items-center justify-between bg-gray-100 py-2'>
                <div to='/createItem' className="flex items-center gap-2">
                    <img src={logo}
                        className="w-8 object-cover" alt="logo" />
                    <p className="text-headingColor text-lg font-bold">City Food</p>
                </div>
                <div className='flex items-center gap-8'>
                    <ul className="flex items-center gap-8 ">
                        <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            <Link to='/'>Home</Link>
                        </li>
                        <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            Menu
                        </li>
                        <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            About Us
                        </li>
                        <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            Services
                        </li>
                    </ul>
                    <div className='relative flex items-center justify-center'>
                        <MdAddShoppingCart className='text-textColor text-2xl ml-5 cursor-pointer'></MdAddShoppingCart>
                        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                            <p className="text-xs text-white font-semibold"> 2 </p>
                        </div>
                    </div>
                    <motion.img
                        src={user ? user.photoURL : avatar}
                        onClick={login}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl rounded-full  cursor-pointer'
                        alt="Avatar" />
                    {isMenu && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-11 right-0'>
                            <Link to={'/createItem'}>
                                <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                                    <MdBookmarkAdd />New Item</p>
                            </Link>
                            <p
                            onClick={logout}
                            className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                                <MdLogout />Logout</p>
                        </motion.div>
                    )}
                </div>

            </div>
            {/*Mobile */}
            <div className='flex md:hidden w-full h-full bg-yellow-300 p-4'>
            <div className='flex items-center justify-between md:hidden w-full h-full'>
                    <div className="relative flex items-center justify-center">
                        <MdAddShoppingCart className="text-textColor text-2xl ml-8 cursor-pointer"></MdAddShoppingCart>
                        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                            <p className="text-xs text-white font-semibold">
                                2
                            </p>
                        </div>
                    </div>
                    <Link to={'/'} className="flex items-center gap-2">
                        <img src={logo} className="w-8 object-cover" alt="logo" />
                        <p className="text-headingColor text-xl font-bold">Food</p>
                    </Link>

                    {/* avatar */}
                    <div className="relative">
                        <motion.img
                            whileTap={{ scale: 0.7 }}
                            className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl rounded-full cursor-pointer'
                            src={user ? user.photoURL : avatar}
                            alt="Avatar"
                            onClick={login}
                        />
                        {
                            isMenu && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.6 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.6 }}
                                    className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-11 right-0'>

                                    <Link to={'/createItem'}>
                                        <p onClick={() => setIsMenu(false)} className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                                            <MdBookmarkAdd /> New Item
                                        </p>
                                    </Link>

                                    {/* menu  */}
                                    <ul className="flex flex-col px-4 py-3 gap-4">
                                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                                            Home
                                        </li>
                                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                                            Menu
                                        </li>
                                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                                            About Us
                                        </li>
                                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                                            Services
                                        </li>
                                    </ul>

                                    <p className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                                        onClick={logout}
                                    ><MdLogout />Logout</p>
                                </motion.div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header