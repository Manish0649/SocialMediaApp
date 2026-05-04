import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
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
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  let getAllPosts= async()=>{
    try {
      setLoading(true);
      let res = await fetch('https://socialmediaapp-aqir.onrender.com/posts/all');
      let data = await res.json();
      console.log(data)
      console.log(data.posts)
      setallPost(data.posts || [])
    } catch (error) {
      console.error('Error fetching posts:', error);
      setallPost([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    getAllPosts();
  },[])

  // Filter posts based on search query
  useEffect(() => {
    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const filtered = (allPosts || []).filter((post) => {
        if (!post) return false;
        const titleMatch = post.title?.toLowerCase().includes(query);
        const userMatch = post.userId?.name?.toLowerCase().includes(query);
        return titleMatch || userMatch;
      });
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(allPosts || []);
    }
  }, [searchQuery, allPosts])

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
        px: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: '500px',
          mx: 'auto',
        }}
      >
        {/* Show search results info */}
        {searchQuery && (
          <Box
            sx={{
              mb: 3,
              p: 2.5,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
              borderRadius: '16px',
              border: '2px solid rgba(168, 85, 247, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              animation: 'slideUp 0.5s ease-out',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 12px 40px rgba(168, 85, 247, 0.2)',
                transform: 'translateY(-2px)',
              }
            }}
          >
            <Typography sx={{ fontSize: '14px', color: '#6b7280', mb: 0.5, fontWeight: 600 }}>
              🔍 Search results for: <strong style={{ color: '#667eea', fontSize: '15px' }}>"{searchQuery}"</strong>
            </Typography>
            <Typography sx={{ fontSize: '13px', color: '#9ca3af' }}>
              ✨ {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'} found
            </Typography>
          </Box>
        )}

        {loading ? (
          <Box
            sx={{
              mb: 3,
              p: 4,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.8))',
              borderRadius: '16px',
              border: '2px solid rgba(168, 85, 247, 0.15)',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              animation: 'slideUp 0.5s ease-out',
            }}
          >
            <Typography sx={{ fontSize: '16px', color: '#667eea', fontWeight: 600, animation: 'pulse 2s ease-in-out infinite' }}>
              ⏳ Loading posts...
            </Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ mb: 3, animation: 'fadeInUp 0.6s ease-out' }}>
              <PostComponent />
            </Box>

            {filteredPosts.length === 0 && searchQuery ? (
              <Card
                variant="outlined"
                sx={{
                  margin: '24px auto',
                  minWidth: 300,
                  maxWidth: 420,
                  borderRadius: '20px',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                  border: '2px solid rgba(168, 85, 247, 0.2)',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)',
                  textAlign: 'center',
                  p: 4,
                  animation: 'slideUp 0.6s ease-out',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 50px rgba(168, 85, 247, 0.2)',
                  }
                }}
              >
                <Typography sx={{ fontSize: '32px', mb: 1 }}>🔭</Typography>
                <Typography sx={{ fontSize: '18px', color: '#667eea', mb: 1, fontWeight: 700 }}>
                  No posts found
                </Typography>
                <Typography sx={{ fontSize: '14px', color: '#9ca3af' }}>
                  Try searching with different keywords
                </Typography>
              </Card>
            ) : (
              filteredPosts.filter(post => post && post.userId).map((ele, i) => {
            return (
              <Card
                key={i}
                variant="outlined"
                sx={{
                  margin: '24px auto',
                  minWidth: 300,
                  maxWidth: 420,
                  borderRadius: '20px',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(255,255,255,0.92))',
                  border: '2px solid rgba(168, 85, 247, 0.15)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  '--Card-radius': '20px',
                  animation: 'slideUp 0.6s ease-out',
                  animationDelay: `${i * 0.1}s`,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: '0 20px 50px rgba(168, 85, 247, 0.2)',
                    background: 'linear-gradient(135deg, rgba(255,255,255,1), rgba(255,255,255,0.95))',
                    border: '2px solid rgba(168, 85, 247, 0.3)',
                  }
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
                      src={ele.userId?.profilePic || ''}
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
                    {ele.userId?.name || 'Anonymous'}
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
                  {ele.file && (
                    <img
                      className='h-95 w-full object-cover object-center'
                      src={`https://socialmediaapp-aqir.onrender.com/uploads/${ele.file}`}
                      alt=""
                      loading="lazy"
                      style={{ display: 'block' }}
                    />
                  )}
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
                    {(ele.likes?.length || 0)} Likes
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
                      {ele.userId?.name || 'Anonymous'}
                    </Link>
                    {ele.title || 'Untitled'}
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
                    {ele.createdAt ? formatDistanceToNow(new Date(ele.createdAt), { addSuffix: true }) : 'Recently'}
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
        )}
          </>
        )}
      </Box>
    </Box>
  )
}

export default HomePage