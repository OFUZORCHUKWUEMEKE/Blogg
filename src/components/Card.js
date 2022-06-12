import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Stack } from '@mui/material';


export default function MediaCard({ post }) {
    return (
        <Card sx={{ maxWidth: 345 ,cursor:"pointer"}} >
            <CardMedia
                component="img"
                height="140"
                image="/img/home.svg"
                alt="green iguana"
            />
            <CardContent sx={{ padding: "20px 0px", width: '90%', margin: "auto" }}>
                <Stack spacing={2}>
                    <Typography gutterBottom variant="h5" component="div">
                        {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                    <div className='flex space-x-4 items-center'>
                        <Avatar alt={post.username} sx={{ cursor: 'pointer' }} src="/static/images/avatar/1.jpg" />
                        <p className='font-bold font-mono text-[18px]'>{post.username}</p>
                    </div>
                </Stack>

            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}
