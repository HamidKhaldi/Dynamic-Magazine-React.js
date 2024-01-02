import React, { useEffect } from "react";
import ReactDom from "react-dom";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

import { useMediaString } from "../../hooks/usePathString";
import { useCheckBase64Image } from "../../hooks/useBaseImage";
import introQuotes from "../../assets/images/intro-quotes.png";
import closeIcon from "../../assets/images/close-dark.png";

import Profile from "../../layout/Profile/Profile";

const QuoteModal = ({ quoteDetails, show, close }) => {

  ////console.log('quoteDetails', quoteDetails);

  const mediaPath = useMediaString();
  const closeImgSrc = useCheckBase64Image(closeIcon)
    ? closeIcon
    : mediaPath + closeIcon;

  const imgSrc = useCheckBase64Image(introQuotes)
    ? introQuotes
    : mediaPath + introQuotes;

  const hideModal = () => {
    const wrapper = document.querySelector(".fsot__quote-modal_wrapper");
    wrapper.classList.add("hide");
    setTimeout(() => {
      close();
    }, 500);
  };

  useEffect(() => {
    // //console.log("quoteDetails ", quoteDetails);
  }, [quoteDetails]);


  return ReactDom.createPortal(
    <>
      <div className={`fsot__quote-modal_wrapper ${show ? "show" : ""}`}>
        <div className="fsot__quote-modal-cont">
          <div className="fsot__quote-modal-heading">
            <p className="fsot__quote-modal-type">{quoteDetails.Award_x002d_Type}</p>
            <ul className="fsot__quote-modal-category-list">
              { quoteDetails.Category.map((category, index) => (
                <li className="fsot__quote-modal-category-list--item" key={index}>
                |  {category}
                </li> )) }
            </ul>
          </div>
          <Link
            onClick={hideModal}
            className="fsot__quote-modal-close"
          >
            <img
              src={closeImgSrc}
              className="fsot__quote-modal-close"
              alt="close"
            />
          </Link>
          { quoteDetails.Winners_x002d_Quote && <div className="fsot__quote-text-cont">
            <div className="fsot__quote-icon-cont">
              <img
                src={imgSrc}
                className="fsot__quote-modal-icon"
                alt="opening quotes"
              />
            </div>
            <div className="fsot__quote-modal-text">
              {quoteDetails.Winners_x002d_Quote && parse(quoteDetails.Winners_x002d_Quote)}
            </div>
            { quoteDetails.userDetails && <Profile authorDetails={quoteDetails.userDetails} /> }
          </div> }
          {/* <div className="fsot__quote-modal-summary-cont">
            <div className="fsot__quote-modal-summary">
              {parse(quoteDetails.Summary)}
            </div>
          </div> */}
        </div>
      </div>
    </>,
    document.getElementById("quoteModal")
  );
};

export default QuoteModal;
