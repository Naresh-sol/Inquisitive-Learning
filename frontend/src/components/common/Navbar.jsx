import React, { useState, useEffect, useRef } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { NavbarLinks } from "../../../data/navbar-links"
import studyNotionLogo from '../../assets/Logo/Logo-Full-Light.png'
import { fetchCourseCategories } from './../../services/operations/courseDetailsAPI';
import { logout } from '../../services/operations/authAPI'

import Img from './Img'
import ProfileDropDown from '../core/Auth/ProfileDropDown'

import { AiOutlineShoppingCart, AiOutlineHome, AiOutlineClose } from "react-icons/ai"
import { HiMenuAlt3 } from "react-icons/hi"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { PiNotebook } from "react-icons/pi"
import { TbMessage2Plus } from "react-icons/tb"


const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile)
    const { totalItems } = useSelector((state) => state.cart)
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const drawerRef = useRef(null);

    const fetchSublinks = async () => {
        try {
            setLoading(true)
            const res = await fetchCourseCategories();
            setSubLinks(res);
        }
        catch (error) {
            console.log("Could not fetch the category list = ", error);
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchSublinks();
    }, [])

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname])

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

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY)
                setShowNavbar('hide')
            else setShowNavbar('show')
        }
        else setShowNavbar('top')
        setLastScrollY(window.scrollY);
    }

    const handleLogout = () => {
        dispatch(logout(navigate));
        setMobileMenuOpen(false);
    }

    return (
        <>
            <nav className={`z-[100] flex h-14 w-full items-center justify-center border-b-[1px] border-b-richblack-200 text-richblack-900 translate-y-0 transition-all ${showNavbar} bg-white/90 backdrop-blur-sm`}>
                <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-x-2">
                        <img src={studyNotionLogo} className="w-9 h-9 object-contain" loading='lazy' alt="Inquisitive Learning" />
                        <span className="hidden sm:block text-xl font-bold tracking-wide font-inter text-[#0056D2]">
                            Inquisitive learning
                        </span>
                        <span className="block sm:hidden text-base font-bold tracking-wide font-inter text-[#0056D2]">
                            Inquisitive
                        </span>
                    </Link>

                    {/* Nav Links — Desktop only */}
                    <ul className='hidden sm:flex gap-x-6 text-richblack-900 font-medium'>
                        {NavbarLinks.map((link, index) => (
                            <li key={index}>
                                <Link to={link?.path}>
                                    <p className={`${matchRoute(link?.path) ? "bg-[#0056D2]/10 text-[#0056D2]" : "text-richblack-900 hover:bg-gray-100"} rounded-xl p-1 px-3 transition-colors`}>
                                        {link.title}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Desktop: Login / SignUp / Profile */}
                    <div className='hidden sm:flex gap-x-4 items-center'>
                        {user && user?.accountType !== "Instructor" && (
                            <Link to="/dashboard/cart" className="relative">
                                <AiOutlineShoppingCart className="text-[2.35rem] text-richblack-900 hover:bg-gray-200 rounded-full p-2 duration-200" />
                                {totalItems > 0 && (
                                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        )}
                        {token === null && (
                            <Link to="/login">
                                <button className={`whitespace-nowrap px-[12px] py-[8px] rounded-md transition-colors font-medium
                                 ${matchRoute('/login') ? 'bg-[#0056D2] text-white shadow-md' : 'border border-gray-300 bg-white text-richblack-900 hover:bg-gray-100'}`}>
                                    Log in
                                </button>
                            </Link>
                        )}
                        {token === null && (
                            <Link to="/signup">
                                <button className={`whitespace-nowrap px-[12px] py-[8px] rounded-md transition-colors font-medium
                                 ${matchRoute('/signup') ? 'bg-[#0056D2] text-white shadow-md' : 'border border-gray-300 bg-white text-richblack-900 hover:bg-gray-100'}`}>
                                    Sign Up
                                </button>
                            </Link>
                        )}
                        {token !== null && <ProfileDropDown />}
                    </div>

                    {/* Mobile: Cart + Hamburger */}
                    <div className='flex sm:hidden items-center gap-x-2'>
                        {user && user?.accountType !== "Instructor" && (
                            <Link to="/dashboard/cart" className="relative">
                                <AiOutlineShoppingCart className="text-[1.9rem] text-richblack-900 hover:bg-gray-200 rounded-full p-1.5 duration-200" />
                                {totalItems > 0 && (
                                    <span className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-[10px] font-bold text-yellow-100">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        )}
                        <button
                            onClick={() => setMobileMenuOpen((prev) => !prev)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen
                                ? <AiOutlineClose className="text-2xl text-richblack-900" />
                                : <HiMenuAlt3 className="text-2xl text-richblack-900" />
                            }
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── Mobile Slide-in Drawer ── */}
            <div className={`fixed inset-0 z-[99] sm:hidden transition-all duration-300 ${mobileMenuOpen ? 'visible' : 'invisible'}`}>
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setMobileMenuOpen(false)}
                />

                {/* Drawer Panel */}
                <div
                    ref={drawerRef}
                    className={`absolute top-0 right-0 h-full w-[78vw] max-w-[300px] bg-white shadow-2xl flex flex-col
                        transform transition-transform duration-300 ease-in-out
                        ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                        <div className="flex items-center gap-x-2">
                            <img src={studyNotionLogo} className="w-7 h-7 object-contain" alt="Logo" />
                            <span className="text-sm font-bold text-[#0056D2] font-inter">Inquisitive</span>
                        </div>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <AiOutlineClose className="text-lg text-gray-500" />
                        </button>
                    </div>

                    {/* User profile strip (logged in) */}
                    {user && (
                        <div className="flex items-center gap-x-3 px-5 py-3 bg-[#f0f5ff] border-b border-blue-100">
                            {user?.image
                                ? <Img src={user?.image} alt={user?.firstName} className="w-9 h-9 rounded-full object-cover border-2 border-[#0056D2]/30" />
                                : <div className="w-9 h-9 rounded-full bg-[#0056D2]/20 flex items-center justify-center text-[#0056D2] font-bold text-sm">
                                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                                  </div>
                            }
                            <div className="overflow-hidden">
                                <p className="font-semibold text-sm text-richblack-900 truncate">{user?.firstName} {user?.lastName}</p>
                                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                            </div>
                        </div>
                    )}

                    {/* Navigation Links */}
                    <nav className="flex-1 overflow-y-auto">
                        <p className="px-5 pt-4 pb-1 text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Menu</p>

                        <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                            <div className={`flex items-center gap-x-3 px-5 py-3.5 text-sm font-medium border-l-4 transition-all
                                ${location.pathname === '/' ? 'border-[#0056D2] bg-[#0056D2]/5 text-[#0056D2]' : 'border-transparent text-richblack-900 hover:bg-gray-50 hover:border-gray-200'}`}>
                                <AiOutlineHome className="text-[18px] flex-shrink-0" />
                                Home
                            </div>
                        </Link>

                        <Link to="/catalog" onClick={() => setMobileMenuOpen(false)}>
                            <div className={`flex items-center gap-x-3 px-5 py-3.5 text-sm font-medium border-l-4 transition-all
                                ${matchRoute('/catalog') ? 'border-[#0056D2] bg-[#0056D2]/5 text-[#0056D2]' : 'border-transparent text-richblack-900 hover:bg-gray-50 hover:border-gray-200'}`}>
                                <PiNotebook className="text-[18px] flex-shrink-0" />
                                Catalog
                            </div>
                        </Link>

                        <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
                            <div className={`flex items-center gap-x-3 px-5 py-3.5 text-sm font-medium border-l-4 transition-all
                                ${matchRoute('/about') ? 'border-[#0056D2] bg-[#0056D2]/5 text-[#0056D2]' : 'border-transparent text-richblack-900 hover:bg-gray-50 hover:border-gray-200'}`}>
                                <TbMessage2Plus className="text-[18px] flex-shrink-0" />
                                About Us
                            </div>
                        </Link>

                        {user && (
                            <>
                                <div className="mx-5 my-2 border-t border-gray-100" />
                                <p className="px-5 pb-1 text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Account</p>
                                <Link to="/dashboard/my-profile" onClick={() => setMobileMenuOpen(false)}>
                                    <div className={`flex items-center gap-x-3 px-5 py-3.5 text-sm font-medium border-l-4 transition-all
                                        ${matchRoute('/dashboard/my-profile') ? 'border-[#0056D2] bg-[#0056D2]/5 text-[#0056D2]' : 'border-transparent text-richblack-900 hover:bg-gray-50 hover:border-gray-200'}`}>
                                        <VscDashboard className="text-[18px] flex-shrink-0" />
                                        Dashboard
                                    </div>
                                </Link>
                            </>
                        )}
                    </nav>

                    {/* Bottom — Auth Buttons or Logout */}
                    <div className="border-t border-gray-100 p-4 space-y-2">
                        {token === null ? (
                            <>
                                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                                    <button className="w-full py-2.5 rounded-xl border border-gray-300 bg-white text-richblack-900 font-medium text-sm hover:bg-gray-50 transition-colors">
                                        Log in
                                    </button>
                                </Link>
                                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                                    <button className="w-full py-2.5 rounded-xl bg-[#0056D2] text-white font-medium text-sm hover:bg-[#0046b0] transition-colors mt-2">
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-x-2 py-2.5 rounded-xl border border-red-200 text-red-600 font-medium text-sm hover:bg-red-50 transition-colors"
                            >
                                <VscSignOut className="text-base" />
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
