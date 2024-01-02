import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TalentModal from "../../components/Modal/TalentModal";
import heartIcon from "../../assets/images/heart-icon.png";
import rightIcon from "../../assets/images/indicator-right.png";
import placeholder from "../../assets/images/cake.png";

import { useMediaString } from "../../hooks/usePathString";
import { useCheckBase64Image } from "../../hooks/useBaseImage";
import { useTracking } from "react-tracking";
import { isProduction } from "../../hooks/usePathString";

const TalentCard = ({ talentItem }) => {
 
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [updatedVotes, setUpdatedVotes] = useState(talentItem.Votes);

  const updateVotes = async (talentItem) => {
    //console.log('triggered');
    setUpdatedVotes(prevVotes => prevVotes + 1);

    if (isProduction){
      try {
        const responseGet = await axios.get(
          `siteUrl/_api/web/lists/getByTitle('Lst_Talent-People')/items('${talentItem.ID}')`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response get", responseGet.data.Votes);
        if(responseGet.data.Votes !== updatedVotes ) {
          await updateVotes(talentItem);
        }
      } catch (error) {
        console.error("Error updating votes:", error);
      }
    }
    
  };

  useEffect(() => {
    //console.log("talentItem", talentItem);
  }, [talentItem]);

  const { trackEvent } = useTracking();
  const openModalHandler = () => {
    setShowQuoteModal(true);
  };

  const closeModalHandler = () => {
    setShowQuoteModal(false);
  };

  const mediaPath = useMediaString();
  const heartSrc = useCheckBase64Image(heartIcon)
    ? heartIcon
    : mediaPath + heartIcon;

  const rightArrowSrc = useCheckBase64Image(rightIcon)
    ? rightIcon
    : mediaPath + rightIcon;

  const placeholderSrc = useCheckBase64Image(placeholder)
    ? placeholder
    : mediaPath + placeholder;

  //console.log("TalentCard rendered");
  return (
    <>
      <div className="fsot__talent-card">
        {talentItem.userDetails && <><p className="fsot__talent-card-name">{talentItem.userDetails.Title}</p>
        <p className="fsot__talent-card-country">
          {talentItem.userDetails.User_x002d_country}
        </p></> }
        <div className="fsot__talent-card-title">{talentItem.Title}</div>
        {talentItem.Thumbnail && <div
          className="fsot__talent-card-img-cont"
          style={{ backgroundImage: `url(${talentItem.Thumbnail.Url})` }}
        ></div>}
        <ul className="fsot__talent-card-bottom-list">
          <li className="fsot__talent-card-bottom-list--item">
            <img
              className="fsot__talent-card-like-icon"
              src={heartSrc}
              alt="heart-icon"
            />
            <span className="fsot__talent-card-like-span">{updatedVotes}</span>
          </li>
          <li className="fsot__talent-card-bottom-list--item">
            <Link
              onClick={() => {
                openModalHandler();
                trackEvent({
                  component: talentItem.Title,
                  event: "talent-modal",
                });
              }}
              className="fsot__talent-card-readmore-link"
            >
              <span className="fsot__talent-card-readmore">
                Read more and vote
              </span>
              <img
                className="fsot__talent-card-right-icon"
                src={rightArrowSrc}
                alt="right-icon"
              />
            </Link>
          </li>
        </ul>
      </div>
      <TalentModal
        talentItem={talentItem}
        hasVoted={updateVotes}
        show={showQuoteModal}
        close={closeModalHandler}
      />
    </>
  );
};

export default TalentCard;
