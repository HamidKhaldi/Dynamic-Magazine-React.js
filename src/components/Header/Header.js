import { useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Path from "../../data/paths.js";

import backSvg from "../../assets/images/back.svg";
import closeSvg from "../../assets/images/detail.svg";

const Header = ({ title, isShow, onClick, showButton }) => {
  const path = Path();
  const [callBtnText, setCallBtnText] = useState('Call us');
  const phoneNumber = '+44 207 951 3000';

  const handleBtnHover = () => {
    setCallBtnText(phoneNumber);
  };

  const handleBtnLeave = () => {
    setCallBtnText('Call us');
  };

  const handleBackBtnClicked = () => {
    document.body.classList.add('draggable-page');
  }

  return (
    <header className="header">
      <div className="header-wrapper">
        <Link to={`${path}/home`} onClick={handleBackBtnClicked} className="header-navigation">
          <img className="header-navigation__back" src={backSvg} alt="back" />
          <p className="header-navigation__back-text">Our Work</p>
        </Link>
        {title &&
          <h1 className="header-navigation__title">{title}</h1>
        }
      </div>
      <hr></hr>
      <div className="header-cta-buttons">
        <Link to="https://polaris.ey.com/" target="_blank" rel="noopener noreferrer" className="header-navigation">
          Submit a job
        </Link>
        {!showButton &&
          <Button type="button" className="header-navigation" onMouseEnter={handleBtnHover} onMouseLeave={handleBtnLeave}>{callBtnText}</Button>
        }
        {showButton &&
          <>
            <Link to="https://polaris.ey.com/" target="_blank" rel="noopener noreferrer" className="header-navigation">
              Email us
            </Link>
            <button onClick={onClick} className="btn-more-detail">
              <span className="btn-more-text">{!isShow ? "More detail" : "Less detail"}</span>
              <img className={isShow ? "btn-more-icon active" : "btn-more-icon"} src={closeSvg} alt="more detail" />
            </button>
          </>
        }
      </div>
    </header>
  );
};

export default Header;