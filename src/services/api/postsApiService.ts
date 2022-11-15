import axios from 'axios'
import {Post, PostsList} from '../../types/posts'

type PostsResponse = PostsList
type PostResponse = Post

const postsApiClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export const getPosts = async () => {
    return postsApiClient.get<PostsResponse>('/posts')
}

export const getPostById = async (id: string) => {
    return postsApiClient.get<PostResponse>(`/posts/${id}`)
}

export const createPost = async (post: Omit<Post, 'id'>) => {
    return postsApiClient.post('/posts', post)
}

export const editPost = async (id: string, post: Post) => {
    return postsApiClient.put(`/posts/${id}`, post)
}

export const deletePost = async (id: string) => {
    return postsApiClient.delete(`/posts/${id}`)
}

