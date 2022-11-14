import React, {SyntheticEvent, useEffect, useState} from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {Post} from '../types/posts'
import {deletePost, editPost, getPostById} from '../services/api/postsApiService'
import FormInput from '../components/FormInput'
import {LoadingButton} from '@mui/lab'
import {FormProvider, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import zod, {TypeOf} from 'zod'

const editPostSchema = zod.object({
    id: zod.number()
        .min(1),
    userId: zod.number()
        .min(1),
    title: zod.string()
        .min(7, 'Title is required and must have at least 7 characters.')
        .max(256, 'Title must be less than 256 characters.'),
    body: zod.string()
        .min(32, 'Body is required and must have at least 32 characters.')
        .max(512,'Body must be less than 512 characters.'),
})

type EditPostForm = TypeOf<typeof editPostSchema>

const PostDetails = () => {
    const { postId } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const [post, setPost] = useState<Post | null>(location.state)
    const [inProgress, setInProgress] = useState(false)

    const formMethods = useForm<EditPostForm>({
        resolver: zodResolver(editPostSchema),
    })

    const {
        reset,
        handleSubmit
    } = formMethods

    useEffect(() => {
        if (location.state === null && postId !== undefined) {
            getPostById(postId).then(({data}) => {
                setPost(() => {
                    reset(data)
                    return data
                })
            })
        } else {
            reset(post as Post)
        }
    }, [])

    const editPostHandler = (formData: EditPostForm) => {
        // Disable submit button until request is in progress
        setInProgress(true)

        editPost(postId as string, formData)
            .then(() => {
                // enable submit button
                setInProgress(false)
                // reset the form
                reset()
                // navigate back to posts page
                navigate('/')
            })
            .catch(() => {
                // enable submit button
                setInProgress(false)
            })
    }

    const deletePostHandler = async (event: SyntheticEvent) => {
        event.preventDefault()
        if (postId) {
            deletePost(postId.toString()).then(() => {
                navigate('/')
            })
        }
    }

    return (
        <Box sx={{
            width: '100%',
            padding: '48px 0',
        }}>
            <Typography variant="h2" sx={{ textAlign: 'center'}} gutterBottom>
                Post Details
            </Typography>

            <FormProvider {...formMethods}>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                    onSubmit={handleSubmit(editPostHandler)}
                >
                    <FormInput
                        id="id"
                        name="id"
                        type="hidden"
                        required
                        sx={{
                            display: 'none'
                        }}
                    />

                    <FormInput
                        id="userId"
                        name="userId"
                        type="hidden"
                        required
                        sx={{
                            display: 'none'
                        }}
                    />

                    <FormInput
                        id="title"
                        name="title"
                        label="Title"
                        required
                        fullWidth
                    />

                    <FormInput
                        id="body"
                        name="body"
                        label="Body"
                        rows={4}
                        required
                        fullWidth
                        multiline
                    />

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '20px'
                        }}
                    >
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            endIcon={<EditIcon />}
                            loading={inProgress}
                        >
                        Edit
                        </LoadingButton>
                        <LoadingButton
                            onClick={deletePostHandler}
                            loading={inProgress}
                            endIcon={<DeleteIcon />}
                        >
                        Delete
                        </LoadingButton>
                    </Box>
                </Box>
            </FormProvider>
        </Box>
    )
}

export default PostDetails
