import React from 'react'
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './routes/Home'
import Protected from './components/Protected'
import SignIn from './routes/SignIn'
import SignUp from './routes/SignUp'
import Services from './routes/Services'
import FinilizeAccout from './routes/FinalizeAccount'
import Wallet from './routes/Wallet'
import Will from './routes/Will'
import Account from './routes/Account'
import Wills from './routes/Wills';
import Inbox from './routes/Inbox'

export default function App() {
  const BrowserRouter = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/accounts/signin', element: <SignIn /> },
    { path: '/accounts/signup', element: <SignUp /> },
    { path: '/accounts/finilize', element: <FinilizeAccout /> },
    { path: '/services', element: <Protected> <Services /> </Protected>},
    { path: '/wallet', element: <Protected> <Wallet /> </Protected>},
    { path: '/will', element: <Protected> <Will /> </Protected>},
    { path: '/account', element: <Protected> <Account /> </Protected>},
    { path: '/wills', element: <Protected> <Wills /> </Protected> },
    { path: '/inbox', element: <Protected> <Inbox /> </Protected> }
  ])

  return (
    <RouterProvider router={BrowserRouter}/>
  )
}
