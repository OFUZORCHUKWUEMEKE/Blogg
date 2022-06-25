import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Grid, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import ImgMediaCard from '../components/Card'
import Footer from '../components/footer'
import { gql, useQuery } from '@apollo/client'
import Facebook from '../components/Loading'
import RecipeReviewCard from '../components/Card'
import MediaCard from '../components/Card'

const Home = () => {
    const { loading, data: { getPosts: posts } = {},error } = useQuery(FETCHPOST)
    const [post,setPost] = useState()
    console.log(posts)

    if(loading || error) return (
        <div className='bg-[#171d24] min-h-screen'>
        <div>
            <Navbar />
            <div className='w-[90%] mx-auto grid place-items-center h-[80vh]'>
                <Grid container spacing={3} justifyContent='space-between' alignItems='center'>
                    <Grid item xs={12} md={6}>
                        <div>
                            <Stack spacing={3}>
                                <h1 className='text-white text-[40px]'>A Social <span className='text-[#3366ff]'>Blogging</span> Platform</h1>
                                <h3 className='text-white text-[25px]'>The hassle-free blogging platform for Content-Creators,<br/>thought-leaders,engineers and the dev community!</h3>
                                <h3 className='text-white text-[23px]'>Share Your Experience / Journey</h3>
                                <Link to='/register'><span className='rounded-[50px] mb-4  cursor-pointer py-3 px-6 bg-[#3466f6] text-center text-white w-[30%]'>Get Started</span></Link>
                            </Stack>   
                        </div>
                    </Grid> 
                    <Grid item xs={12} md={6}>
                        <img src="/img/home.svg" className='object-cover' />
                    </Grid>
                </Grid>
            </div>
        </div>
        <div className='w-4/5 mx-auto p-8'>
            <Stack alignItems='center' spacing={2} className='text-center'>
                <h2 className='text-[14px] font-mono text-white font-bold'>From the Community</h2>
                <h2 className='text-[22px] font-mono text-[#3366ff] font-extrabold'>Latest Article</h2>
            </Stack>
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
        <div className='p-6'>
            <div className='w-4/5 mx-auto rounded-md  bg-[#212c39] px-5 py-10'>
                <Stack spacing={3} justifyContent='space-around' className='text-center'>
                    <h1 className='font-bold text-[32px] font-mono text-white'>Coming Soon</h1>
                    <h1 className='font-bold text-[32px] font-mono text-white'>Blogg For <span className='text-[#3366ff]'>Teams</span></h1>
                    <h3 className='font-bold text-[18px] font-mono text-[#3366ff]'>Collaborate with Diffrent People from all over the world on one project</h3>
                </Stack>
            </div>
        </div>
        <Footer />
    </div>
    )

    return (
        <>
            <div className='bg-[#171d24] min-h-screen'>
                <div>
                    <Navbar />
                    <div className='w-[90%] mx-auto grid place-items-center h-[80vh]'>
                        <Grid container spacing={2} justifyContent='space-between' alignItems='center'>
                            <Grid item xs={12} md={6}>
                                <div>
                                    <Stack spacing={3}>
                                        <h1 className='text-white text-[40px]'>A Social <span className='text-[#3366ff]'>Blogging</span> Platform</h1>
                                        <h3 className='text-white text-[25px]'>The hassle-free blogging platform for Content-Creators, <br/> thought-leaders,engineers and the dev community!</h3>
                                        <p className='text-white text-[23px]'>Share Your Experience / Journey</p>
                                        <p></p>
                                        <Link to='/register'><span className='rounded-[50px] mb-4  cursor-pointer py-3 px-6 bg-[#3466f6] text-center text-white w-[30%]'>Get Started</span></Link>
                                    </Stack>
                                </div>   
                            </Grid>
                            <Grid item xs={12} md={6}>  
                                <img src="/img/home.svg" className='object-cover'/>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className='w-4/5 mx-auto p-8'>
                    <Stack alignItems='center' spacing={2} className='text-center'>
                        <h2 className='text-[14px] font-mono text-white font-bold'>From the Community</h2>
                        <h2 className='text-[22px] font-mono text-[#3366ff] font-extrabold'>Latest Article</h2>
                    </Stack>  
                    <Grid container spacing={3} justifyContent='space-between' alignItems='center' className='py-6'>    
                        {posts?.map((post)=>(
                           <Grid item xs={12} md={4} key={post.id}>                             
                               <MediaCard post={post}/>
                          </Grid>
                        ))}                            
                    </Grid>
                </div>
                <div className='p-6'>
                    <div className='w-4/5 mx-auto rounded-md  bg-[#212c39] px-5 py-10'>
                        <Stack spacing={3} justifyContent='space-around' className='text-center'>
                            <h1 className='font-bold text-[32px] font-mono text-white'>Coming Soon</h1>
                            <h1 className='font-bold text-[32px] font-mono text-white'>Blogg For <span className='text-[#3366ff]'>Teams</span></h1>
                            <h3 className='font-bold text-[18px] font-mono text-[#3366ff]'>Collaborate with Diffrent People from all over the world on one project</h3>
                        </Stack>
                    </div>
                </div>
                <Footer/>
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
export default Home;