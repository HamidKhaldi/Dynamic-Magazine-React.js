import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

import { useMediaString } from "../../hooks/usePathString";
import { useCheckBase64Image } from "../../hooks/useBaseImage";
import arrowIcon from "../../assets/images/arrow-right.png";
import externalIcon from "../../assets/images/external-link.png";

const ResourceTabContent = ({ resourceData }) => {

  //console.log("resourceData", resourceData);
  const mediaPath = useMediaString();
  const arrowIconSrc = useCheckBase64Image(arrowIcon)
    ? arrowIcon
    : mediaPath + arrowIcon;

  const externalIconSrc = useCheckBase64Image(externalIcon)
    ? externalIcon
    : mediaPath + externalIcon;


    useEffect(()=> {}, [resourceData]);

    //const iconSrc = linkType === 'external' ? externalIconSrc : arrowIconSrc;

  return (
    <>
      <div className="fsot__resource-tab-content">
        <div className="fsot__resource-tab-intro">
          {parse(resourceData.Resource_x0020_Content)}
        </div>
        <ul className="fsot__resource-list">
          {resourceData.Resource_x002d_Links && resourceData.Resource_x002d_Links.length > 0 && resourceData.Resource_x002d_Links.map((link, index) => (
            <li className="fsot__resource-list--item" key={index}>
              <a
                href={link.Resource_x002d_Link}
                className="fsot__resource-list--link"
                target="_blank"
                // rel="noopener noreferrer"
              >
                {link.Title}
                <img
                  src={externalIconSrc}
                  className="fsot__resource-list--icon"
                  alt="external link"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ResourceTabContent;
