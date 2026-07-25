import * as Icons from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"

import { resetCourseState } from "../../../slices/courseSlice"
import { setOpenSideMenu } from "../../../slices/sidebarSlice"



export default function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName]
  const location = useLocation()
  const dispatch = useDispatch()

  const { openSideMenu, screenSize } = useSelector(state => state.sidebar)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const handleClick = () => {
    dispatch(resetCourseState())
    if (openSideMenu && screenSize <= 640) dispatch(setOpenSideMenu(false))
  }

  return (
    <NavLink
      to={link.path}
      onClick={handleClick}
      className={`relative px-4 py-[10px] mx-4 mb-2 rounded-xl text-sm font-bold ${matchRoute(link.path)
        ? "bg-[#0056D2] text-white shadow-md shadow-blue-500/20"
        : "text-richblack-500 hover:bg-white hover:text-richblack-900 duration-200"
        } transition-all `}
    >
      <div className="flex items-center gap-x-3 ml-2">
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>

    </NavLink>
  )
}