// 'http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=avenger&key= => for categories

import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import LeftSection from "../../components/left_section/LeftSection";
import VideoCard from "../../components/Cards/videoCard/VideoCard";
import CardUI from "../../components/Shimmer/CardUI";
import { feed_url } from "../../shared/Api";

const Feed = ({ menuSwitch, setMenuSwitch }) => {
  const [feed, setFeed] = useState([]);
  const [pageToken, setPageToken] = useState("");

  const getData = async () => {
    try {
      const res = await axios.get(
        `${feed_url}${pageToken}&key=${process.env.REACT_APP_API_KEY}`,
      );
      setFeed(res?.data?.items);
      // console.log(res.data.items)
      setPageToken(res?.data?.nextPageToken);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const fetchMoreData = async () => {
    try {
      const res = await axios.get(
        `${feed_url}${pageToken}&key=${process.env.REACT_APP_API_KEY}`,
      );
      setFeed(feed.concat(res?.data?.items));
      setPageToken(res.data.nextPageToken);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const AddWatchLater = (e, video) => {
    e.preventDefault();
    const oldVideoList =
      JSON.parse(localStorage.getItem("FavouriteVideo")) || [];
    const newVideoList = [...oldVideoList, video];
    localStorage.setItem("FavouriteVideo", JSON.stringify(newVideoList));
  };

  return (
    <>
      <div className="relative flex">
        <div
          className={`z-40 absolute md:hidden top-0 left-0 ${
            menuSwitch ? "bg-black/60" : "hidden"
          } h-full w-full`}
        ></div>
        <LeftSection menuSwitch={menuSwitch} setMenuSwitch={setMenuSwitch} />
        <div className="px-0 md:px-6 md:pt-8 pt-0 flex-1">
          <InfiniteScroll
            dataLength={feed.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<CardUI />}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 gap-y-4">
              {feed.map((item) => (
                <VideoCard
                  videoId={item?.id}
                  snippet={item?.snippet}
                  statistics={item?.statistics}
                  contentDetails={item?.contentDetails}
                  handleWatchLater={AddWatchLater}
                  key={item?.etag}
                />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default Feed;
