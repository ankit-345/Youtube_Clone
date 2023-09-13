import React, { useState } from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from 'react-router-dom'
import MyProvider from './components/Context/useContext';
import Feed from './Pages/feed/Feed';
import SingleVideo from './Pages/single_video/SingleVideo';
import Header from './components/header/Header';
import SearchMovie from './Pages/SearchMovie/SearchMovie';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
// import LeftSection from './components/left_section/LeftSection';

const App = () => {
  const [menuSwitch, setMenuSwitch] = useState(false);

  const handletext = (para) =>{   // here is the problem, toggle functionality is not working properly.
    setMenuSwitch(para)        // its working fine, till (para), but when para is assigned to 
    // console.log(para);            // menuSwitch state its not working.

  }

  // console.log(menuSwitch);

  const Layout = () =>{
    return (
      <div className='bg-background-black w-full h-full text-white'>
        <Header handletext={handletext} />
        <ScrollToTop />
        <div className='font-base'>
          <Outlet />
        </div>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
              <MyProvider>
                <Layout />
              </MyProvider>
      ),
      children: [
        {
          path: '/',
          element: <Feed  menuSwitch={menuSwitch} setMenuSwitch={setMenuSwitch}/>
        },
        {
          path: '/watch/:id',
          element: <SingleVideo />
        },
        {
        path: '/results/:type',
        element: <SearchMovie menuSwitch={menuSwitch}/>
        },
      ]
    },
   
  ])

  return (
    <> 
      <RouterProvider router={router} />
    </>
  )
}

export default App