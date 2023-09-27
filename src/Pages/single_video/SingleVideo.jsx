import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import commaNumber from "comma-number";
import { abbreviateNumber } from "js-abbreviation-number";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faBell,
  faEllipsis,
  faShare,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import VideoRecommend from "../../components/video_recommend/VideoRecommend";
import Comment from "../../components/Comments/Comment";
import Time from "../../shared/Time";
import { single_Video_url, channel_url } from "../../shared/Api";
import LeftSection from "../../components/left_section/LeftSection";

const SingleVideo = ({ menuSwitch, setMenuSwitch }) => {
  const [videoInfo, setVideoInfo] = useState([]);
  const [channelInfo, setChannelInfo] = useState([]);
  const [subscribeBtn, setSubscribeBtn] = useState(false);
  const [descriptionBtn, setDescriptionBtn] = useState(false);
  const [commentsBtn, setCommentsBtn] = useState(false);
  const { id } = useParams();

  const getVideo = async () => {
    try {
      const res = await axios.get(
        `${single_Video_url}${id}&key=${process.env.REACT_APP_API_KEY}`,
      );
      setVideoInfo(res?.data?.items[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const getChannelData = async () => {
    try {
      const res = await axios.get(
        `${channel_url}${videoInfo?.snippet?.channelId}&key=${process.env.REACT_APP_API_KEY}`,
      );
      setChannelInfo(res?.data?.items[0]);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    getVideo();
    getChannelData();
  }, [id, videoInfo?.snippet?.channelId]);

  const handleSubscribe = () => {
    setSubscribeBtn((prevState) => !prevState);
  };

  const handleDescription = () => {
    setDescriptionBtn((prevState) => !prevState);
  };

  return (
    // <div className="relative flex ">
    //   <div
    //     className={`z-40 absolute md:hidden top-0 left-0 ${
    //       menuSwitch ? "bg-black/60" : "hidden"
    //     } h-full w-full`}
    //   ></div>
    //   <LeftSection menuSwitch={menuSwitch} setMenuSwitch={setMenuSwitch} />
      <div className="relative max-w-6xl mx-auto mt-7 text-white md:flex ">
        <div className="w-full md:w-[62.5%] mb-6 ">
            <iframe
              className="md:rounded-xl aspect-video w-full h-auto md:w-[716px] md:h-[403px] sticky md:relative top-[61px] md:top-auto z-30"
              src={`https://www.youtube.com/embed/${id}`}
              title={videoInfo?.snippet?.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          <div>
            <h2 className="text-lg font-bold mt-3 mb-4 px-3 md:px-0">
              {videoInfo?.snippet?.title}
            </h2>
            <div className="block md:flex justify-between">
              <div className="flex justify-between">
                <div className="flex">
                  <div className="rounded-full bg-gray-400 h-8 w-8 mr-2 overflow-hidden">
                    <img
                      src={channelInfo?.snippet?.thumbnails?.medium?.url}
                      alt={channelInfo?.snippet?.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base">
                      {videoInfo?.snippet?.channelTitle}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {abbreviateNumber(
                        channelInfo?.statistics?.subscriberCount,
                        1,
                      )}{" "}
                      subscribers
                    </p>
                  </div>
                </div>
                <div
                  className={`rounded-2xl  ${
                    subscribeBtn
                      ? "bg-gray-50 bg-opacity-5 hover:bg-opacity-10"
                      : ""
                  } h-9 flex items-center p-4 ml-4  cursor-pointer `}
                  onClick={handleSubscribe}
                >
                  {subscribeBtn ? (
                    <>
                      <FontAwesomeIcon icon={faBell} />
                      <button className="border-none px-2 text-sm ">
                        Subscribed
                      </button>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </>
                  ) : (
                    <button className="rounded-2xl border-none bg-white h-8 w-full px-4 text-sm text-black">
                      Subscribe
                    </button>
                  )}
                </div>
              </div>
              <div className="flex bold mt-3 px-4 md:px-0 md:mt-0 ">
                <div className="flex items-center p-4 h-9 rounded-l-2xl border-r-[1px] border-gray-100 hover:bg-opacity-10 bg-gray-50 bg-opacity-5 cursor-pointer">
                  <FontAwesomeIcon icon={faThumbsUp} className="pr-2" />
                  <p className="text-sm">
                    {abbreviateNumber(videoInfo?.statistics?.likeCount, 0)}
                  </p>
                </div>
                <div className="rounded-r-2xl p-4 hover:bg-opacity-10 h-9 flex items-center bg-gray-50 bg-opacity-5 cursor-pointer">
                  <FontAwesomeIcon icon={faThumbsDown} />
                </div>

                <div className="rounded-2xl bg-gray-50 bg-opacity-5 h-9 flex items-center p-4 mx-4 hover:bg-opacity-10">
                  <FontAwesomeIcon icon={faShare} />
                  <button className="border-none bg-transparent px-2 text-sm">
                    Share
                  </button>
                </div>
                <div className="rounded-full bg-gray-50 bg-opacity-5 h-9 w-9 flex justify-center items-center hover:bg-opacity-10 cursor-pointer" >
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
              </div>
            </div>
          </div>

          {/* Description  */}
          <div
            className={`relative ${
              descriptionBtn ? "h-auto" : "h-36"
            } w-[97%] md:w-full bg-gray-50 bg-opacity-10 p-4 my-4 rounded-xl text-white mx-auto md:mx-0`}
          >
            <div className="flex items-center text-base font-semibold">
              {descriptionBtn ? (
                <>
                  <p className="mr-2">
                    {commaNumber(videoInfo?.statistics?.viewCount)} views
                  </p>
                  <p>
                    {moment(videoInfo?.snippet?.publishedAt).format(
                      "MMM DD, YYYY",
                    )}
                  </p>
                </>
              ) : (
                <>
                  <p className="mr-2">
                    {abbreviateNumber(videoInfo?.statistics?.viewCount, 0)}{" "}
                    views
                  </p>
                  {
                    <Time
                      time={moment(
                        new Date(videoInfo?.snippet?.publishedAt),
                      ).fromNow()}
                    />
                  }
                </>
              )}
            </div>
            <p
              className={`${
                descriptionBtn ? "line-clamp-none pb-8" : "line-clamp-3"
              } h-[65%]`}
            >
              {videoInfo?.snippet?.localized?.description}
            </p>
            <button
              className="border-none bg-transparent absolute bottom-2 text-white font-semibold"
              onClick={handleDescription}
            >
              {descriptionBtn ? "show less" : "show more"}
            </button>
          </div>

          <div
            className={`${
              commentsBtn
                ? "h-auto overflow-visible"
                : "h-36 overflow-hidden bg-gray-50 bg-opacity-10 mx-2"
            } rounded-xl md:rounded-none md:bg-transparent md:h-full md:overflow-visible md:mx-0`}
          >
            <div
              className={`text-lg mb-3 px-2 pt-4 md:px-0 md:pt-0 sticky md:relative ${
                commentsBtn
                  ? "top-[32%] md:top-auto bg-background-black"
                  : "top-[0%] md:top-auto"
              } z-10 flex md:block justify-between items-center `}
            >
              <p>31789 Comments</p>
              <button
                className="border-none bg-transparent md:hidden"
                onClick={() => setCommentsBtn((prevState) => !prevState)}
              >
                {commentsBtn ? "show less" : "show more"}{" "}
              </button>
            </div>
            <Comment id={id} />
          </div>

          <div className="block md:hidden md:w-[100% - 62.5%] w-full">
            <VideoRecommend id={id} />
          </div>
        </div>

        <div className="hidden md:block md:w-[100% - 62.5%] w-full">
          <VideoRecommend id={id} />
        </div>
      </div>
    // </div>
  );
};

export default SingleVideo;
