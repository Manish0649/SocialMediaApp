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
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        py: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: '500px',
          mx: 'auto',
        }}
      >
        <Box sx={{ mb: 3 }}>
          <PostComponent />
        </Box>

        {
          allPosts.map((ele, i) => {
            return (
              <Card
                key={i}
                variant="outlined"
                sx={{
                  margin: '24px auto',
                  minWidth: 300,
                  maxWidth: 420,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.06)',
                  '--Card-radius': '16px',
                }}
              >
                <CardContent
                  orientation="horizontal"
                  sx={{
                    alignItems: 'center',
                    gap: 1.2,
                    px: 2,
                    py: 1.5,
                  }}
                >
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
                      sx={{
                        p: 0.5,
                        width: 40,
                        height: 40,
                        border: '2px solid',
                        borderColor: 'background.body'
                      }}
                    />
                  </Box>

                  <Typography
                    sx={{
                      fontWeight: 'lg',
                      fontSize: '15px',
                      color: '#111827',
                    }}
                  >
                    {ele.userId.name}
                  </Typography>

                  <IconButton
                    variant="plain"
                    color="neutral"
                    size="sm"
                    sx={{
                      ml: 'auto',
                      borderRadius: '50%',
                    }}
                  >
                    <MoreHoriz />
                  </IconButton>
                </CardContent>

                <CardOverflow
                  sx={{
                    backgroundColor: '#f3f4f6',
                  }}
                >
                  <img
                    className='h-[380px] w-full object-cover object-center'
                    src={`http://localhost:8090/uploads/${ele.file}`}
                    alt=""
                    loading="lazy"
                    style={{ display: 'block' }}
                  />
                </CardOverflow>

                <CardContent
                  orientation="horizontal"
                  sx={{
                    alignItems: 'center',
                    px: 1,
                    py: 1,
                  }}
                >
                  <Box sx={{ width: 0, display: 'flex', gap: 0.3 }}>
                    <IconButton
                      variant="plain"
                      color="neutral"
                      size="sm"
                      sx={{
                        '&:hover': {
                          color: '#ef4444',
                          backgroundColor: 'transparent',
                        },
                      }}
                    >
                      <FavoriteBorder />
                    </IconButton>
                    <IconButton
                      variant="plain"
                      color="neutral"
                      size="sm"
                      sx={{
                        '&:hover': {
                          color: '#2563eb',
                          backgroundColor: 'transparent',
                        },
                      }}
                    >
                      <ModeCommentOutlined />
                    </IconButton>
                    <IconButton
                      variant="plain"
                      color="neutral"
                      size="sm"
                      sx={{
                        '&:hover': {
                          color: '#7c3aed',
                          backgroundColor: 'transparent',
                        },
                      }}
                    >
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
                            ? { bgcolor: '#6366f1' }
                            : { bgcolor: '#d1d5db' },
                        ]}
                      />
                    ))}
                  </Box>

                  <Box sx={{ width: 0, display: 'flex', flexDirection: 'row-reverse' }}>
                    <IconButton
                      variant="plain"
                      color="neutral"
                      size="sm"
                      sx={{
                        '&:hover': {
                          color: '#f59e0b',
                          backgroundColor: 'transparent',
                        },
                      }}
                    >
                      <BookmarkBorderRoundedIcon />
                    </IconButton>
                  </Box>
                </CardContent>

                <CardContent
                  sx={{
                    px: 2,
                    pt: 0.2,
                    pb: 1.5,
                  }}
                >
                  <Link
                    component="button"
                    underline="none"
                    textColor="text.primary"
                    sx={{
                      fontSize: '14px',
                      fontWeight: 'lg',
                      color: '#111827',
                      mb: 0.7,
                    }}
                  >
                    {ele.likes.length} Likes
                  </Link>

                  <Typography
                    sx={{
                      fontSize: '14px',
                      color: '#374151',
                      lineHeight: 1.5,
                    }}
                  >
                    <Link
                      component="button"
                      color="neutral"
                      textColor="text.primary"
                      sx={{
                        fontWeight: 'lg',
                        mr: 0.7,
                        textDecoration: 'none',
                      }}
                    >
                      {ele.userId.name}
                    </Link>
                    {ele.title}
                  </Typography>

                  <Link
                    component="button"
                    underline="none"
                    startDecorator="…"
                    sx={{
                      fontSize: '13px',
                      color: '#6b7280',
                      mt: 0.6,
                    }}
                  >
                    more
                  </Link>

                  <Link
                    component="button"
                    underline="none"
                    sx={{
                      display: 'block',
                      fontSize: '11px',
                      color: '#9ca3af',
                      my: 0.8,
                      textTransform: 'uppercase',
                      letterSpacing: '0.4px',
                    }}
                  >
                    {formatDistanceToNow(new Date(ele.createdAt), { addSuffix: true })}
                  </Link>
                </CardContent>

                <CardContent
                  orientation="horizontal"
                  sx={{
                    gap: 1,
                    px: 1.5,
                    py: 1.2,
                    borderTop: '1px solid #f1f5f9',
                    alignItems: 'center',
                  }}
                >
                  <IconButton
                    size="sm"
                    variant="plain"
                    color="neutral"
                    sx={{ ml: -0.5 }}
                  >
                    <Face />
                  </IconButton>

                  <Input
                    variant="plain"
                    size="sm"
                    placeholder="Add a comment…"
                    sx={{
                      flex: 1,
                      px: 0,
                      fontSize: '14px',
                      '--Input-focusedThickness': '0px',
                      '&::before': {
                        display: 'none',
                      },
                    }}
                  />

                  <Link
                    underline="none"
                    role="button"
                    sx={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#2563eb',
                      cursor: 'pointer',
                    }}
                  >
                    Post
                  </Link>
                </CardContent>
              </Card>
            )
          })
        }
      </Box>
    </Box>
  )
}

export default HomePage