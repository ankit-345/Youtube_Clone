import React from "react";

const Time = ({ time }) => {
  const resetTime = () => {
    let videoTime = time.split(" ");
    if (videoTime[0] === "a" || videoTime[0] === "an") {
      videoTime[0] = "1";
    }
    videoTime = videoTime.join(" ");
    return videoTime;
  };

  return <p className="font-normal">{resetTime()}</p>;
};

export default Time;
