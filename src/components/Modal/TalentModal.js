import React, { useState, useEffect, useCallback } from "react";
import ReactDom from "react-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Profile from "../../layout/Profile/Profile";
import Carousel from "react-bootstrap/Carousel";
import VideoComp from "../../layout/Video/Video";
import closeIcon from "../../assets/images/close-dark.png";
import parse from "html-react-parser";
import { isProduction } from "../../hooks/usePathString";

import { useMediaString } from "../../hooks/usePathString";
import { useCheckBase64Image } from "../../hooks/useBaseImage";

const TalentModal = ({ talentItem, hasVoted, show, close }) => {
  //console.log("talentItem", talentItem);
  const [voted, setVoted] = useState(false);
  const [xrequestDigest, setXrequestDigest] = useState("");
  const [carouselPaused, setCarouselPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [votesArr, setVotesArr] = useState();

  useEffect(() => {
    console.log("Cookies.get", Cookies.get("voteArr"));
  }, [Cookies.get("voteArr")]);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const mediaPath = useMediaString();
  const closeImgSrc = useCheckBase64Image(closeIcon)
    ? closeIcon
    : mediaPath + closeIcon;

  const pauseCarousel = () => {
    setCarouselPaused(true);
  };

  const unPauseCarousel = () => {
    setCarouselPaused(false);
  };

  useEffect(() => {}, [carouselPaused]);

  useEffect(() => {
    if (isProduction) {
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
    }
  }, []);
  
  const voteHandler = useCallback(
    async (talentItem) => {
      try {
        const currentVotesArrString = Cookies.get("voteArr");
        const currentVotesArr = currentVotesArrString ? JSON.parse(currentVotesArrString) : [];
        console.log("votesArr inside voteHandler", currentVotesArr);
  
        if (currentVotesArr.indexOf(talentItem.ID) < 0) {
          const newVotesArr = [...currentVotesArr, talentItem.ID];
          Cookies.set("voteArr", JSON.stringify(newVotesArr), { expires: 365 });
          console.log("Cookies arr ", JSON.parse(Cookies.get("voteArr")));
  
          setVoted(true);
          hasVoted(talentItem);
  
          const response = await axios.post(
            `siteUrl/_api/web/lists/getByTitle('Lst_Talent-People')/items(${talentItem.ID})`,
            {
              Votes: talentItem.Votes + 1,
              __metadata: {
                type: "SP.Data.Lst_x005f_TalentPeopleListItem",
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
  
          console.log("vote added!", response);
          talentItem.Voted = true;
        }
      } catch (error) {
        console.error("Error in voteHandler:", error);
      }
    },
    [xrequestDigest]
  );


  return ReactDom.createPortal(
    <>
      <div className={`modal_wrapper ${show ? "show" : ""}`}>
        <div className="fsot__talent-modal-cont">
          <Link
            onClick={() => {
              close();
            }}
            className="fsot__talent-modal-close"
          >
            <img
              src={closeImgSrc}
              className="fsot__tatent-modal-close-img"
              alt="close"
            />
          </Link>
          <div className="fsot__talent-carousel-cont">
            <Carousel
              className="fsot__talent-carousel"
              interval={null}
              activeIndex={activeIndex}
              onSelect={handleSelect}
            >
              {(talentItem.Slide_x002d_1_x002d_Video_x002d_ === true ||
                talentItem.Slide_x002d_1_x002d_Img) && (
                <Carousel.Item
                  active={`${activeIndex === 0}`}
                  onMouseEnter={pauseCarousel}
                  onMouseLeave={unPauseCarousel}
                  className="fsot__talent-carousel--item"
                >
                  {talentItem.Slide_x002d_1_x002d_Video_x002d_ === false &&
                  talentItem.Slide_x002d_1_x002d_Img ? (
                    <img
                      className="fsot__talent-carousel-img"
                      src={talentItem.Slide_x002d_1_x002d_Img.Url}
                      alt="slide 1"
                    />
                  ) : (
                    show &&
                    activeIndex === 0 && (
                      <VideoComp
                        // pauseCarousel={pauseCarousel}
                        videoId={talentItem.Slide_x002d_1_x002d_Video_x002d_0}
                        videoTitle={`${talentItem.userDetails.Title} video`}
                        className="fsot__modal-video"
                      />
                    )
                  )}
                </Carousel.Item>
              )}
              {talentItem.Slide_x002d_2_x002d_Img && (
                <Carousel.Item
                  active={`${activeIndex === 1}`}
                  className="fsot__talent-carousel--item"
                >
                  <img
                    className="fsot__talent-carousel-img"
                    src={talentItem.Slide_x002d_2_x002d_Img.Url}
                    alt="slide 2"
                  />
                </Carousel.Item>
              )}
              {talentItem.Slide_x002d_3_x002d_Img && (
                <Carousel.Item
                  active={`${activeIndex === 2}`}
                  className="fsot__talent-carousel--item"
                >
                  <img
                    className="fsot__talent-carousel-img"
                    src={talentItem.Slide_x002d_3_x002d_Img.Url}
                    alt="slide 3"
                  />
                </Carousel.Item>
              )}
            </Carousel>
            <div className="fsot__talent-radio-cont">
              {(Cookies.get("voteArr") ? Cookies.get("voteArr").indexOf(talentItem.ID) < 0 : true) && (
                <input
                  type="radio"
                  name={`vote_${talentItem.ID}`}
                  id={`vote_${talentItem.ID}`}
                  disabled={false}
                  checked={voted}
                  className="fsot__talent-radio-input"
                  onChange={() => {
                    voteHandler(talentItem);
                  }}
                />
              )}
              <label
                className="fsot__talent-radio-label"
                htmlFor={`vote_${talentItem.ID}`}
              >
                {talentItem.userDetails &&
                  (Cookies.get("voteArr") && Cookies.get("voteArr").indexOf(talentItem.ID) > -1
                    ? "Thank you for your vote!"
                    : "Cast your vote for " + talentItem.userDetails.Title)}
              </label>
            </div>
          </div>
          <div className="fsot__talent-text-cont">
            {talentItem.userDetails && (
              <Profile
                authorDetails={talentItem.userDetails}
                className="fsot__talent-profile"
              />
            )}
            <h3 className="fsot__talent-text-heading">{talentItem.Title}</h3>
            {talentItem.Description && (
              <div className="fsot__talent-text">
                {parse(talentItem.Description)}
              </div>
            )}
          </div>
        </div>
      </div>
    </>,
    document.getElementById("talentModal")
  );
};

export default TalentModal;
