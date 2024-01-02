import React from "react";
import heroBanner from "../../assets/images/heroBanner.png";
import ShareLink from "../Share/Share";
import HeroIntro from "./HeroIntro";
// import { isProduction } from "../../hooks/usePathString";
// import { useMediaString } from "../../hooks/usePathString";
// import { useCheckBase64Image } from "../../hooks/useBaseImage";

const HeroPrimary = ({
  smallHeading,
  largeHeading,
  banner,
  introHeading,
  introText,
}) => {
  //const mediaPath = useMediaString();
  const heroImg = banner ? banner : heroBanner;
  // const heroBannerSrc = useCheckBase64Image(heroImg) ? heroImg : mediaPath + heroImg;

  return (
    <>
      <div className="fsot__primary-hero-cont">
        <img
          src={heroImg}
          className="fsot__primary-hero-img"
          alt="hero banner"
        />
        <div className="fsot__primaryhero-heading--cont">
          {smallHeading && (
            <h3 className="fsot__primaryhero-heading--small">{smallHeading}</h3>
          )}
          {largeHeading && (
            <h1 className="fsot__primaryhero-heading--large">{largeHeading}</h1>
          )}
        </div>
      </div>
      <ShareLink />
      {(introHeading || introText) && (
        <HeroIntro heading={introHeading} text={introText} />
      )}
    </>
  );
};

export default HeroPrimary;
