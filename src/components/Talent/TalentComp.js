import React from "react";
import TalentCard from "../../layout/TalentCard/TalentCard";
import parse from "html-react-parser";

const TalentComp = ({talentIntro, talentArr}) => {
  // console.log('talentIntro', talentIntro);
  console.log('talentArr', talentArr);
  return (
    <>
      <div className="fsot__talent-section">
        <h3 className="fsot__talent-section-heading">{talentIntro.Title}</h3>
        <div className="fsot__talent-section-intro">
          {parse(talentIntro.Intro_x002d_Text)}
        </div>
        <ul className="fsot__talent-card-list">
        {talentArr.map((talent, index) => {
            return (
              <li className="fsot__talent-card-list--item" key={index}>
                <TalentCard talentItem={talent} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default TalentComp;
