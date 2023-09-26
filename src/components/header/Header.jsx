import React, { useContext, useState } from "react";
import img from "../../images/yt-logo.png";
import Search from "../SearchBar/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faMagnifyingGlass,
  faMicrophone,
  faBars,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { myContext } from "../Context/useContext";

const Header = ({ handletext }) => {
  const { searchText } = useContext(myContext);
  const [sideSectionSwitch, setSideSectionSwitch] = useState(undefined);
  const navigate = useNavigate();

  const handleSwitch = () => {
    handletext((sideSectionSwitch) => !sideSectionSwitch); // Pass the updated value directly
  };

  return (
    <div className="flex justify-between items-center px-0 md:px-2 py-3 sticky top-0 bg-background-black z-50">
      <div className="h-6 flex justify-center items-center">
        <div
          className="h-9 w-9 rounded-full hover:bg-gray-50 hover:bg-opacity-10 ml-3 mr-1 md:mx-3 flex justify-center items-center cursor-pointer"
          onClick={handleSwitch}
        >
          <FontAwesomeIcon icon={faBars} className="fill-gray-50 mx-10" />
        </div>
        <Link to="/" className="h-full w-full">
          {" "}
          <img src={img} className="h-full w-full" alt="youtube logo" />{" "}
        </Link>
      </div>
      <div className="w-1/2 flex pl-2 md:pl-0">
        <div className="w-full md:w-[90%] border-[1px] border-[#353232] border-solid rounded-3xl flex md:justify-center md:items-center">
          <Search />
          <span
            className="h-9 w-[20%] md:w-9 rounded-r-3xl flex-1 bg-gray-50 bg-opacity-5 flex justify-center items-center cursor-pointer"
            onClick={() => navigate(`/results/${searchText}`)}
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="fill-gray-50"
            />
          </span>
        </div>
        <div className="hidden h-9 w-9 rounded-full bg-gray-50 bg-opacity-10 mx-3 md:flex justify-center items-center">
          <FontAwesomeIcon icon={faMicrophone} className="fill-gray-50" />
        </div>
      </div>
      <div className="flex">
        <div className="h-10 w-10 rounded-full hover:bg-gray-50 hover:bg-opacity-10 ml-2 mr-1 md:mx-3 flex justify-center items-center cursor-pointer">
          <FontAwesomeIcon icon={faBell} className="fill-gray-50" />
        </div>
        <div className="h-10 w-10 rounded-full mr-2 md:mx-3 cursor-pointer flex justify-center items-center">
          <FontAwesomeIcon
            icon={faCircleUser}
            className="fill-gray-50 h-[50%] w-[50%]"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
