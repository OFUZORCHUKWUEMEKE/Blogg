import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import useFetch from '../useFetch';
import { Grid, Stack } from '@mui/material'
import { Avatar } from '@mui/material'
import { gql, useQuery } from '@apollo/client'
import MediaCard from '../components/Card'
import Facebook from '../components/Loading';
import Media from '../components/Media';
import {Followers} from '../components/Followers';
import '../pages/Home.css'
// import { post } from '../../../server/controllers/post';
const User = () => {
  const { username } = useParams()
  const { data: blog, isPending ,error} = useFetch(`http://localhost:4000/api/username/?username=${username}`);
  const user = JSON.parse(localStorage.getItem('user'))
  console.log(blog)
  return (
    <>
      <div className='bg-[#171d24] min-h-screen emeke'>
        {isPending && <>
          <div className='w-3/5 mx-auto py-6 mb-3'>  
            <Stack spacing={6} alignItems="center" className='w-full' direction="row">
              <div className='flex justify-between items-center w-full'>
                <img src="/img/default.png" className='rounded-full w-[100px]'/>
                <Stack spacing={2} sx={{ marginTop: "15px" }} justifyContent="center" className='w-3/5 mx-auto'>
                  <h2 className='text-white font-mono font-extrabold text-[20px]'><Skeleton animation="wave" /></h2>
                  <div className='flex space-x-4 items-center text-white'>
                    <p><Skeleton animation="wave" /></p>
                    <p><Skeleton animation="wave" /></p>
                    <p><Skeleton animation="wave" /></p>
                  </div>
                  <div><p className='text-white break-all'><Skeleton animation="wave" /></p> </div>
                </Stack>
                <span className='text-white py-3 px-5 rounded-md cursor-pointer bg-green-400'>Follow</span>
              </div>
            </Stack>
          </div>
          <div className='w-3/5 mx-auto'>
          <Grid container spacing={3} justifyContent='space-between' alignItems='center'>                      
                <Grid item xs={12} md={4}>  
                    <Facebook/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Facebook/>
                </Grid>
                <Grid item xs={12} md={4}>
                   <Facebook/>
                </Grid>
                <Grid item xs={12} md={4}>
                   <Facebook/>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Facebook/>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Facebook/>
                </Grid>
            </Grid>
          </div>
        </>}
        {blog && <>
          <div className='w-3/5 mx-auto py-6 mb-3'>
            <Stack spacing={6} alignItems="center" className='w-full' direction="row">
              <div className='flex justify-between items-center w-full'>
                <img src="/img/default.png" className='rounded-full w-[100px]' />
                <Stack spacing={2} sx={{ marginTop: "15px" }} justifyContent="center" className='w-3/5 mx-auto'>
                  <h2 className='text-white font-mono font-extrabold text-[20px]'>{blog.username}</h2>
                  <div className='flex space-x-4 items-center text-white'>
                    <p>{blog.post.length} post</p>
                    
                    <p>{blog.followers.length} Follower</p> 
                  </div>
                  <div><p className='text-white break-all'>My Name is Ofuzor Chukwuemeke , I am Full Stack Web Developer </p> </div>
                </Stack>
                
                <Followers user={blog}/>
              </div>
            </Stack>
          </div>
          <div className='w-[75%] mx-auto'>  
            <Grid container spacing={3} justifyContent='space-between' alignItems='center' className='py-6'>
              {blog?.post?.map((blog) => (
                <Grid item xs={12} md={4} key={blog._id}>
                  <Media post={blog}/>
                </Grid>
              ))}
            </Grid>   
          </div>
        </>}
      </div>
    </>
  )
}

const FETCHPOST = gql`
  {
    getPosts{
    id
    username
    body
    coverPhoto
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

export default User