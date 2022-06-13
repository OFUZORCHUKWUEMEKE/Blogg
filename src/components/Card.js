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
import { Link } from 'react-router-dom';


export default function MediaCard({ post }) {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    return (
        <Card sx={{ maxWidth: 345, cursor: "pointer"}}>
            <div className='flex space-x-2 items-center w-[90%] mx-auto p-2'>
                <Avatar alt={post.username} sx={{ cursor: 'pointer' }} src="/static/images/avatar/1.jpg" />
                <p className='font-bold font-mono text-[18px]'>{post.username}</p>
            </div>
           
            <CardContent sx={{ padding: "20px 0px", width: '90%', margin: "auto" }}>
                <Stack spacing={2}>
                    <Typography gutterBottom variant="h5" component="div">
                       <Link to={`/blog/${post.username}/${post.slug}`}>{post.title}</Link> 
                    </Typography>
                </Stack> 
            <p>{post.createdAt}</p>
            </CardContent>
            <CardMedia
                component="img"
                height="140"
                image="/img/home.svg"
                alt="green iguana"
                sx={{width:"85%",margin:"auto"}}
            />

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: "65%", margin: "auto" }}>
                <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                <Checkbox
                    {...label}
                    icon={<BookmarkBorderIcon />}
                    checkedIcon={<BookmarkIcon />}
                />
            </Stack>


        </Card>
    );
}
