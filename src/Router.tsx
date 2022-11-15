import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom'
import App from './App'
import RouteSuspense from './components/RputeSuspense'
import {delay} from './utils'

// Pages
const Posts = React.lazy(() => delay(500).then(() => import('./pages/Posts')))
const NewPost = React.lazy(() => import('./pages/NewPost'))
const PostDetails = React.lazy(() => import('./pages/PostDetails'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={
                    <RouteSuspense>
                        <Posts />
                    </RouteSuspense>
                } />
                <Route path="new" element={
                    <RouteSuspense>
                        <NewPost />
                    </RouteSuspense>
                } />
                <Route path="details/:postId" element={
                    <RouteSuspense>
                        <PostDetails />
                    </RouteSuspense>
                } />
                <Route path="*" element={
                    <RouteSuspense>
                        <NotFound />
                    </RouteSuspense>
                } />
            </Route>
        </Routes>
    </BrowserRouter>
)

export default Router

