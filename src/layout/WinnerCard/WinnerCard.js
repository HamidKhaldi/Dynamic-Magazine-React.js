import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QuoteModal from "../../components/Modal/QuoteModal";

import introQuotes from "../../assets/images/intro-quotes.png";
import introQuotesYellow from "../../assets/images/quote-yellow.png";
import { useMediaString } from "../../hooks/usePathString";
import { useCheckBase64Image } from "../../hooks/useBaseImage";
import { useTracking } from "react-tracking";

const WinnerCard = ({ awardWinner, awardType }) => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [hover, setHover] = useState(false);
  ////console.log('awardWinner ', awardWinner);
  const { trackEvent } = useTracking();
  const openModalHandler = () => {
    setShowQuoteModal(true);
  };

  const closeModalHandler = () => {
    setShowQuoteModal(false);
  };

  useEffect(() => {}, [hover]);

  const mediaPath = useMediaString();
  const quotesSrc = useCheckBase64Image(introQuotes)
    ? introQuotes
    : mediaPath + introQuotes;

    const yellowQuotesSrc = useCheckBase64Image(introQuotesYellow)
    ? introQuotesYellow
    : mediaPath + introQuotesYellow;

  const winnerInfo =
    awardType === "Individual" && !hover
      ? { bgColor: "#ffffff" }
      : awardType === "Individual" && hover
      ? { bgColor: "#2e2e38", color: "#ffe600" }
      : awardType === "Team" && !hover
      ? { bgColor: "#c4c4cd" }
      : awardType === "Team" && hover
      ? { bgColor: "#ffe600", color: "#2e2e38" }
      : { bgColor: "#ffffff" };

      const imgSrc = awardType === "Individual" && hover ? yellowQuotesSrc : quotesSrc;  

  return (
    <>
      <div
        className="fsot__award-winner-card"
        style={{ backgroundColor: winnerInfo.bgColor, color: winnerInfo.color }}
        onMouseEnter={(e) => {
          setHover(true);
        }}
        onMouseLeave={(e) => setHover(false)}
      >
        <div className="fsot__award-type">{awardType}</div>
        <img
          src={imgSrc}
          className="fsot__award-quotes-img"
          alt="opening quotes"
        />
        <p className="fsot__award-intro">{awardWinner.Award_x002d_Intro}</p>
        <h2 className="fsot__award-name">{awardWinner.Title}</h2>
        <Link
          onClick={() => {
            openModalHandler();
            trackEvent({
              component: awardWinner.Title,
              event: "award-modal",
            });
          }}
          className="fsot__award-read-more"
          style={{ color: winnerInfo.color }}
        >
          Read more
        </Link>
      </div>
      {awardWinner && (
        <QuoteModal
          quoteDetails={awardWinner}
          show={showQuoteModal}
          close={closeModalHandler}
        />
      )}
    </>
  );
};

export default WinnerCard;
