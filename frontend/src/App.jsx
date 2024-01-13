import React from 'react'
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './routes/Home'
import Protected from './components/Protected'

export default function App() {
  const BrowserRouter = createBrowserRouter([
    { path: '/', element: <Home /> },
  ])

  return (
    <RouterProvider router={BrowserRouter}/>
  )
};
