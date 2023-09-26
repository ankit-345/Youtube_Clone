import React, { useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import MyProvider from "./components/Context/useContext";
import Feed from "./Pages/feed/Feed";
import WatchLater from "./Pages/WatchLater/WatchLater";
import SingleVideo from "./Pages/single_video/SingleVideo";
import Header from "./components/header/Header";
import SearchMovie from "./Pages/SearchMovie/SearchMovie";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

const App = () => {
  const [menuSwitch, setMenuSwitch] = useState(false);

  const handletext = (para) => {
    setMenuSwitch(para);
  };

  const Layout = () => {
    return (
      <div className="bg-background-black w-full h-full text-white">
        <Header handletext={handletext} />
        <ScrollToTop />
        <div className="font-base">
          <Outlet />
        </div>
      </div>
    );
  };

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
          path: "/",
          element: (
            <Feed menuSwitch={menuSwitch} setMenuSwitch={setMenuSwitch} />
          ),
        },
        {
          path: "/watch/:id",
          element: (
            <SingleVideo
              menuSwitch={menuSwitch}
              setMenuSwitch={setMenuSwitch}
            />
          ),
        },
        {
          path: "/results/:type",
          element: <SearchMovie menuSwitch={menuSwitch} />,
        },
        {
          path: "/watchlater",
          element: (
            <WatchLater menuSwitch={menuSwitch} setMenuSwitch={setMenuSwitch} />
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
