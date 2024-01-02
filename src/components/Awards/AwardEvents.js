import React from "react";
import parse from "html-react-parser";

import { useMediaString } from "../../hooks/usePathString";
import { useCheckBase64Image } from "../../hooks/useBaseImage";
import calendarIcon from "../../assets/images/calendar.png";

const AwardEvents = ({ awardEventsDetails }) => {
  const mediaPath = useMediaString();
  const calendarIconSrc = useCheckBase64Image(calendarIcon)
    ? calendarIcon
    : mediaPath + calendarIcon;

  return (
    <>
      <div className="fsot__award-events-section">
        <h4 className="fsot__award-events-heading">{awardEventsDetails.Section_x002d_Heading}</h4>
        <div className="fsot__award-events-container">
          <div className="fsot__award-events-text-cont">
            <h4 className="fsot__award-events-sub-heading">
              {awardEventsDetails.Title}
            </h4>
            <div className="fsot__award-events-text">
              {parse(awardEventsDetails.Summary)}
            </div>
          </div>
          <div className="fsot__award-events-links-cont">
            <h4 className="fsot__award-events-sub-heading">Upcoming dates:</h4>
            {awardEventsDetails.Award_x002d_Dates && awardEventsDetails.Award_x002d_Dates.length > 0 && (
              <ul className="fsot__award-event-list">
                {awardEventsDetails.Award_x002d_Dates.map((event, index) => {
                  return (
                    <li key={index} className="fsot__award-event-list--item">
                      <img
                        src={calendarIconSrc}
                        className="fsot__award-event-list--icon"
                        alt="calendar"
                      />
                      <ul className="fsot__award-date-list">
                        <li className="fsot__award-date-list--item">
                          {event.Title}
                        </li>
                        <li className="fsot__award-date-list--item">
                          {new Date(event.EventDate).toLocaleString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </li>
                        <li className="fsot__award-date-list--item">
                          {event.Description && parse(event.Description)}
                        </li>
                      </ul>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AwardEvents;
