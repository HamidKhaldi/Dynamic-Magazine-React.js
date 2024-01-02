import React from "react";

import { useMediaString } from "../../hooks/usePathString";
import { useCheckBase64Image } from "../../hooks/useBaseImage";
import userIcon from "../../assets/images/user.png";

const Profile = ({ authorDetails, theme, style }) => {
  //console.log("authorDetails", authorDetails);

  authorDetails = authorDetails || {
    PictureURL: userIcon,
    
    Title: "Title",
    User_x002d_job_x002d_title: "Job Title",
    User_x002d_service_x002d_line: "Service Line",
    User_x002d_country: "Country",
  };
  const mediaPath = useMediaString();
  const imgSrc = useCheckBase64Image(userIcon)
    ? userIcon
    : mediaPath + userIcon;

  const themeStyle =
    theme === "light" ? "light-theme" : theme === "dark" ? "dark-theme" : null;

  return (
    <>
      <div className={`fsot__profile-cont ${themeStyle}`} style={style}>
        <img
          src={
            authorDetails.User_x002d_profile_x002d_image
              ? authorDetails.User_x002d_profile_x002d_image
              : imgSrc
          }
          className="fsot__profile-icon"
          alt="profile-icon"
        />
        <ul className="fsot__profile-list">
          <li className="fsot__profile-list--item">{authorDetails.Title}</li>
          <li className="fsot__profile-list--item">
            {authorDetails.User_x002d_job_x002d_title}
          </li>
          <li className="fsot__profile-list--item">
            {authorDetails.User_x002d_service_x002d_line}
          </li>
          <li className="fsot__profile-list--item">
            {authorDetails.User_x002d_country}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Profile;
