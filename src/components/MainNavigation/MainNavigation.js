import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logoImg from "../../assets/images/logo_Beam.svg";
import hamburgerIcon from "../../assets/images/hamburger-icon.png";
import hamburgerIconHover from "../../assets/images/hamburger-icon-hover.png";
import homeIcon from "../../assets/images/home-icon.png";
import closeIcon from "../../assets/images/close-icon.png";
import { usePathString } from "../../hooks/usePathString";
import { useMediaString } from "../../hooks/usePathString";
import { useCheckBase64Image } from "../../hooks/useBaseImage";

const MainNavigation = ({ routerConfig }) => {
  ////console.log("routerConfig", routerConfig);
  const navPath = usePathString();
  const mediaPath = useMediaString();
  const [showOverlay, setShowOverlay] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  

  const logoImgSrc = useCheckBase64Image(logoImg)
    ? logoImg
    : mediaPath + logoImg;
  const hamburgerImgSrc = useCheckBase64Image(hamburgerIcon)
    ? hamburgerIcon
    : mediaPath + hamburgerIcon;
  const hamburgerImgHoverSrc = useCheckBase64Image(hamburgerIconHover)
    ? hamburgerIconHover
    : mediaPath + hamburgerIconHover;
  const homeImgSrc = useCheckBase64Image(homeIcon)
    ? homeIcon
    : mediaPath + homeIcon;
  const closeImgSrc = useCheckBase64Image(closeIcon)
    ? closeIcon
    : mediaPath + closeIcon;


  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    ////console.log("showOverlay useEffect", showOverlay);
  },[showOverlay]);

  return (
    <div className="fsot__header-cont">
      <header className="fsot__header">
        <nav className="fsot__nav">
          <ul className="fsot__nav-list">
            <li className="fsot__nav-list--item">
              <NavLink to={navPath + "/"}>
                <img src={logoImgSrc} className="fsot__logoImg" alt="EY Logo" />
              </NavLink>
            </li>
            <li className="fsot__nav-list--item">
              <Link
                onClick={(e) => { e.preventDefault(); toggleOverlay(); }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="fsot__nav-list--hamburger"
              >
                <img
                  src={isHovered ? hamburgerImgHoverSrc : hamburgerImgSrc}
                  className="fsot__hamburger-icon"
                  alt="hamburger-icon"
                />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div
        className={"fsot__menu-overlay"}
        style={showOverlay ? { right: 0 } : { right: "-100%" }}
      >
        {/* <div className="fsot__overlay-top"> */}
          {/* <NavLink onClick={toggleOverlay} to={navPath + "/"}>
            <img src={homeImgSrc} className="fsot__home-icon" alt="homeIcon" />
          </NavLink> */}
          {/* <Link onClick={toggleOverlay} className="fsot__overlay-close">
            <img
              src={closeImgSrc}
              className="fsot__close-icon"
              alt="close-icon"
            />
          </Link> */}
        {/* </div> */}
        <Link onClick={toggleOverlay} className="fsot__overlay-close">
            <img
              src={closeImgSrc}
              className="fsot__close-icon"
              alt="close-icon"
            />
          </Link>
        <ul className="fsot__overlay-list">
          {routerConfig.map((item, index) => {
            return (
              <li key={index} className="fsot__overlay-list--item">
                <NavLink
                  to={item.path}
                  onClick={toggleOverlay}
                  className="fsot__overlay-list--link"
                >
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MainNavigation;
