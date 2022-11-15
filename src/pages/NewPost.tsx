import React, {useState} from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { LoadingButton } from '@mui/lab'
import {createPost} from '../services/api/postsApiService'
import {useNavigate} from 'react-router-dom'
import {useForm, FormProvider} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import zod,{TypeOf} from 'zod'
import FormInput from '../components/FormInput'

const createPostSchema = zod.object({
    title: zod.string()
        .min(7, 'Title is required and must have at least 7 characters.')
        .max(32, 'Title must be less than 100 characters.'),
    body: zod.string()
        .min(32, 'Body is required and must have at least 32 characters.')
        .max(128,'Body must be less than 128 characters.'),
})

type CreatePostForm = TypeOf<typeof createPostSchema>

const NewPost = () => {
    const navigate = useNavigate()
    const [inProgress, setInProgress] = useState(false)

    const formMethods = useForm<CreatePostForm>({
        resolver: zodResolver(createPostSchema),
    })

    const {
        reset,
        handleSubmit,
    } = formMethods

    const onSubmitHandler = async (data: CreatePostForm) => {
        // Disable submit button until request is in progress
        setInProgress(true)

        const post = {
            ...data,
            userId: 1
        }

        createPost(post)
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

    return (
        <Box sx={{
            width: '100%',
            padding: '48px 0',
        }}>
            <Typography variant="h2" sx={{ textAlign: 'center'}} gutterBottom>
                Create New Post
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
                    onSubmit={handleSubmit(onSubmitHandler)}
                >
                    <FormInput
                        id="title"
                        name="title"
                        label="Title"
                        // defaultValue={''}
                        required
                        fullWidth
                    />

                    <FormInput
                        id="body"
                        name="body"
                        label="Body"
                        rows={4}
                        // defaultValue={''}
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
                            loading={inProgress}
                        >
                            Create
                        </LoadingButton>
                    </Box>
                </Box>
            </FormProvider>
        </Box>
    )
}

export default NewPost

