import React, { useEffect, useState } from "react";
import VideoCard from "../../components/Cards/videoCard/VideoCard";
import LeftSection from "../../components/left_section/LeftSection";

const WatchLater = ({ menuSwitch, setMenuSwitch }) => {
  const [watchLaterVideo, setWatchLaterVideo] = useState([]);

  const getVideos = () => {
    let videos = JSON.parse(localStorage.getItem("FavouriteVideo")) || [];

    // remove duplicates
    const uniqueMovies = videos.filter((val, index) => {
      const movieIds = videos.map((val) => val.videoId);
      return movieIds.indexOf(val.videoId) === index;
    });
    setWatchLaterVideo(uniqueMovies);
    localStorage.setItem("FavouriteVideo", JSON.stringify(uniqueMovies));
  };

  useEffect(() => {
    getVideos();
  }, []);

  const removeWatchLater = (e, movie) => {
    e.preventDefault();
    const oldVideoList =
      JSON.parse(localStorage.getItem("FavouriteVideo")) || [];
    const newVideoList = oldVideoList.filter(
      (item) => item.videoId !== movie.videoId,
    );
    localStorage.setItem("FavouriteVideo", JSON.stringify(newVideoList));
    setWatchLaterVideo(newVideoList);
  };

  return (
    <>
      <div className="relative flex min-h-screen">
        <div
          className={`z-40 absolute md:hidden top-0 left-0 ${
            menuSwitch ? "bg-black/60" : "hidden"
          } h-full w-full`}
        ></div>
        <LeftSection menuSwitch={menuSwitch} setMenuSwitch={setMenuSwitch} />
        <div className="px-0 md:px-6 md:pt-8 pt-0 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 gap-y-4">
            {watchLaterVideo.length !== 0 ? (
              watchLaterVideo.map((item) => (
                <VideoCard
                  videoId={item?.videoId}
                  snippet={item?.snippet}
                  statistics={item?.statistics}
                  contentDetails={item?.contentDetails}
                  handleWatchLater={removeWatchLater}
                  key={item?.videoId}
                />
              ))
            ) : (
              <div className="text-white text-center md:col-start-2 md:text-2xl text-base">
                No Favourite Videos Selected
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchLater;
