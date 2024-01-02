import React from "react";
import { Link } from "react-router-dom";

import backArrow from "../../assets/images/back-arrow-white.png";
import { useMediaString } from "../../hooks/usePathString";
import { useCheckBase64Image } from "../../hooks/useBaseImage";

const Back = () => {
  const mediaPath = useMediaString();
  const backImgSrc = useCheckBase64Image(backArrow)
    ? backArrow
    : mediaPath + backArrow;

  return (
    <div className="fsot__back-cont">
      <Link to=".." className="fsot__back-link">
        <img
          src={backImgSrc}
          className="fsot__back-img"
          alt="back arrow"
        />
        <span className="fsot__back-link">back to home</span>
      </Link>
    </div>
  );
};

export default Back;
