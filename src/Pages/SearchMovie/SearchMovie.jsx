import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LeftSection from "../../components/left_section/LeftSection";
import SearchMovieCard from "../../components/Cards/SearchMovieCard/SearchMovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { ColorRing } from "react-loader-spinner";
import { search_url } from "../../shared/Api";

const SearchMovie = ({ menuSwitch, setMenuSwitch }) => {
  const [searchVideo, setSearchVideo] = useState([]);
  const [pageToken, setPageToken] = useState("");

  const { type } = useParams();

  const getSearchVideo = async () => {
    try {
      const res = await axios.get(
        `${search_url}${pageToken}&q=${type}&key=${process.env.REACT_APP_API_KEY}`,
      );
      console.log(res?.data);
      setPageToken(res?.data?.nextPageToken);
      setSearchVideo(res?.data?.items);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSearchVideo();
  }, [type]);

  const fetchMoreData = async () => {
    try {
      const res = await axios.get(
        `${search_url}${pageToken}&q=${type}&key=${process.env.REACT_APP_API_KEY}`,
      );
      setSearchVideo(searchVideo.concat(res?.data?.items));
      setPageToken(res?.data?.nextPageToken);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <>
      <div className="flex min-h-full bg-background-black">
        <LeftSection menuSwitch={menuSwitch} setMenuSwitch={setMenuSwitch} />
        <div className="flex-1 max-w-6xl md:mx-auto">
          <InfiniteScroll
            dataLength={searchVideo.length}
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
            <div className="px-0 md:px-8 pt-4 w-full">
              {searchVideo.map((item) => (
                <>
                  <SearchMovieCard
                    videoId={item?.id?.videoId}
                    snippet={item?.snippet}
                    key={item?.id?.videoId}
                  />
                </>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default SearchMovie;
