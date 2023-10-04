import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import SearchPage from './pages/SearchPage'
import SavedBooks from './pages/SavedBooks'
import Profile from './pages/Profile.jsx'
import Games from './pages/Games.jsx'
import SingleGame from './pages/SingleGame.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        path: '/saved',
        element: <SavedBooks />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/games',
        element: <Games />
      },
      {
        path: '/single',
        element: <SingleGame />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
