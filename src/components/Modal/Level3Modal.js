import React, { useEffect } from "react";
import ReactDom from "react-dom";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

import { useMediaString } from "../../hooks/usePathString";
import { useCheckBase64Image } from "../../hooks/useBaseImage";
import closeIcon from "../../assets/images/close-dark.png";

const Level3Modal = ({ modalData, show, close }) => {

  useEffect(() => {
    //console.log("modalData ", modalData);
  }, []);

  const mediaPath = useMediaString();
  const closeImgSrc = useCheckBase64Image(closeIcon)
    ? closeIcon
    : mediaPath + closeIcon;

  const sanitizedSummaryContent = DOMPurify.sanitize(modalData.Article_x002d_Summary);
  const sanitizedModalContent = DOMPurify.sanitize(modalData.Modal_x002d_Text);

  return ReactDom.createPortal(
    <>
      <div className={`modal_wrapper ${show ? "show" : ""}`}>
        <div className="fsot__level3-modal-cont">
          <Link onClick={() => close()} className="fsot__level3-modal-close">
            <img
              src={closeImgSrc}
              className="fsot__level3-modal-close"
              alt="close"
            />
          </Link>
          {
            !modalData.Modal_x002d_image ? (
              <div className="fsot__level3-modal-noMedia-content">
                <h3 className="fsot__video-card-title">{modalData.Title}</h3>
                <div className="fsot__level3-modal-content">
                  {parse(sanitizedSummaryContent)}
                </div>
              </div>
            ) : (
              <div className="fsot__level3-modal-innner">
                <div className="fsot__level3-modal-img-cont">
                <img
                  src={modalData.Modal_x002d_image}
                  className="fsot__level3-modal-media"
                  alt="article"
                />
                </div>
                <div className="fsot__level3-modal-content">
                  <h3 className="fsot__video-card-title">{modalData.Title}</h3>
                  <div
                    id="fsot__level3-modal-intro"
                    className="fsot__level3-modal-intro"
                  >
                    {parse(sanitizedModalContent)}
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </>,
    document.getElementById("level3ArticleModal")
  );
};

export default Level3Modal;
