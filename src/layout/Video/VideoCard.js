import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

import { useMediaString } from "../../hooks/usePathString";
import videoPlaceholder from "../../assets/images/rectangle.png";
import chevron from "../../assets/images/right-chevron.png";
import Profile from "../Profile/Profile";
import VideoModal from "../../components/Modal/VideoModal";
import VideoComp from "./Video";
import { useCheckBase64Image } from "../../hooks/useBaseImage";

const VideoCard = ({ voteHandler, hasVoted, videoDetails }) => {

  //console.log('videoDetails ', videoDetails);
  //console.log('hasVoted ', hasVoted);

  hasVoted ? localStorage.setItem('hasVoted', 'true') : localStorage.setItem('hasVoted', 'false');
  //console.log('sessionStorage', sessionStorage.getItem('hasVoted'));
  
  const mediaPath = useMediaString();
  const [showVideoModal, setShowVideoModal] = useState(false);
  const sanitizedContent = DOMPurify.sanitize(videoDetails.Video_x002d_Summary);
  const videoImgSrc = useCheckBase64Image(videoPlaceholder)
    ? videoPlaceholder
    : mediaPath + videoPlaceholder;
  const chevronImgSrc = useCheckBase64Image(chevron)
    ? chevron
    : mediaPath + chevron;

  const openModalHandler = () => {
    setShowVideoModal(true);
  };

  const closeModalHandler = () => {
    setShowVideoModal(false);
  };

  return (
    <>
      <div className="fsot__video-card-section">
        <Profile
          theme="dark"
          authorDetails={videoDetails.userDetails}
          style={{ paddingLeft: "0", paddingRight: "0" }}
        />
        <div className="fsot__video-card-cont">
          {videoDetails.Video_x002d_Media === false ? (
            <img
              src={videoDetails.Image_x002d_Link}
              className="fsot__video-card-media"
              alt="video-placeholder"
            />
          ) : (
            <div className="fsot__video-modal-video">
              <VideoComp
                videoId={videoDetails.Video_x002d_Id}
                className="fsot__modal-video"
              />
            </div>
          )}
        </div>
        <h3 className="fsot__video-card-title">{videoDetails.Title}</h3>
        <div className="fsot__video-card-intro">{parse(sanitizedContent)}</div>
        <Link onClick={openModalHandler} className="fsot__video-card-readmore">
          <img
            src={chevronImgSrc}
            className="fsot__video-card-chevron"
            alt="chevron"
          />{" "}
          Read more
        </Link>
        {((hasVoted || sessionStorage.getItem('hasVoted')) &&
          videoDetails.hasVoted) ? (
            <div className="fsot__radio-button">
              <input
                type="radio"
                name={`vote_${videoDetails.ID}`}
                id={`vote_${videoDetails.ID}`}
                disabled={true}
                checked={true}
              />
              <label
                className="fsot__radio-label fsot__voted-for-label"
                htmlFor={`vote_${videoDetails.ID}`}
              >
                <span className="fsot__voted-for-span">
                  Voted for {videoDetails.userDetails ? videoDetails.userDetails.Title: 'this candidate'}
                </span>
              </label>
            </div>
          ) : ((hasVoted || sessionStorage.getItem('hasVoted')) &&
            !videoDetails.hasVoted) ? (
              <div className="fsot__radio-button">
                <input
                  type="radio"
                  name={`vote_${videoDetails.ID}`}
                  id={`vote_${videoDetails.ID}`}
                  disabled={true}
                />
                <label
                  className="fsot__radio-label fsot__disabled-label"
                  htmlFor={`vote_${videoDetails.ID}`}
                >
                  <span className="fsot__disabled-span">
                    Vote for {videoDetails.userDetails ? videoDetails.userDetails.Title : 'this candidate'}
                  </span>
                </label>
              </div>
            ) : (!hasVoted &&
              !videoDetails.hasVoted) ? (
          <div className="fsot__radio-button">
            <input
              type="radio"
              name={`vote_${videoDetails.ID}`}
              id={`vote_${videoDetails.ID}`}
              onClick={() => {voteHandler(videoDetails)}}
              disabled={false}
            />
            <label
              className={`fsot__radio-label`}
              htmlFor={`vote_${videoDetails.ID}`}
            >
              <span className="fsot__vote-for-span">
                Vote for {videoDetails.userDetails ? videoDetails.userDetails.Title : 'this candidate'}
              </span>
            </label>
          </div>
        ): null}
      </div>
      <VideoModal
        videoDetails={videoDetails}
        show={showVideoModal}
        close={closeModalHandler}
      />
    </>
  );
};

export default VideoCard;
