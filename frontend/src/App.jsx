import React from 'react'
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './routes/Home'
import Protected from './components/Protected'
import SignIn from './routes/SignIn'
import SignUp from './routes/SignUp'
import Wills from './routes/Wills'

export default function App() {
  const BrowserRouter = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/signin', element: <SignIn /> },
    { path: '/signup', element: <SignUp /> },
    { path: '/wills', element: <Wills /> }
  ])

  return (
    <RouterProvider router={BrowserRouter}/>
  )
};
