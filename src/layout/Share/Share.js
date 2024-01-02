import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import shareIcon from "../../assets/images/share-icon-white.png";
import shareIconHover from "../../assets/images/share-icon-hover.png";
import { useMediaString } from "../../hooks/usePathString";
import { useCheckBase64Image } from "../../hooks/useBaseImage";
import { useTracking } from "react-tracking";

const ShareLink = ({ bgColor }) => {
  const [spanStyle, setSpanStyle] = useState({});
  const mediaPath = useMediaString();
  const shareImgSrc = useCheckBase64Image(shareIcon)
    ? shareIcon
    : mediaPath + shareIcon;

    const shareImgHoverSrc = useCheckBase64Image(shareIconHover)
    ? shareIconHover
    : mediaPath + shareIconHover;

  const shareURL = window.location.href;
  const [imgSrc, setImgSrc] = useState(shareImgSrc);
  const { trackEvent } = useTracking();
  useEffect(() => {}, [imgSrc]);

  const handleHover = () => {
    setImgSrc(shareImgHoverSrc);
    setSpanStyle({ color: '#7F7F91'});
  };

  const removeHover = () => {
    setImgSrc(shareImgSrc);
    setSpanStyle({});
  }
  
  const shareArticle = () => {
    const subject = "Check out this article";
    const emailBody = `I thought you might be interested in this article: ${shareURL}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(emailBody)}`;
  };

  return (
    <>
      <Link
        onMouseEnter={handleHover}
        onMouseLeave={removeHover}
        className="fsot__share-link"
        onClick={() => {
          trackEvent({
            component: "Share",
            event: shareURL,
          })
          shareArticle();
        }}
      >
        <img src={imgSrc} className="fsot__share-icon" alt="share icon" />
        <span className="fsot__share-span" style={spanStyle}>Share article</span>
      </Link>
    </>
  );
};

export default ShareLink;
