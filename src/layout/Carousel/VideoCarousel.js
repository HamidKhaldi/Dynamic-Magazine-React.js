import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import useWindowSize from "../../hooks/useWindowSize";
import VideoCard from "../../layout/Video/VideoCard";

const VideoCarousel = ({ videosArr }) => {
  const [videosList, setvideosList] = useState(videosArr);
  const scrollContainer = useRef(null);
  const [slideCount, setslideCount] = useState(0);
  const [maxSlideCount, setMaxSlideCount] = useState(0);
  const [screenAdjustInt, setScreenAdjustInt] = useState();
  const [dynamicSlideCount, setDynamicSlideCount] = useState();
  const size = useWindowSize();
  const [hasVoted, setHasVoted] = useState();
  const [xrequestDigest, setXrequestDigest] = useState("");
 
  useEffect(() => {
    //console.log("hasVoted on landing ", hasVoted);
  }, [hasVoted]);

  useEffect(() => {
    let tmpScreenAdjustInt;

    if (size.width > 900) {
      tmpScreenAdjustInt = 3;
    } else if (size.width <= 900 && size.width > 540) {
      tmpScreenAdjustInt = 2;
    } else {
      tmpScreenAdjustInt = 1;
    }

    const tmpDynamicSlideCount = Math.ceil(
      videosList.length / tmpScreenAdjustInt
    );
    setDynamicSlideCount(tmpDynamicSlideCount);
    tmpScreenAdjustInt === 2
      ? setMaxSlideCount(Math.ceil(videosList.length / tmpScreenAdjustInt))
      : setMaxSlideCount(Math.ceil(videosList.length / tmpScreenAdjustInt) - 1);
  }, [size, videosList, dynamicSlideCount]);

  useEffect(() => {
    if (size.width > 1400) {
      setScreenAdjustInt(4);
    } else if (size.width < 1300 && size.width > 900) {
      setScreenAdjustInt(3);
    }
    // //console.log("screenAdjustInt", screenAdjustInt);
  }, [screenAdjustInt]);

  const handleClickIcon = (direction) => {
    if (direction === "left" && slideCount > 0) {
      const newSlideCount = slideCount - 1;
      setslideCount(newSlideCount);
      scrollContainer.current.style.transform = `translate3d(-${
        newSlideCount * 28
      }rem, 0px, 0px)`;
    } else if (direction === "right" && slideCount <= maxSlideCount) {
      const newSlideCount = slideCount + 1;
      setslideCount(newSlideCount);
      scrollContainer.current.style.transform = `translate3d(-${
        newSlideCount * 28
      }rem, 0px, 0px)`;
    }
  };

  const voteHandler = async (videoDetails) => {
    if (!hasVoted) {
      try {
        const response = await axios.post(
          "siteUrl/_api/web/lists/getByTitle('Lst_Carousel-People-Video')/items(" +
            videoDetails.ID +
            ")",
          {
            Votes: videoDetails.Votes + 1,
            __metadata: {
              type: "SP.Data.Lst_x005f_CarouselPeopleVideoListItem",
            },
          },
          {
            headers: {
              Accept: "application/json;odata=verbose",
              "Content-Type": "application/json;odata=verbose",
              "X-RequestDigest": xrequestDigest,
              "X-HTTP-Method": "MERGE",
              "If-Match": "*",
            },
          }
        );
        setHasVoted(true);
        //console.log("vote added!", response);
        videoDetails.hasVoted = true;
        sessionStorage.setItem("hasVoted", "true");
        //console.log("videoDetails in carousel ", videoDetails);
      } catch (error) {
        console.error("error", JSON.stringify(error));
      }
    }
  };

  useEffect(() => {
    const url =
      "siteUrl/_api/contextinfo";

    const requestDigestPostSettings = {
      method: "POST",
      headers: new Headers({
        accept: "application/json;odata=verbose",
      }),
    };

    fetch(url, requestDigestPostSettings)
      .then((response) => response.json())
      .then((data) => {
        const requestDigestValue =
          data.d.GetContextWebInformation.FormDigestValue;
        setXrequestDigest(requestDigestValue);
      })
      .catch((error) => {
        console.error("Error fetching contextinfo:", error);
      });
  }, []);

  return (
    <section className="fsot__video-carousel-section">
      <div className="fsot__video-carousel-indicator indicator-left">
        {slideCount > 0 && (
          <div className="fsot__video-carousel-indicator indicator-left">
            <svg
              className="fsot__carousel-indicator-icon icon-left"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={() => handleClickIcon("left")}
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </div>
        )}
      </div>
      <div className="fsot__video-carousel-indicator indicator-right">
        {slideCount <= maxSlideCount && (
          <div className="fsot__video-carousel-indicator indicator-right">
            <svg
              className="fsot__carousel-indicator-icon icon-right"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={() => handleClickIcon("right")}
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        )}
      </div>
      <div className="fsot__video-carousel-wrapper-outer">
        <div className="fsot__video-carousel-inner">
          <ul ref={scrollContainer} className="fsot__video-carousel-list">
            {videosList.map((item) => {
              return (
                item &&
                item.ID && (
                  <li className="fsot__video-carousel-list--item" key={item.ID}>
                    <VideoCard
                      voteHandler={voteHandler}
                      hasVoted={hasVoted}
                      videoDetails={item}
                    />
                  </li>
                )
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default VideoCarousel;
