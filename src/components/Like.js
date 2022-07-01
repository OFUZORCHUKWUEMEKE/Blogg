import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import axios from 'axios';

const Like = ({user,post:{_id,likes}}) => {
    const [liked, setLiked] = useState(false);
    const [id,setId] = useState(_id)
    const [token,setToken] = useState(JSON.parse(localStorage.getItem('token')))
    const [checked, setChecked] = useState(true);
    const [likee,setLikee] = useState(likes.length)
    const [likeCount,setLikeCount] = useState()
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    // console.log(likes)
    useEffect(() => {
        if (user && likes.find((like) => like.username === user.username)){
          setLiked(true);     
          console.log('found')
        } else {
          setLiked(false)
          console.log('Not found')
        };
      }, []);

      // const [likePost] = useMutation(LIKE_POST_MUTATION, {
      //   variables: { postId:_id }
      // }); 
      const likePost = async()=>{
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }  
        const {data:{likes}} = await axios.get(`http://localhost:4000/api/like/?postId=${_id}`,{headers:headers})
        setLikee(likes.length)
        if (likes.find((like) => like.username === user.username)){
          setLiked(true);     
          console.log('found')
        } else {
          setLiked(false)
          console.log('Not found')
        };        
      }
      const likeButton = user ? (
        liked ? (   
            <Checkbox {...label} icon={<FavoriteBorder className='text-white'/>} checked={true} checkedIcon={<Favorite className='text-red-500' />}/>
        ) : (
            
            <Checkbox {...label} icon={<FavoriteBorder className='text-white' />} checked={false} checkedIcon={<Favorite className='text-red-500' />}/>
        )
      ) : (
        <Link to='/login'>
            <Checkbox {...label} icon={<FavoriteBorder className='text-white'/>} checked={false} checkedIcon={<Favorite className='text-red-500' />}/>
        </Link>
   
      );
  return (  
    <div onClick={likePost}>
        {likeButton} 
        {likee} 
    </div>
  )
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
    }
  }  
`;

export default Like