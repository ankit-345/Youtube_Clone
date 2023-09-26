import React, { useEffect, useState } from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";
import Time from "../../../shared/Time";
import { channel_url } from "../../../shared/Api";

const SearchMovieCard = ({ videoId, snippet }) => {
  const [channelInfo, setChannelInfo] = useState([]);

  const getChannelData = async () => {
    try {
      const res = await axios.get(
        `${channel_url}${snippet?.channelId}&key=${process.env.REACT_APP_API_KEY}`,
      );
      setChannelInfo(res?.data?.items[0]);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    getChannelData();
  }, []);

  return (
    <>
      <div className=" block md:grid grid-cols-3 items-center justify-start w-[100%] mb-6 md:mb-3">
        <Link to={`/watch/${videoId}`}>
          <div
            className={`relative h-56 md:h-[185px] mx-auto bg-gray-50 rounded-xl bg-center mb-2 cursor-pointer`}
          >
            <img
              src={snippet?.thumbnails?.high?.url}
              alt={snippet?.title}
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
        </Link>
        <div className="flex items-start flex-col h-full ml-4 text-gray-300 col-start-2 col-end-4 ">
          <Link to={`/watch/${videoId}`}>
            <h3 className="text-white font-medium text-base cursor-pointer">
              {snippet?.title}
            </h3>
          </Link>
          <span className="flex text-xs mb-4">
            <p>
              {abbreviateNumber(channelInfo?.statistics?.viewCount, 0)} views
            </p>
            <div className="h-4 px-1 pb-1 flex justify-center items-center">
              <p className="font-bold">.</p>
            </div>
            {<Time time={moment(new Date(snippet?.publishedAt)).fromNow()} />}
          </span>
          <div className="flex items-center mb-3">
            <div className="rounded-full h-8 w-8 mr-2 overflow-hidden cursor-pointer">
              <img
                src={channelInfo?.snippet?.thumbnails?.default?.url}
                alt={channelInfo?.snippet?.title}
                className="h-full w-full object-cover"
              />
            </div>
            <h4 className="text-sm hover:text-white cursor-pointer">
              {snippet?.channelTitle}
            </h4>
          </div>
          <p className="hidden md:block text-xs">{snippet?.description}</p>
        </div>
      </div>
    </>
  );
};

export default SearchMovieCard;
