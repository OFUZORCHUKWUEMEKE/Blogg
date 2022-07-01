import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Stack } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { deepOrange } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';


export default function MediaCard({ post }){
    const user = JSON.parse(localStorage.getItem('user'))
    
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    return (
        <Card sx={{ maxWidth: 345, cursor: "pointer",backgroundColor:"black",color:"white",padding:"15px 0px",borderRadius:"15px"}}>
            <div className='flex space-x-2 items-center w-[90%] mx-auto p-2'>
                <Avatar alt={post.username} sx={{ cursor: 'pointer',bgcolor: deepOrange[500] }} src="/static/images/avatar/1.jpg" />
                <Link to={`/${post.username}`}><p className='font-bold font-mono text-[18px] hover:hover:text-[#3366ff]'>@{post.username}</p></Link>             
            </div>  
            <CardContent sx={{ padding: "20px 0px", width: '90%', margin: "auto" }}>
                <Stack spacing={2}>
                    <Typography gutterBottom variant="h6" component="div">
                       <Link to={`/blog/${post.username}/${post.slug}/${post.id}`} className='hover:text-[#3366ff] font-mono
                       '>{post.title}</Link> 
                    </Typography>
                </Stack> 
            <p>{post.createdAt}</p>
            </CardContent>
            <CardMedia
                component="img"
                // height="140"
                image={post.coverPhoto}
                alt="green iguana" 
                sx={{width:"85%",margin:"auto",height:"200px",objectFit:'cover',borderRadius:"15px"}}
            />

           

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: "65%", margin: "auto" }}>
                 <LikeButton user={user} post={post}/>
                <Checkbox 
                    {...label}
                    icon={<BookmarkBorderIcon className='text-white'/>}
                    checkedIcon={<BookmarkIcon className='text-white'/>} 
                />
            </Stack>
        </Card>
    );
}
