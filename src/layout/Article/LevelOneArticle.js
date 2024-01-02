import React, { useState } from "react";
import parse from "html-react-parser";

import imagePlaceholder from "../../assets/images/image-placeholder.png";
import { useMediaString } from "../../hooks/usePathString";
import { useCheckBase64Image } from "../../hooks/useBaseImage";

const LevelOneArticle = ({ l1ArticlesArr }) => {
  const mediaPath = useMediaString();
  const placeholderSrc = useCheckBase64Image(imagePlaceholder)
    ? imagePlaceholder
    : mediaPath + imagePlaceholder;

  return (
    <>
      {l1ArticlesArr.map((article, index) =>
        !article.Article_x002d_Image && !article.Video_x002d_id ? (
          <div key={index} className="fsot__article-noImg-content">
            <div className="fsot__article-text">
              {parse(article.Article_x002d_Content)}
            </div>
          </div>
        ) : (
          <div key={index} className="fsot__article-cont">
            <div className="fsot__article-img-cont">
              {article.Video_x002d_Media === false ? (
                <>
                  {/* <div className="fsot__article-img-gradient">
                  </div> */}
                  <img
                    src={article.Article_x002d_Image.Url}
                    alt={article.Title}
                    className="fsot__article-img"
                  />
                </>
              ) : (
                <iframe
                  src={`siteUrl/_layouts/15/embed.aspx?UniqueId=${article.Video_x002d_id}&embed=%7B%22ust%22%3Atrue%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create`}
                  title={article.Title}
                  width="640"
                  height="360"
                  allowFullScreen
                  className="fsot__article-video"
                  frameBorder="0"
                ></iframe>
              )}
            </div>
            <div className="fsot__article-content"
            style={{
              backgroundColor:
                article.Background_x002d_Color === "Yellow"
                  ? "#ffe600"
                  : "#ffffff"
            }}
            >
              <h2 className="fsot__article-title">{article.Title}</h2>
              <div className="fsot__article-text">
                {parse(article.Article_x002d_Content)}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default LevelOneArticle;
