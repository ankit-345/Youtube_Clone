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
  const [filter, setFilter] = useState(false);
  const [filterOption, setFilterOption] = useState({
    sortBy: {
      any: true,
      today: false,
      thisWeek: false,
      thisMonth: false,
    },
  });

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
      <div
        className={`fixed top-[33%] left-[40%] rounded-xl bg-gray-700 p-4 w-96 z-70 ${
          filter ? "block" : "hidden"
        }`}
      >
        <h3 className="mb-3">Search Filters</h3>
        <h2>Sort By</h2>
        <p className="h-[1px] bg-white w-18 mt-1"></p>
        {Object.keys(filterOption).map((filterType) =>
          Object.keys(filterOption[filterType]).map((filterItem) =>
            console.log(filterItem),
          ),
        )}
      </div>
      {/* <div className={`fixed top-0 left-0 bg-black/10 h-full w-full z-60 ${filter ? 'block' : 'hidden'}`}></div> */}
      <div className="flex">
        <LeftSection menuSwitch={menuSwitch} setMenuSwitch={setMenuSwitch} />
        <div className="flex-1 max-w-6xl md:mx-auto">
          {/* <div className='flex justify-end items-center cursor-pointer w-[80%]' onClick={() => setFilter(prevState => !prevState)}>
                        <button className='hover:bg-gray-50 hover:bg-opacity-10 rounded-2xl py-1 px-6'>Filter</button>
                    </div> */}
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
