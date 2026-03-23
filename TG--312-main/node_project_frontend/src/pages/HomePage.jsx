import React, { useEffect, useState } from 'react'
import PostComponent from '../components/PostComponent'
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import Face from '@mui/icons-material/Face';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import { formatDistanceToNow } from 'date-fns';

const HomePage = () => {

  const [allPosts , setallPost]=useState([]);
  let getAllPosts= async()=>{
    let res = await fetch('http://localhost:8090/posts/all');
    let data = await res.json();
    console.log(data)
    console.log(data.posts)
    setallPost(data.posts)
  }

 
  useEffect(()=>{
    getAllPosts();
  },[])

  return (
    <div>
      
      <PostComponent />
      {
        allPosts.map((ele, i) => {
            return <Card
      variant="outlined"
      sx={{margin:'40px auto', minWidth: 300,maxWidth:400, '--Card-radius': (theme) => theme.vars.radius.xs }}
    >
      <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              m: '-2px',
              borderRadius: '50%',
              background:
                'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
            },
          }}
        >
          <Avatar
            size="sm"
            src={ele.userId.profilePic}
            sx={{ p: 0.5, border: '2px solid', borderColor: 'background.body' }}
          />
        </Box>
        <Typography sx={{ fontWeight: 'lg' }}>{ele.userId.name}</Typography>
        <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
          <MoreHoriz />
        </IconButton>
      </CardContent>
      <CardOverflow>
        {/* <AspectRatio sx={}> */}
          <img className='h-[350px] object-contain object-center' src={`http://localhost:8090/uploads/${ele.file}`} alt="" loading="lazy" />
        {/* </AspectRatio> */}
      </CardOverflow>
      <CardContent orientation="horizontal" sx={{ alignItems: 'center', mx: -1 }}>
        <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
          <IconButton variant="plain" color="neutral" size="sm">
            <FavoriteBorder />
          </IconButton>
          <IconButton variant="plain" color="neutral" size="sm">
            <ModeCommentOutlined />
          </IconButton>
          <IconButton variant="plain" color="neutral" size="sm">
            <SendOutlined />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mx: 'auto' }}>
          {[...Array(5)].map((_, index) => (
            <Box
              key={index}
              sx={[
                {
                  borderRadius: '50%',
                  width: `max(${6 - index}px, 3px)`,
                  height: `max(${6 - index}px, 3px)`,
                },
                index === 0
                  ? { bgcolor: 'primary.solidBg' }
                  : { bgcolor: 'background.level3' },
              ]}
            />
          ))}
        </Box>
        <Box sx={{ width: 0, display: 'flex', flexDirection: 'row-reverse' }}>
          <IconButton variant="plain" color="neutral" size="sm">
            <BookmarkBorderRoundedIcon />
          </IconButton>
        </Box>
      </CardContent>
      <CardContent>
        <Link
          component="button"
          underline="none"
          textColor="text.primary"
          sx={{ fontSize: 'sm', fontWeight: 'lg' }}
        >
          {ele.likes.length} Likes
        </Link>
        <Typography sx={{ fontSize: 'sm' }}>
          <Link
            component="button"
            color="neutral"
            textColor="text.primary"
            sx={{ fontWeight: 'lg' }}
          >
           
          </Link>{' '}
          {ele.title}
        </Typography>
        <Link
          component="button"
          underline="none"
          startDecorator="…"
          sx={{ fontSize: 'sm', color: 'text.tertiary' }}
        >
          more
        </Link>
        <Link
          component="button"
          underline="none"
          sx={{ fontSize: '10px', color: 'text.tertiary', my: 0.5 }}
        >
          {formatDistanceToNow(new Date(ele.createdAt), { addSuffix: true })}
        </Link>
      </CardContent>
      <CardContent orientation="horizontal" sx={{ gap: 1 }}>
        <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
          <Face />
        </IconButton>
        <Input
          variant="plain"
          size="sm"
          placeholder="Add a comment…"
          sx={{ flex: 1, px: 0, '--Input-focusedThickness': '0px' }}
        />
        <Link disabled underline="none" role="button">
          Post
        </Link>
      </CardContent>
    </Card>
        })
      }
    </div>
  )
}

export default HomePage
