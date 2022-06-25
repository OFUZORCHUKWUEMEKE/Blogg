import { Avatar, Stack } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { BlogContext } from '../BlogContext';
import useFetch from '../useFetch';
import './blog.css'
import Footer from '../components/footer';

export function Animations() {
    return (
        <Box sx={{ width: 300 }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
        </Box>
    );
}

const Blogpage = () => {
    const { username, slug, id } = useParams()
    const [post, setPost] = useState()
    const [info, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { dispatch, state } = useContext(BlogContext)
    const { data: blog, error, isPending } = useFetch(`http://localhost:4000/api/findpost/?id=${id}`);

    return (
        <div className="blog-details">
            {isPending && <>
                <div className='bg-[#171d24] min-h-screen'>
                    <nav className='bg-[#1F2937] p-3'>
                        <div className='flex w-[70%] mx-auto flex-row justify-between items-center'>
                            <Link to='/'><h1 className='text-white font-mono font-bold'>Blogg</h1></Link>
                            <div className='space-x-6 flex flex-row items-center'>
                                <h1 className='text-[20px] font-bold text-white'><Skeleton animation="wave" /></h1>
                                <Avatar alt="frank" />
                                <span className='text-white bg-[#171d24] p-3 rounded-md cursor-pointer'>Follow</span>
                            </div>
                        </div>
                    </nav>
                    <div className='w-3/5 mx-auto py-3 mb-3'>
                        <Stack spacing={3}>
                            <Skeleton variant="rectangular" sx={{ width: '100%' }} animation="wave" height={400} />
                            <h1 className='text-center font-bold text-[30px] text-white'><Skeleton animation="wave" /></h1>
                            <div>
                                <Stack direction="row" spacing={6} justifyContent='center' alignItems='center'>
                                    <div className='flex items-center space-x-4'>
                                        <Avatar alt={blog?.username} />
                                        <h1 className='text-white text-[20px]'><Skeleton animation="wave" /></h1>
                                    </div>
                                    <h2 className='text-white'>{new Date().toLocaleDateString()}</h2>
                                </Stack>

                            </div>
                        </Stack>
                    </div>
                </div>
                {/* <Footer /> */}
            </>}
            {error && <div>{error}</div>}
            {blog && (
                <>
                    <div className='bg-[#171d24] min-h-screen overflow-hidden'>
                        <nav className='bg-[#1F2937] p-3'>
                            <div className='flex w-[95%] md:w-[70%] mx-auto flex-row justify-between items-center'>
                                <Link to='/'><h1 className='text-white font-mono font-bold'>Blogg</h1></Link>
                                <div className='space-x-6 flex flex-row items-center'>
                                    <h1 className='text-[20px] font-bold text-white'>@{blog?.username}</h1>
                                    <Avatar alt="frank" />
                                    <span className='text-white bg-[#171d24] p-3 rounded-md cursor-pointer'>Follow</span>
                                </div>
                            </div>
                        </nav>
                        <div className='w-4/5 md:3/5 mx-auto py-3 mb-3'>
                            <Stack spacing={3}>
                                <img src={blog?.coverPhoto} className='w-full h-[400px] object-cover' />
                                <h1 className='text-center font-bold text-[30px] text-white'>{blog?.title}</h1>
                                <div>
                                    <Stack direction="row" spacing={6} justifyContent='center' alignItems='center'>
                                        <div className='flex items-center space-x-4'>
                                            <Avatar alt={blog?.username} />
                                            <Link to={`/${blog?.username}`}><h1 className='text-white text-[20px]'>{blog?.username}</h1></Link>
                                        </div>
                                        <h2 className='text-white'>{new Date().toLocaleDateString()}</h2>

                                    </Stack>
                                    <div dangerouslySetInnerHTML={{ __html: blog?.body }} className='text-white break-all py-2 blog w-full md:w-4/5 mx-auto'>

                                    </div>
                                </div>
                            </Stack>
                        </div>
                    </div>
                    {/* <Footer/> */}
                </>

            )}
        </div>
    );
}

const FINDPOST = gql`
mutation($singlePostId: ID!){
  SinglePost(id: $singlePostId) {
    id
    user
    username
    coverPhoto
    isPublished
  }
}
`

export default Blogpage