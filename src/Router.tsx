import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom'
import App from './App'
import Posts from './pages/Posts'
import NewPost from './pages/NewPost'
import PostDetails from './pages/PostDetails'

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Posts />} />
                <Route path="new" element={<NewPost />} />
                <Route path="details/:postId" element={<PostDetails />} />
            </Route>
        </Routes>
    </BrowserRouter>
)

export default Router
