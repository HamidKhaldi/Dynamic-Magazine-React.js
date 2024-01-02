import React, { useEffect } from "react";
import ReactDom from "react-dom";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

import { useMediaString } from "../../hooks/usePathString";
import { useCheckBase64Image } from "../../hooks/useBaseImage";
import VideoComp from "../../layout/Video/Video";
import closeIcon from "../../assets/images/close.png";
const VideoModal = ({ videoDetails, show, close }) => {
  const removeInlineStyling = () => {
    var parentElement = document.getElementsByClassName(
      "fsot__video-card-intro"
    );
    ////console.log('parentElement', parentElement);
    var childElements = parentElement[0].getElementsByTagName("*");

    for (var i = 0; i < childElements.length; i++) {
      childElements[i].removeAttribute("style");
    }
  };

  useEffect(() => {
    // //console.log("videoDetails ", videoDetails);
    removeInlineStyling();
  }, [videoDetails]);

  const mediaPath = useMediaString();
  const closeImgSrc = useCheckBase64Image(closeIcon)
    ? closeIcon
    : mediaPath + closeIcon;

  const sanitizedContent = DOMPurify.sanitize(videoDetails.Video_x002d_Summary);

  return ReactDom.createPortal(
    <>
      <div className={`modal_wrapper ${show ? "show" : ""}`}>
        <div className="fsot__video-modal-cont">
          <Link onClick={() => close()} className="fsot__video-modal-close">
            <img
              src={closeImgSrc}
              className="fsot__video-modal-close"
              alt="close"
            />
          </Link>
          {!videoDetails.Image_x002d_Link && !videoDetails.Video_x002d_Id ? (
            <div className="fsot__video-modal-noMedia-content">
              <h3 className="fsot__video-card-title">
                {videoDetails.Title}
              </h3>
              <div className="fsot__video-modal-content">
              {parse(sanitizedContent)}
              </div>
            </div>
          ) : videoDetails.Video_x002d_Media === false ? (
            <div className="fsot__video-modal-innner">
              <img
                src={videoDetails.Image_x002d_Link}
                className="fsot__video-modal-media"
                alt={videoDetails.Title}
              />
              <div className="fsot__video-modal-content">
                <h3 className="fsot__video-card-title">{videoDetails.Title}</h3>
                <div
                  id="fsot__video-card-intro"
                  className="fsot__video-card-intro"
                >
                  {parse(sanitizedContent)}
                </div>
              </div>
            </div>
          ) : (
            <div className="fsot__video-modal-innner">
              <div className="fsot__video-modal-video">
                <VideoComp
                  videoId={videoDetails.Video_x002d_Id}
                  videoTitle={videoDetails.Title}
                  className="fsot__modal-video"
                />
              </div>
              <div className="fsot__video-modal-content">
                <h3 className="fsot__video-card-title">{videoDetails.Title}</h3>
                <div
                  id="fsot__video-card-intro"
                  className="fsot__video-card-intro"
                >
                  {parse(sanitizedContent)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>,
    document.getElementById("videoModal")
  );
};

export default VideoModal;
