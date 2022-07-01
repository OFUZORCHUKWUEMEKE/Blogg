import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

const LikeButton = ({user,post:{id,likes}}) => {
    const [liked, setLiked] = useState(false);
    const [checked, setChecked] = useState(true);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    console.log(likes) 
    useEffect(() => {
        if (user && likes.find((like) => like.username === user.username)) {
          setLiked(true);
        } else setLiked(false);
      }, [user, likes]);

      const [likePost] = useMutation(LIKE_POST_MUTATION,{
        variables: { postId: id }
      });   


      const likeButton = user ? (
        liked ? (   
            <Checkbox {...label} icon={<FavoriteBorder className='text-white'/>} checked={true} checkedIcon={<Favorite className='text-red-500' />} />
        ) : (
            
            <Checkbox {...label} icon={<FavoriteBorder className='text-white' />} checked={false} checkedIcon={<Favorite className='text-red-500' />} />
        )
      ) : (
        <Link to='/login'>
            <Checkbox {...label} icon={<FavoriteBorder className='text-white'/>} checked={false} checkedIcon={<Favorite className='text-red-500' />} />
        </Link>
   
      );
  return (
    <div onClick={likePost}>
        {likeButton}
        {likes.length}
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

export default LikeButton