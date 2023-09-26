import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { ColorRing } from "react-loader-spinner";
import { comment_url } from "../../shared/Api";
import Time from "../../shared/Time";

const Comment = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [pageToken, setPageToken] = useState("");

  const getComments = async () => {
    try {
      const res = await axios.get(
        `${comment_url}${pageToken}&videoId=${id}&key=${process.env.REACT_APP_API_KEY}`,
      );
      setComments(res?.data?.items);
      setPageToken(res?.data?.nextPageToken);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMoreData = async () => {
    try {
      const res = await axios.get(
        `${comment_url}${pageToken}&videoId=${id}&key=${process.env.REACT_APP_API_KEY}`,
      );
      setComments(comments.concat(res?.data?.items));
      setPageToken(res?.data?.nextPageToken);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getComments();
  }, [id]);

  return (
    <>
      <div className="py-3 px-2 md:px-0">
        {/* <div className='text-lg mb-3'>{comments.length} Comments</div> */}
        <InfiniteScroll
          dataLength={comments.length}
          next={fetchMoreData}
          hasMore={true}
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
        >
          {comments.map((item) => (
            <div className="flex items-start text-white mb-7" key={item?.id}>
              <div className="w-[5%] mr-4 pt-1">
                <div className="rounded-full h-8 w-8 overflow-hidden">
                  <img
                    src={
                      item?.snippet?.topLevelComment?.snippet
                        ?.authorProfileImageUrl
                    }
                    alt={
                      item?.snippet?.topLevelComment?.snippet?.authorDisplayName
                    }
                    className="h-full w-full bg-gray-500"
                  />
                </div>
              </div>
              <div className="w-[95%]">
                <div className="flex items-center pb-[2px]">
                  <h2 className="mr-3 text-sm">
                    {item?.snippet?.topLevelComment?.snippet?.authorDisplayName}
                  </h2>
                  <div className="text-xs text-gray-400">
                    {" "}
                    {
                      <Time
                        time={moment(
                          new Date(
                            item?.snippet?.topLevelComment?.snippet?.publishedAt,
                          ),
                        ).fromNow()}
                      />
                    }{" "}
                  </div>
                </div>
                <div className="pb-2">
                  <p className="text-sm">
                    {item?.snippet?.topLevelComment?.snippet?.textOriginal}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="flex items-center mr-5">
                    <FontAwesomeIcon icon={faThumbsUp} className="pr-1" />
                    <p className="text-sm">254</p>
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faThumbsDown} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Comment;
