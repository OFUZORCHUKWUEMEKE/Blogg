import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const Followers = ({ user }) => {
  const [followed, setIsFollowed] = useState(false)
  const [isUser, setIsUser] = useState(false)
  const [token,setToken] = useState(JSON.parse(localStorage.getItem('token')))
  const name = JSON.parse(localStorage.getItem('user'))
  const [load,setLoad] = useState(false)
  useEffect(() => {
    if (name) {
      if (user.username === name.username) {
        console.log('u cannot follow urself')
        setIsUser(true)
      }
      if (user.followers.find(follower => follower.username === name.username)) {
        setIsFollowed(true)
      } else {
        setIsFollowed(false)
      }
      console.log(user)
    }else{
      setIsUser(false)
    }

  }, [])

  const followerUser = async()=>{
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }  
      setLoad(true)
      const {data} = await axios.get(`http://localhost:4000/api/follow?id=${user._id}`,{headers:headers})
      setLoad(false)
      if(data.followers.find(follower=>follower.username===name.username)){
        setIsFollowed(true)
      }else{
        setIsFollowed(false)
      }

  }

  const followButton = name  ? (
    followed ? (
      <span className={load ?'text-white py-3 px-5 rounded-md cursor-pointer bg-green-300':'text-white py-3 px-5 rounded-md cursor-pointer bg-green-400'}>Following</span>
    ) : (
      <span  className={load ?'text-white py-3 px-5 rounded-md cursor-pointer bg-green-300':'text-white py-3 px-5 rounded-md cursor-pointer bg-green-400'}>Follow</span>
    )
  ) : (
    <Link to='/login'><span className='text-white py-3 px-5 rounded-md cursor-pointer bg-green-400'>Follow</span> </Link>
  )  
  return (
    <>
    <div onClick={followerUser}>
      {isUser?(<button className='text-white py-3 px-5 rounded-md cursor-pointer bg-green-400'>Edit Profile</button>):(followButton)}
    </div>   
    </>  
  )
}

