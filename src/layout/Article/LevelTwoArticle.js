import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import parse from "html-react-parser";

import imagePlaceholder from "../../assets/images/image-placeholder.png";
import { useMediaString } from "../../hooks/usePathString";
import { useCheckBase64Image } from "../../hooks/useBaseImage";

const LevelTwoArticle = ({ l2ArticlesArr }) => {
  const mediaPath = useMediaString();
  const placeholderSrc = useCheckBase64Image(imagePlaceholder)
    ? imagePlaceholder
    : mediaPath + imagePlaceholder;

 //console.log("l2ArticlesArr ", l2ArticlesArr);

  useEffect(() => {}, [l2ArticlesArr]);

  return (
    <>
      {l2ArticlesArr &&
        l2ArticlesArr.map((article, index) =>
          !article.Image_x002d_Link && article.Video_x002d_Media === false ? (
            <div
              key={index}
              className="fsot__secondary-article-noImg-content"
              style={{
                backgroundColor:
                  article.Background_x002d_Color === "Yellow"
                    ? "#ffe600"
                    : article.Background_x002d_Color === "White"
                    ? "#ffffff"
                    : article.Background_x002d_Color === "OffBlack"
                    ? "#2e2e38"
                    : "#ffffff",
              }}
            >
              <h3 className="fsot__secondary-article-sub-heading"
              style={{
                color:
                  article.Background_x002d_Color === "OffBlack"
                    ? "#fafaf6"
                    : "#2e2e38",
              }}>
                {article.Title}
              </h3>
              <div className="fsot__secondary-article-text"
              style={{
                color:
                  article.Background_x002d_Color === "OffBlack"
                    ? "#fafaf6"
                    : "#2e2e38",
              }}>
                {parse(article.Article_x002d_Content)}
              </div>
            </div>
          ) : (
            <div
              key={index}
              className={`fsot__secondary-article-section ${
                article.Media_x002d_Position === "Right"
                  ? "change-section-position"
                  : ""
              }`}
            >
              <div className="fsot__secondary-article-img-cont">
                {article.Video_x002d_Media === false ? (
                  <>
                    <img
                      src={article.Image_x002d_Link}
                      className={`fsot__secondary-article-img ${
                        article.Media_x002d_Position === "Right"
                          ? "change-media-position"
                          : ""
                      }`}
                      alt={article.Title}
                    />
                  </>
                ) : (
                  <iframe
                    src={`siteUrl/_layouts/15/embed.aspx?UniqueId=${article.Video_x002d_Id}&embed=%7B%22ust%22%3Atrue%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create`}
                    title={article.Title}
                    width="640"
                    height="360"
                    allowFullScreen
                    className={`fsot__secondary-article-img fsot__secondary-article-video ${
                      article.Media_x002d_Position === "Right"
                        ? "change-media-position"
                        : ""
                    }`}
                    frameBorder="0"
                  ></iframe>
                )}
              </div>
              <div
                className={`fsot__secondary-article-content ${
                  article.Media_x002d_Position === "Right"
                    ? "change-content-position"
                    : ""
                }`}
                style={{
                  backgroundColor:
                    article.Background_x002d_Color === "Yellow"
                      ? "#ffe600"
                      : article.Background_x002d_Color === "White"
                      ? "#ffffff"
                      : article.Background_x002d_Color === "OffBlack"
                      ? "#2e2e38"
                      : "#ffffff",
                }}
              >
                <h3
                  className="fsot__secondary-article-sub-heading"
                  style={{
                    color:
                      article.Background_x002d_Color === "OffBlack"
                        ? "#fafaf6"
                        : "#2e2e38",
                  }}
                >
                  {article.Title}
                </h3>
                <div
                  className="fsot__secondary-article-text"
                  style={{
                    color:
                      article.Background_x002d_Color === "OffBlack"
                        ? "#fafaf6"
                        : "#2e2e38",
                  }}
                >
                  {parse(article.Article_x002d_Content)}
                </div>
              </div>
            </div>
          )
        )}
    </>
  );
};

export default LevelTwoArticle;
