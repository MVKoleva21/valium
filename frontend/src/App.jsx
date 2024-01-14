import React from 'react'
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './routes/Home'
import Protected from './components/Protected'
import SignIn from './routes/SignIn'
import SignUp from './routes/SignUp'
import Wills from './routes/Wills'
import FinilizeAccout from './routes/FinalizeAccount'
import Wallet from './routes/Wallet'
import Will from './routes/Will'

export default function App() {
  const BrowserRouter = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/accounts/signin', element: <SignIn /> },
    { path: '/accounts/signup', element: <SignUp /> },
    { path: '/accounts/finilize', element: <FinilizeAccout /> },
    { path: '/wills', element: <Protected> <Wills /> </Protected>},
    { path: '/wallet', element: <Protected> <Wallet /> </Protected>},
    { path: '/will', element: <Protected> <Will /> </Protected>}
  ])

  return (
    <RouterProvider router={BrowserRouter}/>
  )
};
