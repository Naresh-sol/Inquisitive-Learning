import React, { useState, useEffect } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { NavbarLinks } from "../../../data/navbar-links"
import studyNotionLogo from '../../assets/Logo/Logo-Full-Light.png'
import { fetchCourseCategories } from './../../services/operations/courseDetailsAPI';

import ProfileDropDown from '../core/Auth/ProfileDropDown'
import MobileProfileDropDown from '../core/Auth/MobileProfileDropDown'

import { AiOutlineShoppingCart } from "react-icons/ai"
import { MdKeyboardArrowDown } from "react-icons/md"




const Navbar = () => {
    // console.log("Printing base url: ", import.meta.env.VITE_APP_BASE_URL);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    // console.log('USER data from Navbar (store) = ', user)
    const { totalItems } = useSelector((state) => state.cart)
    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);


    const fetchSublinks = async () => {
        try {
            setLoading(true)
            const res = await fetchCourseCategories();
            // const result = await apiConnector("GET", categories.CATEGORIES_API);
            // const result = await apiConnector('GET', 'http://localhost:4000/api/v1/course/showAllCategories');
            // console.log("Printing Sublinks result:", result);
            setSubLinks(res);
        }
        catch (error) {
            console.log("Could not fetch the category list = ", error);
        }
        setLoading(false)
    }

    // console.log('data of store  = ', useSelector((state)=> state))


    useEffect(() => {
        fetchSublinks();
    }, [])


    // when user click Navbar link then it will hold yellow color
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }


    // when user scroll down , we will hide navbar , and if suddenly scroll up , we will show navbar 
    const [showNavbar, setShowNavbar] = useState('top');
    const [lastScrollY, setLastScrollY] = useState(0);
    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);

        return () => {
            window.removeEventListener('scroll', controlNavbar);
        }
    },)

    // control Navbar
    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY)
                setShowNavbar('hide')

            else setShowNavbar('show')
        }

        else setShowNavbar('top')

        setLastScrollY(window.scrollY);
    }



    return (
        <nav className={`z-[10] flex h-14 w-full items-center justify-center border-b-[1px] border-b-richblack-200 text-richblack-900 translate-y-0 transition-all ${showNavbar} `}>
             {/* <nav className={` fixed flex items-center justify-center w-full h-16 z-[10] translate-y-0 transition-all text-white ${showNavbar}`}> */}
            <div className='flex w-11/12 max-w-maxContent items-center justify-between '>
                {/* logo */}
                <Link to="/" className="flex items-center gap-x-2">
                    <img src={studyNotionLogo} className="w-9 h-9 object-contain" loading='lazy' />
                    <span className="text-xl font-bold tracking-wide font-inter text-[#0056D2]">
                        Inquisitive learning
                    </span>
                </Link>

                {/* Nav Links - visible for only large devices*/}
                <ul className='hidden sm:flex gap-x-6 text-richblack-900 font-medium'>
                    {
                        NavbarLinks.map((link, index) => (
                            <li key={index}>
                                <Link to={link?.path}>
                                    <p className={`${matchRoute(link?.path) ? "bg-[#0056D2]/10 text-[#0056D2]" : "text-richblack-900 hover:bg-gray-100"} rounded-xl p-1 px-3 transition-colors`}>
                                        {link.title}
                                    </p>
                                </Link>
                            </li>
                        ))}
                </ul>




                {/* Login/SignUp/Dashboard */}
                <div className='flex gap-x-4 items-center'>
                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to="/dashboard/cart" className="relative">
                                <AiOutlineShoppingCart className="text-[2.35rem] text-richblack-900 hover:bg-gray-200 rounded-full p-2 duration-200" />
                                {totalItems > 0 && (
                                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                {/* <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md focus:outline-8 outline-yellow-50'> */}
                                <button className={` px-[12px] py-[8px] rounded-md transition-colors font-medium
                                 ${matchRoute('/login') ? 'bg-[#0056D2] text-white shadow-md' : 'border border-gray-300 bg-white text-richblack-900 hover:bg-gray-100'} `}
                                >
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                {/* <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'> */}
                                <button className={` px-[12px] py-[8px] rounded-md transition-colors font-medium
                                 ${matchRoute('/signup') ? 'bg-[#0056D2] text-white shadow-md' : 'border border-gray-300 bg-white text-richblack-900 hover:bg-gray-100'} `}
                                >
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }

                    {/* for large devices */}
                    {token !== null && <ProfileDropDown />}

                    {/* for small devices */}
                    {token !== null && <MobileProfileDropDown />}

                </div>
            </div>
        </nav>
    )
}

export default Navbar
