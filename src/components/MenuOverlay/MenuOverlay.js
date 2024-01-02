import { Link } from "react-router-dom";
import Path from "../../data/paths.js";
import handleBtnClicked from "../../utils/bodyClickHandler.js";

const MenuOverlay = ({isOpen}) => {
  const path = Path();

  return (
    <>
      <div className={isOpen ? "menu-overlay active" : "menu-overlay"}>
        <div className={isOpen ? "menu-wrapper active" : "menu-wrapper"}>
          <ul className="menu-list">
            <li className="menu-list-item">
              <Link to={`${path}/home`} onClick={handleBtnClicked} className="menu-list-item--link">Our Work</Link>
            </li>
            <li className="menu-list-item">
              <Link to={`${path}/about`} className="menu-list-item--link">About us</Link>
            </li>
            <li className="menu-list-item">
              <Link to={`${path}/services`} className="menu-list-item--link">Services</Link>
            </li>
            <li className="menu-list-item">
              <Link to="https://web.yammer.com/main/groups/eyJfdHlwZSI6Ikdyb3VwIiwiaWQiOiIxMjgzNDcyNSJ9/all" target="_blank" rel="noopener noreferrer" className="menu-list-item--link">News</Link>
            </li>
            <li className="menu-list-item">
              <Link to={`${path}/contact`} className="menu-list-item--link">Contact us</Link>
            </li>
            <li className="menu-list-item">
              <Link to="https://eygb.sharepoint.com/sites/Creative-UK-Image-Library/SiteAssets/Pages/Creative-UK-Image-Library.aspx" target="_blank" rel="noopener noreferrer" className="menu-list-item--link">EY Office location photography</Link>
            </li>
          </ul>
          <ul className="menu-action">
            <li className="menu-action-item">
              <Link to="https://polaris.ey.com/" target="_blank" rel="noopener noreferrer" className="menu-action-item--link">Submit a job</Link>
            </li>
            <li className="menu-action-item">
              <Link target="_blank" rel="noopener noreferrer" className="menu-action-item--link">+44 207 951 3000</Link>
            </li>
            <li className="menu-action-item">
              <Link target="_blank" rel="noopener noreferrer" className="menu-action-item--link">emailaddress@creativeuk.ey.com</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MenuOverlay;
