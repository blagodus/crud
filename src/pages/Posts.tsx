import React, {Fragment, useEffect, useState} from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {Button, Divider, List, ListItem, ListItemText} from '@mui/material'
import {Link as RouterLink} from 'react-router-dom'
import {getPosts} from '../services/api/postsApiService'
import {PostsList} from '../types/posts'
import Loader from '../components/Loader'

const Posts = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState<PostsList | null>(null)

    useEffect(() => {
        getPosts().then(({data}) => {
            setPosts(data)
            setIsLoading(false)
        })
    }, [])

    return isLoading ? (
        <Loader />
    ) : (
        <Box
            color={'grey'}
            sx={{
                width: '100%',
                padding: '48px 0',
            }}>
            <Typography
                variant="h2"
                color="text.primary"
                sx={{ textAlign: 'center'}}
                gutterBottom>
                Posts
            </Typography>

            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {posts?.map((post) => (
                    <Fragment key={post.id}>
                        <ListItem
                            alignItems="flex-start"
                            secondaryAction={
                                <Button
                                    component={RouterLink}
                                    to={`/details/${post.id}`}
                                    state={post}
                                    color="inherit">Edit</Button>
                            }>
                            <ListItemText
                                primary={
                                    <Typography
                                        color="text.primary"
                                        variant="h5"
                                    >
                                        {post.title}
                                    </Typography>
                                }
                                secondary={
                                    <React.Fragment>
                                        <Typography variant="body1">
                                            {post.body}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider />
                    </Fragment>
                ))}
            </List>
        </Box>
    )
}

export default Posts
