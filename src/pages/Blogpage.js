import { Avatar, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';

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
    const { username, slug } = useParams()
    const [post, setPost] = useState()
    const navigate = useNavigate()
    const [find, { loading, error, data }] = useMutation(FINDPOST, {
        update(_, { data: { findPost: Post } }) {
            setPost(Post)
            console.log(post)
        },
        variables: { username, slug }
    })
    useEffect(() => {
        find()
    }, [slug])
    if (loading) {
        return (
            <>
                <div className='bg-[#171d24] min-h-screen'>
                    <nav className='bg-[#1F2937] p-3'>
                        <div className='flex w-[90%] mx-auto flex-row justify-between items-center'>
                            <Link to='/'><h1 className='text-white font-mono font-bold'><Skeleton animation="wave" /></h1></Link>
                            <div className='space-x-6 flex flex-row items-center'>
                                <h1 className='text-[20px] font-bold text-white'><Skeleton animation="wave" /></h1>
                                <Avatar alt="frank" />
                                <span className='text-white bg-[#171d24] p-3 rounded-md cursor-pointer'>Follow</span>
                            </div>
                        </div>
                    </nav>
                    <div className='w-3/5 mx-auto py-3 mb-3'>
                        <Stack spacing={3}>
                            <img src={post?.coverPhoto} className='w-full h-[400px] object-cover' />
                            <h1 className='text-center font-bold text-[30px] text-white'><Skeleton animation="wave" /></h1>
                            <div>  
                                <Stack direction="row" spacing={6} justifyContent='center' alignItems='center'>
                                    <div className='flex items-center space-x-4'>
                                        <Avatar alt={post?.username}/>
                                        <h1 className='text-white text-[20px]'><Skeleton animation="wave" /></h1>
                                    </div>
                                    <h2 className='text-white'>{new Date().toLocaleDateString()}</h2>
                                </Stack>
                            </div>
                        </Stack>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className='bg-[#171d24] min-h-screen'>
                <nav className='bg-[#1F2937] p-3'>
                    <div className='flex w-[90%] mx-auto flex-row justify-between items-center'>
                        <Link to='/'><h1 className='text-white font-mono font-bold'>Blogg</h1></Link>
                        <div className='space-x-6 flex flex-row items-center'>
                            <h1 className='text-[20px] font-bold text-white'>{post?.username}</h1>
                            <Avatar alt="frank" />
                            <span className='text-white bg-[#171d24] p-3 rounded-md cursor-pointer'>Follow</span>
                        </div>
                    </div>
                </nav>
                <div className='w-3/5 mx-auto py-3 mb-3'>
                    <Stack spacing={3}>
                        <img src={post?.coverPhoto} className='w-full h-[400px] object-cover' />
                        <h1 className='text-center font-bold text-[30px] text-white'>{post?.title}</h1>
                        <div>
                            <Stack direction="row" spacing={6} justifyContent='center' alignItems='center'>
                                <div className='flex items-center space-x-4'>
                                    <Avatar alt={post?.username} />
                                    <Link to={`/${post?.username}`}><h1 className='text-white text-[20px]'>{post?.username}</h1></Link>
                                </div>
                                <h2 className='text-white'>{new Date().toLocaleDateString()}</h2>
                            </Stack>
                        </div>
                    </Stack>
                </div>
            </div>
        </>
    )
}

const FINDPOST = gql`
mutation($slug: String!, $username: String!){
  findPost(slug: $slug,username: $username){
    id  
    username 
    body 
    title
    createdAt 
    coverPhoto   
  }
}
`

export default Blogpage