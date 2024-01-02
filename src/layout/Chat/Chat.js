import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTracking } from "react-tracking";

import { useMediaString } from "../../hooks/usePathString";
import { useCheckBase64Image } from "../../hooks/useBaseImage";
import chatIcon from "../../assets/images/icon_Chat-white.png";

const ChatComp = ({askMeData, pageID}) => {
  const { trackEvent } = useTracking();
  const [askItem, setAskItem] = useState({});
  // console.log('askMeData', askMeData);
  // console.log('pageID', pageID);
  const mediaPath = useMediaString();
  const chatIconSrc = useCheckBase64Image(chatIcon)
    ? chatIcon
    : mediaPath + chatIcon;


  useEffect(() => {
    askMeData.map(item => {
      if(item.Page_x002d_LinkId === pageID) {
       setAskItem(item);
      }
    });
  }, [pageID]);

 

  return (
    <>
      <div className="fsot__chat-section">
        <img
          src={chatIconSrc}
          className="fsot__chat-icon"
          alt="chat"
        />
        <Link onClick={ trackEvent({
            component: askItem.Title,
            event: "Ask-Us-email",
          })} to={`mailto:${askItem.Mail_x002d_To_x002d_Link}`} className="fsot__chat-link">{askItem.Title}</Link>
      </div>
    </>
  );
};

export default ChatComp;