import React, { useEffect } from "react";
import parse from "html-react-parser";

import { useMediaString } from "../../hooks/usePathString";
import { useCheckBase64Image } from "../../hooks/useBaseImage";
import timerIcon from "../../assets/images/timer.png";
import cutleryIcon from "../../assets/images/cutlery.png";
import recipeImg from "../../assets/images/recipe.png";
import Quote from "../Quote/Quote";

const RecipeTabContent = ({ recipeData }) => {

  useEffect(()=>{
    //console.log('recipeData ', recipeData);
  }, [recipeData]);

  const mediaPath = useMediaString();
  const timerIconSrc = useCheckBase64Image(timerIcon)
    ? timerIcon
    : mediaPath + timerIcon;

  const cutleryIconSrc = useCheckBase64Image(cutleryIcon)
    ? cutleryIcon
    : mediaPath + cutleryIcon;

  const recipeImgSrc = useCheckBase64Image(recipeImg)
    ? recipeImg
    : mediaPath + recipeImg;

  return (
    <>
      <div className="fsot__tab-content-section">
        <div className="fsot__recipe-top-cont">
          <div className="fsot__recipe-hero-cont">
            <ul className="fsot__recipe-info-list">
              <li className="fsot__recipe-info-list--item">
                <img
                  src={timerIconSrc}
                  className="fsot__recipe-info-list--icon"
                  alt="timer"
                />
                <ul className="fsot__recipe-timing-list">
                  <li className="fsot__recipe-timing-list--item">Prep time</li>
                  <li className="fsot__recipe-timing-list--item">
                    { recipeData.Prep_x002d_Time }<span className="fsot__recipe-list--span">{' '}mins</span>
                  </li>
                </ul>
              </li>
              <li className="fsot__recipe-info-list--item">
                <ul className="fsot__recipe-timing-list">
                  <li className="fsot__recipe-timing-list--item">Cooks in</li>
                  <li className="fsot__recipe-timing-list--item">
                   { recipeData.Cook_x002d_Time }<span className="fsot__recipe-list--span">{' '}mins</span>
                  </li>
                </ul>
              </li>
              <li className="fsot__recipe-info-list--item">
                <ul className="fsot__recipe-timing-list">
                  <li className="fsot__recipe-timing-list--item">Total time</li>
                  <li className="fsot__recipe-timing-list--item">
                  { recipeData.Total_x002d_Time }<span className="fsot__recipe-list--span">{' '}mins</span>
                  </li>
                </ul>
              </li>
              <li className="fsot__recipe-info-list--item">
                <img
                  src={cutleryIconSrc}
                  className="fsot__recipe-info-list--icon"
                  alt="cutlery"
                />
                <ul className="fsot__recipe-timing-list">
                  <li className="fsot__recipe-timing-list--item">Makes</li>
                  <li className="fsot__recipe-timing-list--item">
                  { recipeData.Servings }<span className="fsot__recipe-list--span">{' '}servings</span>
                  </li>
                </ul>
              </li>
            </ul>
            {recipeData.Recipe_x002d_Image && <img
              src={recipeData.Recipe_x002d_Image.Url}
              className="fsot__recipe-hero-img"
              alt="ramen bowl"
            />}
          </div>
          { recipeData.Recipe_x002d_Quote && <div className="fsot__recipe-quote-cont">
            <Quote quoteContent={{'Quote_x002d_Content': recipeData.Recipe_x002d_Quote, 'userDetails' : null, recipeQuote: true}} />
          </div> }
        </div> 
        <div className="fsot__recipe-bottom-cont">
          <div className="fsot__recipe-text">{parse(recipeData.Introduction)}</div>
          <h4 className="fsot__recipe-sub-heading">Ingredients</h4>
          <div className="fsot__recipe-text">
            {parse(recipeData.Ingredients)}
          </div>
          <h4 className="fsot__recipe-sub-heading">Instructions</h4>
          <div className="fsot__recipe-text">
            {parse(recipeData.Instructions)}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeTabContent;
