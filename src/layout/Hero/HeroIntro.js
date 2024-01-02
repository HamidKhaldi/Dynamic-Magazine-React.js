import React from "react";
import parse from "html-react-parser";

const HeroIntro = ({ heading, text }) => {
  const containsStartMarker = text
    .toString()
    .includes('id="ms-rterangecursor-start"');
  const parsedText = parse(text);

  //console.log("containsStartMarker", containsStartMarker);

  return (
    <>
      <div className="fsot__Hero-Intro-cont">
        <h3 className="fsot__Hero-Intro-Heading">{heading}</h3>
        <div id="fsot__Hero-Intro" className="fsot__Hero-Intro">
          {parsedText}
        </div>
      </div>
    </>
  );
};

export default HeroIntro;
