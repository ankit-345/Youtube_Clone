import React, { useEffect, useState } from "react";
import axios from "axios";
import { abbreviateNumber } from "js-abbreviation-number";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import Time from "../../shared/Time";
import { feed_url } from "../../shared/Api";
import VideoCard from "../../components/Cards/videoCard/VideoCard";

const VideoRecommend = ({ id }) => {
  const [videoRecommend, setVideoRecommend] = useState([]);
  const [pageToken, setPageToken] = useState("");

  const getRelatedVideos = async () => {
    try {
      const res = await axios.get(
        `${feed_url}${pageToken}&key=${process.env.REACT_APP_API_KEY}`,
      );
      setVideoRecommend(res.data.items);
      // console.log(res.data.items);
      setPageToken(res.data.nextPageToken);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMoreVideoRecommend = async () => {
    try {
      const res = await axios.get(
        `${feed_url}${pageToken}&key=${process.env.REACT_APP_API_KEY}`,
      );
      setVideoRecommend(videoRecommend.concat(res.data.items));
      setPageToken(res.data.nextPageToken);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    setVideoRecommend([]);
    getRelatedVideos();
  }, [id]);

  return (
    <div className="w-full h-full md:p-4 py-4">
      <InfiniteScroll
        dataLength={videoRecommend.length}
        next={fetchMoreVideoRecommend}
        hasMore={videoRecommend.length !== 160 ? true : false}
        loader={
          <ColorRing
            visible={true}
            wrapperStyle={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          />
        }
        style={{ overflow: "hidden" }}
      >
        {videoRecommend.map((item) => (
          <>
            <div
              className="hidden md:grid grid-cols-2 items-center justify-start w-full mb-1"
              key={item?.id}
            >
              <Link to={`/watch/${item?.id}`}>
                {" "}
                <div
                  className={`relative h-[5.5rem] w-[85%] mx-auto bg-gray-50 rounded-2xl bg-center mb-2 cursor-pointer`}
                >
                  <img
                    src={item?.snippet?.thumbnails?.high?.url}
                    alt={item?.snippet?.localized?.title}
                    className="w-full h-full rounded-lg object-cover"
                  />
                </div>
              </Link>
              <div className="flex items-start flex-col h-full">
                <Link to={`/watch/${item?.id}`}>
                  <h3 className="text-white font-medium line-clamp-2 h-11 text-sm cursor-pointer">
                    {item?.snippet?.localized?.title}
                  </h3>
                </Link>
                <h4 className="text-gray-300 text-xs hover:text-white pb-1 cursor-pointer">
                  {item?.snippet?.channelTitle}
                </h4>
                <span className="flex text-gray-300 text-xs">
                  <p>
                    {Number(item?.statistics?.viewCount) / 1000 <= 1000
                      ? abbreviateNumber(item?.statistics?.viewCount, 0)
                      : abbreviateNumber(item?.statistics?.viewCount, 2)}{" "}
                    views
                  </p>
                  <div className="h-4 px-1 pb-1 flex justify-center items-center">
                    <p className="font-bold">.</p>
                  </div>
                  {
                    <Time
                      time={moment(
                        new Date(item?.snippet?.publishedAt),
                      ).fromNow()}
                    />
                  }
                </span>
              </div>
            </div>
            <div className="md:hidden">
              <VideoCard
                videoId={item?.id}
                snippet={item?.snippet}
                statistics={item?.statistics}
                contentDetails={item?.contentDetails}
                key={item?.etag}
              />
            </div>
          </>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default VideoRecommend;
