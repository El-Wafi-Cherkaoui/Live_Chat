import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store_&_userSlice.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.tsx'
import Layout from './components/Layout.tsx'
import NewRoom from './pages/NewRoom.tsx'
import JoinRoom from './pages/JoinRoom.tsx'

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                index: true,
                element: <Login/>
            },
            {
                path: "dashboard",
                element: <Layout/>,
                children: [
                    {
                        path: "new_room",
                        element: <NewRoom/>
                    },
                    {
                        path: "join_room",
                        element: <JoinRoom/>
                    }
                ]
            }
        ]
    }
])
createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)
