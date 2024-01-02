import React, { useState, useCallback, useEffect } from "react";

import playBtn from "../../assets/images/play-button.svg";
import { useMediaString } from "../../hooks/usePathString";
import { useCheckBase64Image } from "../../hooks/useBaseImage";

const VideoComp = ({ videoId, videoTitle, hideVideo }) => {
  const mediaPath = useMediaString();
  const btnImgSrc = useCheckBase64Image(playBtn)
    ? playBtn
    : mediaPath + playBtn;

  // //const [isPlaying, setIsPlaying] = useState(false);
  // const videoRef = useRef(null);

  // const playVideo = () => {
  //   //setIsPlaying(true);
  //   videoRef.current.play();
  //   pauseCarousel();
  // };

  // const stopVideo = () => {
  //   //setIsPlaying(false);
  //   videoRef.current.pause();
  // };

  // useEffect(() => {
  //   videoPlaying ? playVideo() : stopVideo();
  // }, [videoPlaying]);

  useEffect(() => {
   
  }, [videoId]);
  
  return (
    <>
      <div className="fsmot__video-wrapper">
        <div className="fsot__intro-video-cont">
          {videoId && !hideVideo && (
            <div
              className="fsot__video-intro-video project-image__itemvideo"
              style={{ maxWidth: "640px" }}
            >
              <div
                className="project-image__iteminner"
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                  overflow: "hidden",
                }}
              >
                <iframe
                  id={videoId}
                  src={`siteUrl/_layouts/15/embed.aspx?UniqueId=${videoId}&embed=%7B%22ust%22%3Atrue%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create`}
                  title={videoTitle}
                  width="640"
                  height="360"
                  allowFullScreen
                  style={{
                    border: "none",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: "100%",
                    maxWidth: "100%",
                  }}
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VideoComp;
