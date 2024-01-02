import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

import imagePlaceholder from "../../assets/images/image-placeholder.png";
import numberOne from "../../assets/images/1.png";
import numberTwo from "../../assets/images/2.png";
import numberThree from "../../assets/images/3.png";
import { useMediaString } from "../../hooks/usePathString";
import { useCheckBase64Image } from "../../hooks/useBaseImage";

const NumberedArticle = ({ numberedArticles }) => {
  const mediaPath = useMediaString();
  const placeholderImgSrc = useCheckBase64Image(imagePlaceholder)
    ? imagePlaceholder
    : mediaPath + imagePlaceholder;
  const [articleStyle, setArticleStyle] = useState({});
  const img1Src = useCheckBase64Image(numberOne)
    ? numberOne
    : mediaPath + numberOne;
  const img2Src = useCheckBase64Image(numberTwo)
    ? numberTwo
    : mediaPath + numberTwo;
  const img3Src = useCheckBase64Image(numberThree)
    ? numberThree
    : mediaPath + numberThree;

  // useEffect(()=>{
  //   ////console.log(number, imagePosition, background);
  //   setArticleStyle((prevArticleStyle) => ({
  //       ...prevArticleStyle,
  //       imgSrc:
  //         number === '1' ? img1Src :
  //         number === '2' ? img2Src :
  //         number === '3' ? img3Src : null,
  //       imagePosition: imagePosition,
  //       contentBg:
  //           background === 'yellow' ? {backgroundColor: '#ffe600'} :
  //           background === 'black' ? {backgroundColor: '#2e2e38', color: '#f6f6fa'} : {backgroundColor: '#ffffff'}
  //     }));
  // }, [])

  // const directionStyle = articleStyle.imagePosition === 'left' ? 'direction-row' : 'direction-row-reverse';
  // const articleContentStyle = articleStyle.imagePosition === 'right' ? 'change-padding' : null;
  // const articleImageStyle = articleStyle.imagePosition === 'right' ? 'change-position' : null;
  // const numberImageStyle = articleStyle.imagePosition === 'right' ? 'change-num-position' : null;

  useEffect(() => {
    //console.log("numberedArticles ", numberedArticles);
  }, [numberedArticles]);

  return (
    <>
      <div className="fsot__numbered-article-section direction-row">
        <div className="fsot__numbered-article-img-cont">
          {numberedArticles.Article_x002d_1_x002d_Media_x002 === false ? (
            <>
              <div className="fsot__numbered-article-img-gradient right" style={{ backgroundImage: `url(${numberedArticles.Article_x002d_1_x002d_Image})` }}>
                <div className="fsot__numbered-article-number-cont">
                <div className="fsot__numbered-article-number-img-cont">
                  <img
                    src={img1Src}
                    className="fsot__numbered-article-number-img"
                    alt="number"
                  />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <iframe
              src={`siteUrl/_layouts/15/embed.aspx?UniqueId=${numberedArticles.Article_x002d_1_x002d_Video_x002}&embed=%7B%22ust%22%3Atrue%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create`}
              title={numberedArticles.Article_x002d_1_x002d_Title}
              width="640"
              height="360"
              allowFullScreen
              className="fsot__numbered-article-video"
              frameBorder="0"
            ></iframe>
          )}
        </div>
        <div
          className="fsot__numbered-article-content"
          style={{ backgroundColor: "#ffe600" }}
        >
          <h3 className="fsot__numbered-article-sub-heading">
            {numberedArticles.Article_x002d_1_x002d_Title}
          </h3>
          <div className="fsot__numbered-article-text">
            {parse(numberedArticles.Article_x002d_1_x002d_Content)}
          </div>
        </div>
      </div>
      <div className="fsot__numbered-article-section direction-row-reverse">
        <div className="fsot__numbered-article-img-cont">
          {numberedArticles.Article_x002d_2_x002d_Media_x002 === false ? (
            <>
              <div className="fsot__numbered-article-img-gradient change-position" style={{ backgroundImage: `url(${numberedArticles.Article_x002d_2_x002d_Image})` }}>
                <div className="fsot__numbered-article-number-cont ">
                <div className="fsot__numbered-article-number-img-cont change-num-position">
                  <img
                    src={img2Src}
                    className="fsot__numbered-article-number-img"
                    alt="number"
                  />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <iframe
              src={`siteUrl/_layouts/15/embed.aspx?UniqueId=${numberedArticles.Article_x002d_2_x002d_Video_x002}&embed=%7B%22ust%22%3Atrue%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create`}
              title={numberedArticles.Article_x002d_2_x002d_Title}
              width="640"
              height="360"
              allowFullScreen
              className="fsot__numbered-article-video change-position"
              frameBorder="0"
            ></iframe>
          )}
        </div>
        <div
          className="fsot__numbered-article-content change-padding"
          style={{ backgroundColor: "#2e2e38", color: "#f6f6fa" }}
        >
          <h3 className="fsot__numbered-article-sub-heading">
            {numberedArticles.Article_x002d_2_x002d_Title}
          </h3>
          <div className="fsot__numbered-article-text style-text-white">
            {parse(numberedArticles.Article_x002d_2_x002d_Content)}
          </div>
        </div>
      </div>
      <div className="fsot__numbered-article-section direction-row">
        <div className="fsot__numbered-article-img-cont">
          {numberedArticles.Article_x002d_3_x002d_Media_x002 === false ? (
            <>
              <div className="fsot__numbered-article-img-gradient right" style={{ backgroundImage: `url(${numberedArticles.Article_x002d_3_x002d_Image})` }} >
                <div className="fsot__numbered-article-number-cont">
                  <div className="fsot__numbered-article-number-img-cont">
                  <img
                    src={img3Src}
                    className="fsot__numbered-article-number-img"
                    alt="number"
                  />
                  </div>
                  
                </div>
              </div>
            </>
          ) : (
            <iframe
              src={`siteUrl/_layouts/15/embed.aspx?UniqueId=${numberedArticles.Article_x002d_3_x002d_Video_x002}&embed=%7B%22ust%22%3Atrue%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create`}
              title={numberedArticles.Article_x002d_3_x002d_Title}
              width="640"
              height="360"
              allowFullScreen
              className="fsot__numbered-article-video"
              frameBorder="0"
            ></iframe>
          )}
        </div>
        <div
          className="fsot__numbered-article-content"
          style={{ backgroundColor: "#ffe600" }}
        >
          <h3 className="fsot__numbered-article-sub-heading">
            {numberedArticles.Article_x002d_3_x002d_Title}
          </h3>
          <div className="fsot__numbered-article-text">
            {parse(numberedArticles.Article_x002d_3_x002d_Content)}
          </div>
        </div>
      </div>
    </>
  );
};

export default NumberedArticle;
