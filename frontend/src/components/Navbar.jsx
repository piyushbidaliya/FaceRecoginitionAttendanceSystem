import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdHome } from 'react-icons/md';
import { FaClipboardUser, FaClipboardList } from 'react-icons/fa6'
import { PiStudentFill } from 'react-icons/pi'

const Navbar = ({containerStyles}) => {
  return (
    <nav className={`${containerStyles}`}>
        <NavLink to='/home' className={({ isActive }) => isActive ? "active_link" : ""}>
        <div className='flexCenter gap-x-1'><MdHome />Home</div>
        </NavLink>
        <NavLink to='/take-attendance' className={({ isActive }) => isActive ? "active_link" : ""}>
        <div className='flexCenter gap-x-1'><FaClipboardUser />Take Attendance</div>
        </NavLink>
        <NavLink to='/add-student' className={({ isActive }) => isActive ? "active_link" : ""}>
        <div className='flexCenter gap-x-1'><PiStudentFill />Add Student</div>
        </NavLink>
        <NavLink to='/student-attendance' className={({ isActive }) => isActive ? "active_link" : ""}>
        <div className='flexCenter gap-x-1'><FaClipboardList />Student Attendance</div>
        </NavLink>
    </nav>
  )
}

export default Navbar
