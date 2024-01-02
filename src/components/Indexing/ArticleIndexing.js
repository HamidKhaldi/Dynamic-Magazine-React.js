import ReactDom from "react-dom";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useTracking } from "react-tracking";

import { useMediaString } from "../../hooks/usePathString";
import { useCheckBase64Image } from "../../hooks/useBaseImage";
import featuredPlaceholderImg from "../../assets/images/featured-placeholder.png";
import highlightPlaceholderImg from "../../assets/images/highlight-placeholder.png";

const ArticleIndexing = ({ contentIndex }) => {
  const mediaPath = useMediaString();
  const { trackEvent } = useTracking();

  const featuredImgSrc = useCheckBase64Image(featuredPlaceholderImg)
    ? featuredPlaceholderImg
    : mediaPath + featuredPlaceholderImg;
  const highlightImgSrc = useCheckBase64Image(featuredPlaceholderImg)
    ? highlightPlaceholderImg
    : mediaPath + highlightPlaceholderImg;

  //console.log("contentIndex ", contentIndex);

  return (
    <>
      <div className="fsot__index-article-section">
        <h2 className="fsot__index-article-section-title">
          {contentIndex.Section_x002d_title}
        </h2>
        <ul className="fsot__index-article-list">
          <li className="fsot__index-article-list--item">
            <Link
              //target="_blank"
              to={contentIndex.Main_x002d_Article_x002d_Link}
              onClick={() => {
                trackEvent({
                  component: "Content-Index",
                  event: contentIndex.Title,
                });
              }}
              className="fsot__highlight-article-link"
            >
              <div className="fsot__main-article-cont">
                <img
                  src={
                    contentIndex.Main_x002d_Article_x002d_Image
                      ? contentIndex.Main_x002d_Article_x002d_Image
                      : featuredImgSrc
                  }
                  className="fsot__main-article-img"
                  alt="placeholder"
                />

                <h3 className="fsot__index-article-title">
                  {contentIndex.Title}
                </h3>

                <div className="fsot__index-article-text">
                  {contentIndex.Main_x002d_Article_x002d_Intro &&
                    parse(contentIndex.Main_x002d_Article_x002d_Intro)}
                </div>
                {contentIndex.Main_x002d_Author && (
                  <div className="fsot__index-article-author">
                    <span className="fsot__index-article-span">By </span>
                    {contentIndex.Main_x002d_Author.Title}
                  </div>
                )}
              </div>
            </Link>
          </li>
          <li className="fsot__index-article-list--item">
            <div className="fsot__highlight-articles-cont">
              <Link
                //target="_blank"
                to={contentIndex.Highlight_x002d_Article_x002d_1_0}
                onClick={() => {
                  trackEvent({
                    component: "Content-Index",
                    event: contentIndex.Highlight_x002d_Article_x002d_1_,
                  });
                }}
                className="fsot__highlight-article-link"
              >
                <div className="fsot__highlight-article">
                  <img
                    src={
                      contentIndex.Highlight_x002d_Article_x002d_1_1
                        ? contentIndex.Highlight_x002d_Article_x002d_1_1
                        : highlightImgSrc
                    }
                    className="fsot__index-article-img"
                    alt="placeholder"
                  />

                  <h3 className="fsot__index-highlight-article-title">
                    {contentIndex.Highlight_x002d_Article_x002d_1_}
                  </h3>

                  {contentIndex.Highlight_x002d_1_x002d_Author && (
                    <div className="fsot__index-article-author">
                      <span className="fsot__index-article-span">By </span>
                      {contentIndex.Highlight_x002d_1_x002d_Author.Title}
                    </div>
                  )}
                </div>
              </Link>
              <Link
                //target="_blank"
                to={contentIndex.Highlight_x002d_Article_x002d_2_0}
                onClick={() => {
                  trackEvent({
                    component: "Content-Index",
                    event: contentIndex.Highlight_x002d_Article_x002d_2_,
                  });
                }}
                className="fsot__highlight-article-link"
              >
                <div className="fsot__highlight-article">
                  <img
                    src={
                      contentIndex.Highlight_x002d_Article_x002d_2_1
                        ? contentIndex.Highlight_x002d_Article_x002d_2_1
                        : highlightImgSrc
                    }
                    className="fsot__index-article-img"
                    alt="placeholder"
                  />

                  <h3 className="fsot__index-highlight-article-title">
                    {contentIndex.Highlight_x002d_Article_x002d_2_}
                  </h3>

                  {contentIndex.Highlight_x002d_2_x002d_Author && (
                    <div className="fsot__index-article-author">
                      <span className="fsot__index-article-span">By </span>
                      {contentIndex.Highlight_x002d_2_x002d_Author.Title}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          </li>
        </ul>
        <ul className="fsot__second-level-article-list">
          {contentIndex.Other_x002d_Article_x002d_1_x002 && (
            <li className="fsot__second-level-article-list--item">
              <div className="fsot__second-level-article-cont">
                <Link
                  //target="_blank"
                  to={contentIndex.Other_x002d_Article_x002d_1_x0020}
                  onClick={() => {
                    trackEvent({
                      component: "Content-Index",
                      event: contentIndex.Other_x002d_Article_x002d_1_x002,
                    });
                  }}
                >
                  <h3 className="fsot__index-highlight-article-title">
                    {contentIndex.Other_x002d_Article_x002d_1_x002}
                  </h3>
                </Link>
                {contentIndex.OA_x002d_1_x002d_Author && (
                  <div className="fsot__index-article-author">
                    <span className="fsot__index-article-span">By </span>
                    {contentIndex.OA_x002d_1_x002d_Author.Title}
                  </div>
                )}
              </div>
            </li>
          )}
          {contentIndex.Other_x002d_Article_x002d_2_x002 && (
            <li className="fsot__second-level-article-list--item">
              <div className="fsot__second-level-article-cont">
                <Link
                  //target="_blank"
                  to={contentIndex.Other_x002d_Article_x002d_2_x0020}
                  onClick={() => {
                    trackEvent({
                      component: "Content-Index",
                      event: contentIndex.Other_x002d_Article_x002d_2_x002,
                    });
                  }}
                >
                  <h3 className="fsot__index-highlight-article-title">
                    {contentIndex.Other_x002d_Article_x002d_2_x002}
                  </h3>
                </Link>
                {contentIndex.OA_x002d_2_x002d_Author && (
                  <div className="fsot__index-article-author">
                    <span className="fsot__index-article-span">By </span>
                    {contentIndex.OA_x002d_2_x002d_Author.Title}
                  </div>
                )}
              </div>
            </li>
          )}
          {contentIndex.Other_x002d_Article_x002d_3_x002 && (
            <li className="fsot__second-level-article-list--item">
              <div className="fsot__second-level-article-cont">
                <Link
                  //target="_blank"
                  to={contentIndex.Other_x002d_Article_x002d_3_x0020}
                  onClick={() => {
                    trackEvent({
                      component: "Content-Index",
                      event: contentIndex.Other_x002d_Article_x002d_3_x002,
                    });
                  }}
                >
                  <h3 className="fsot__index-highlight-article-title">
                    {contentIndex.Other_x002d_Article_x002d_3_x002}
                  </h3>
                </Link>
                {contentIndex.OA_x002d_3_x002d_Author && (
                  <div className="fsot__index-article-author">
                    <span className="fsot__index-article-span">By </span>
                    {contentIndex.OA_x002d_3_x002d_Author.Title}
                  </div>
                )}
              </div>
            </li>
          )}
          {contentIndex.OA_x002d_Title_x002d_4 && (
            <li className="fsot__second-level-article-list--item">
              <div className="fsot__second-level-article-cont">
                <Link
                  //target="_blank"
                  to={contentIndex.OA_x002d_Link_x002d_4}
                  onClick={() => {
                    trackEvent({
                      component: "Content-Index",
                      event: contentIndex.OA_x002d_Title_x002d_4,
                    });
                  }}
                >
                  <h3 className="fsot__index-highlight-article-title">
                    {contentIndex.OA_x002d_Title_x002d_4}
                  </h3>
                </Link>
                {contentIndex.OA_x002d_4_x002d_Author && (
                  <div className="fsot__index-article-author">
                    <span className="fsot__index-article-span">By </span>
                    {contentIndex.OA_x002d_4_x002d_Author.Title}
                  </div>
                )}
              </div>
            </li>
          )}
          {contentIndex.OA_x002d_Title_x002d_5 && (
            <li className="fsot__second-level-article-list--item">
              <div className="fsot__second-level-article-cont">
                <Link
                  //target="_blank"
                  to={contentIndex.OA_x002d_Link_x002d_5}
                  onClick={() => {
                    trackEvent({
                      component: "Content-Index",
                      event: contentIndex.OA_x002d_Title_x002d_5,
                    });
                  }}
                >
                  <h3 className="fsot__index-highlight-article-title">
                    {contentIndex.OA_x002d_Title_x002d_5}
                  </h3>
                </Link>
                {contentIndex.OA_x002d_5_x002d_Author && (
                  <div className="fsot__index-article-author">
                    <span className="fsot__index-article-span">By </span>
                    {contentIndex.OA_x002d_5_x002d_Author.Title}
                  </div>
                )}
              </div>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default ArticleIndexing;
