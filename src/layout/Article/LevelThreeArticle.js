import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

import Level3Modal from "../../components/Modal/Level3Modal";
import imagePlaceholder from "../../assets/images/image-placeholder.png";
import { useMediaString } from "../../hooks/usePathString";
import { useCheckBase64Image } from "../../hooks/useBaseImage";
import { useTracking } from "react-tracking";

const LevelThreeArticle = ({ l3ArticlesArr }) => {
  const [showLevel3Modal, setShowLevel3Modal] = useState(false);
  const [modalData, setModalData] = useState({});
  const mediaPath = useMediaString();
  const placeholderSrc = useCheckBase64Image(imagePlaceholder)
    ? imagePlaceholder
    : mediaPath + imagePlaceholder;
  const { trackEvent } = useTracking();
  //console.log('l3ArticlesArr   ', l3ArticlesArr);

  const openModalHandler = () => {
    setShowLevel3Modal(true);
  };

  const closeModalHandler = () => {
    setShowLevel3Modal(false);
  };

  return (
    <>
      {l3ArticlesArr.map((article, index) => (
        <div
          key={index}
          className={`fsot__article-card-cont ${article.Media_x002d_Position}`}
        >
          <div
            className="fsot__article-card-content"
            style={{
              backgroundColor:
                article.Background_x002d_Color === "Yellow"
                  ? "#ffe600"
                  : "#ffffff",
            }}
          >
            <h3 className="fsot__article-card-title">{article.Title}</h3>
            <div className="fsot__article-card-text">
              {parse(article.Article_x002d_Summary)}
            </div>
            {!article.Modal_x002d_Required && article.Readmore_x002d_Link && (
              <Link
                onClick={() => {
                  trackEvent({
                    component: article.Title,
                    event: "external-link",
                  });
                }}
                to={article.Readmore_x002d_Link}
                target="_blank"
                className="fsot__article-card-link"
                type="btn"
              >
                {article.Readmore_x002d_text}
              </Link>
            )}
            {article.Modal_x002d_Required && (
              <Link
                onClick={() => {
                  openModalHandler();
                  setModalData(article);
                  trackEvent({
                    component: article.Title,
                    event: "modal",
                  });
                }}
                className="fsot__article-card-link"
                type="btn"
              >
                {article.Readmore_x002d_text}
              </Link>
            )}
          </div>
          <div className="fsot__article-card-img-cont">
            {article.Video_x002d_Media === false ? (
              <img
                src={
                  article.Image_x002d_Link
                    ? article.Image_x002d_Link
                    : placeholderSrc
                }
                className="fsot__article-card-img"
                alt={article.Title}
              />
            ) : (
              <iframe
                src={`siteUrl/_layouts/15/embed.aspx?UniqueId=${article.Video_x002d_Id}&embed=%7B%22ust%22%3Atrue%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create`}
                title={article.Title}
                width="640"
                height="360"
                allowFullScreen
                className="fsot__article-card-video"
                frameBorder="0"
              ></iframe>
            )}
          </div>
        </div>
      ))}
      <Level3Modal
        show={showLevel3Modal}
        close={closeModalHandler}
        modalData={modalData}
      />
    </>
  );
};

export default LevelThreeArticle;
