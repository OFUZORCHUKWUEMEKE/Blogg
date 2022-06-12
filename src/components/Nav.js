import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className='bg-[#1F2937] p-4'>
    <div className=''>
        <Link to='/'><h1 className='text-white font-mono font-bold text-center text-[30px]'>Blogg</h1></Link>
    </div>
 </nav>
  )
}

export default Nav