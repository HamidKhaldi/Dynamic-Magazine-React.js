import React from "react";

import VideoComp from "./Video";

const VideoIntro = () => {
  return (
    <>
      <div className="fsot__video-intro-section">
        <div className="fsot__video-intro-left">
          <h3 className="fsot__video-intro-heading">Intro subheading</h3>
          <div className="fsot__video-intro-text">
            Lorem ipsum fusce at dictumst aptent duis porttitor elit consequat
            bibendum semper, varius condimentum duis etiam turpis dictum felis
            faucibus accumsan eleifend. Duis faucibus et fermentum consequat
            morbi risus aenean luctus sem, praesent erat donec dui arcu iaculis
            sed egestas fringilla ac, porta euismod venenatis aenean ut vehicula
            congue varius. Fringilla tempus in dictum imperdiet fusce lacus
            fringilla laoreet cras fringilla torquent condimentum, purus et
            porta lacinia sit pharetra mattis aenean nulla cursus.
          </div>
        </div>
        <div className="fsot__video-intro-right">
          <div className="fsot__video-wrapper-cont">
            <VideoComp />
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoIntro;
