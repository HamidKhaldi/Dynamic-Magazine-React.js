import React, { useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

import Profile from "../Profile/Profile";
import introQuotes from "../../assets/images/intro-quotes.png";
import { useMediaString } from "../../hooks/usePathString";
import { useCheckBase64Image } from "../../hooks/useBaseImage";

const Quote = ({ quoteContent }) => {
  //console.log('quoteContent', quoteContent);
  const mediaPath = useMediaString();
  const imgSrc = useCheckBase64Image(introQuotes)
    ? introQuotes
    : mediaPath + introQuotes;

  const quoteColor = quoteContent.recipeQuote === true ? {color: '#2e2e38'} : {color: '#f6f6fa'};

  return (
    <>
      { quoteContent.Quote_x002d_Content && <div className="fsot__quote-cont" style={quoteColor}>
          <div className="fsot__quote-icon-cont">
            <img
              src={imgSrc} 
              className="fsot__quote-icon"
              alt="opening quotes"
            />
          </div>
          <div className="fsot__quote-content">
            { parse(quoteContent.Quote_x002d_Content) }
          </div>
          { quoteContent.userDetails && <Profile authorDetails={quoteContent.userDetails} /> }
      </div>   }
      
    </>
  );
};

export default Quote;
