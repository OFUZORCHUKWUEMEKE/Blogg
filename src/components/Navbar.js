import { gql, useQuery } from '@apollo/client'
import React, { useEffect, useState ,useContext} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'
// import { Link } from 'react-router-dom'
import Inputed from './Input'
import BasicModal from './Modal'
import '../pages/Home.css'


const Navbar = () => {
  const [open, setOpen] =useState(false);
  const { client,loading, data: { getPosts: posts } = {},error } = useQuery(FETCHPOST,{ fetchPolicy: "network-only" })
  const [post, setPost] = useState()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const {dispatch} = useContext(AuthContext) 

  const logout = async(e)=>{
    dispatch({type:"LOGOUT"})  
    setUser(null)
    await client.clearStore()
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (  
    <>
      <nav className='bg-[#1F2937] p-2 emeke' >
        <div className='flex w-[90%] mx-auto flex-row justify-between'>
          <div className='space-x-4 flex items-center'>         
            <Link to='/'><h1 className='text-white font-mono font-bold'>Blogg</h1></Link>
            <Inputed/>
          </div>
          {user?(
            <div className='space-x-6 flex items-center'>
              <Link to="/create"> <span className='rounded-[50px] cursor-pointer py-3 px-6 bg-[#3466f6] text-white '>Write</span></Link>             
              <span className='text-white bg-[#171d24] py-3 px-6 rounded-md'>Hello {user.username}</span>
              <span onClick={logout} className='text-white bg-[#3466f6] cursor-pointer py-3 px-6 rounded-[50px]'>Logout</span>
            </div>
          ):(
            <div className='space-x-6 flex items-center'>
               <BasicModal/>
              <Link to='/register'><span className='text-white bg-[#171d24] p-3 rounded-md'>Create Account</span></Link>
              <Link to='/login'><span className='text-white bg-[#171d24] py-3 px-6 rounded-md'>Login</span></Link>
               
            </div>   
          )}
        </div>  
      </nav>
    </>
  )
}  
const FETCHPOST = gql`
  {
    getPosts{
    id
    username
    body
    title
    comments {
      body
    }
    createdAt
    likes {
      username
    }
    slug
  }  
  }
`
export default Navbar;