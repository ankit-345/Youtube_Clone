import React, { useEffect, useState } from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faClock,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import Time from "../../../shared/Time";
import { channel_url } from "../../../shared/Api";

const VideoCard = ({
  videoId,
  snippet,
  statistics,
  contentDetails,
  handleWatchLater,
}) => {
  const [channelInfo, setChannelInfo] = useState([]);
  const [iconHover, setIconHover] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const video = {
    videoId,
    snippet,
    statistics,
    contentDetails,
    handleWatchLater,
  };

  const location = useLocation().pathname;

  const getChannelData = async () => {
    try {
      const res = await axios.get(
        `${channel_url}${snippet?.channelId}&key=${process.env.REACT_APP_API_KEY}`,
      );
      setChannelInfo(res?.data?.items[0]?.snippet);
      // console.log(res?.data?.items)
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    getChannelData();
  }, [videoId]);

  return (
    <>
      <div className="md:p-3 py-3">
        <Link to={`/watch/${videoId}`}>
          <div
            className={`relative h-56 md:h-48 mx-auto bg-gray-300 md:rounded-xl bg-center mb-2 cursor-pointer`}
          >
            <img
              src={snippet?.thumbnails?.high?.url}
              alt={snippet?.localized?.title}
              className="w-full h-full rounded-lg object-cover"
            />
          </div>
        </Link>
        <div className="flex px-2">
          <div className="rounded-full h-8 w-8 mr-2 overflow-hidden cursor-pointer">
            <img
              src={channelInfo?.thumbnails?.default?.url}
              alt={channelInfo?.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div
            className="w-full flex-1"
            onMouseEnter={() => setIconHover(true)}
            onMouseLeave={() => setIconHover(false)}
          >
            <div className="flex justify-between items-start w-full relative">
              <Link to={`/watch/${videoId}`} className="flex-1">
                <h3 className="text-white pb-1 font-semibold cursor-pointer text-base md:line-clamp-2 md:h-12 line-clamp-none">
                  {snippet?.localized?.title}
                </h3>
              </Link>
              { 
                <div
                  className={`${
                    iconHover ? "visible" : "visible md:invisible"
                  } rounded-full hover:bg-gray-50 hover:bg-opacity-5 md:h-9 md:w-9 h-6 w-6 flex justify-center items-center cursor-pointer`}
                  onClick={() => setIsDropdown((prevState) => !prevState)}
                >
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>
              }
              {isDropdown && (
                <div
                  className="absolute top-0 right-10 w-56 bg-gray-700 p-2 z-10 rounded-xl"
                  onClick={() => setIsDropdown(false)}
                >
                  <div
                    className="flex justify-start items-center hover:bg-gray-50 hover:bg-opacity-10 pr-4 pl-[6px] py-2 rounded-xl cursor-pointer"
                    onClick={(e) => handleWatchLater(e, video)}
                  >
                    <FontAwesomeIcon icon={faClock} />
                    <p className="pl-4 text-base flex-1">
                      {location === "/watchlater"
                        ? "Remove from Watch Later"
                        : "Save to Watch Later"}
                    </p>
                  </div>
                  <div className="flex justify-start items-center hover:bg-gray-50 hover:bg-opacity-10 pr-4 pl-[6px] py-2 rounded-xl cursor-pointer">
                    <FontAwesomeIcon icon={faShare} />
                    <p className="pl-4 text-base flex-1">Share</p>
                  </div>
                </div>
              )}
            </div>
            <h4 className="text-gray-300 text-sm hover:text-white cursor-pointer font-normal">
              {snippet?.channelTitle}
            </h4>
            <span className="flex text-gray-300 text-sm font-normal">
              <p>
                {Number(statistics?.viewCount) / 1000 <= 1000
                  ? abbreviateNumber(statistics?.viewCount, 0)
                  : abbreviateNumber(statistics?.viewCount, 2)}{" "}
                views
              </p>
              <div className="h-4 px-1 pb-1 flex justify-center items-center font-bold">
                <p>.</p>
              </div>
              {<Time time={moment(new Date(snippet.publishedAt)).fromNow()} />}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
