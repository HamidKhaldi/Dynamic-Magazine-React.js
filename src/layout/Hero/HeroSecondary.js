import React from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

import HeroIntro from './HeroIntro';
import ShareLink from '../Share/Share';
import titleBanner from '../../assets/images/titleGradient.png';
import backArrow from '../../assets/images/back-arrow.png';
import { useMediaString } from "../../hooks/usePathString";
import { useCheckBase64Image } from "../../hooks/useBaseImage";


const HeroSecondary = ({smallHeading, largeHeading, banner, heroText, introHeading, introText}) => {
    const mediaPath = useMediaString();
    const backImgSrc = useCheckBase64Image(backArrow) ? backArrow : mediaPath + backArrow;
    const heroImg = banner ? banner : titleBanner;
    
    return (
        <>
         <div className="fsot__secondary-hero-cont">
            <img src={ heroImg } className="fsot__secondary-hero-img" alt="hero banner"/>
            <div className="fsot__secondary-hero-heading--cont">
                {/* 
                 */}
                <ul className="fsot__secondary-hero-heading-list">
                   {smallHeading && <li className="fsot__secondary-hero-heading-list--item">{smallHeading}</li> }
                    {largeHeading && <li className="fsot__secondary-hero-heading-list--item">{largeHeading}</li> }
                    {/* <li className="fsot__secondary-hero-heading-list--item">by Author</li> */}
                </ul>
                { heroText && <div className="fsot__secondary-hero-text">{parse(heroText)}</div> }
            </div>
        </div>
        <ShareLink />
        {(introHeading || introText) &&  <HeroIntro heading={introHeading} text={introText} />}  
        </>
    );
};


export default HeroSecondary;