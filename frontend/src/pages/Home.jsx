import React from 'react'
import { NavLink } from 'react-router-dom'
import { Header } from '../components'

const Home = () => {
  return (
    <div>
    <Header/>
    <section className='relative bg-hero bg-center bg-no-repeat h-screen bg-cover w-full'>
        <div className='max_padd_container relative top-32 xs:top-52'>
            <h1 className='h3 capitalize max-w-[37rem] text-primary'>Welcome To Face Recoginition Attendance System</h1>
            <p className='text-secondary regular-16 mt-6 max-w-[33rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti accusamus ducimus dolore repellendus
                 quos eum incidunt enim, veniam doloremque ullam consectetur rem qui placeat. Hic omnis illo ipsum
                  recusandae impedit?</p>
        <div className='max-xs:flex-col flex gap-2 pt-10'>
            <NavLink to={'/take-attendance'} className={'btn_dark_rounded flexCenter'}>
                Take Attendance
            </NavLink>
            <NavLink to={'/student-attendance'} className={'btn_dark_rounded flexCenter gap-x-2'}>
                Student List
            </NavLink>
        </div>
    </div>
    </section>
    </div>
  )
}

export default Home
