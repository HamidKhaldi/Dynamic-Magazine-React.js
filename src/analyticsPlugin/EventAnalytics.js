import React, { useEffect, children } from "react";
import axios from "axios";
import track, { useTracking } from "react-tracking";
import { isProduction } from "../hooks/usePathString";

const webUrlClient = "siteUrl";
const webUrlCUK =
  "https://eygb.sharepoint.com/sites/Creative-UK-Analytics/FSO-Together";

const postEventData = (url, data) => {
  console.log("postEventData", data);
  let webUrl = "siteUrl";
  axios
    .post(
      url + "/_api/contextinfo",
      {},
      {
        headers: { Accept: "application/json; odata=verbose" },
      }
    )
    .then((response) => {
      let digestValue =
        response.data.d.GetContextWebInformation.FormDigestValue;
      console.log("digestValue", digestValue);
      if (data.component && data.event) {
        axios
          .post(
            `${url}/_api/web/lists/GetByTitle('Lst_Page-Events-Analytics')/items`,
            {
              __metadata: {
                type: "SP.Data.Lst_x005f_PageEventsAnalyticsListItem",
              },
              Title: data.component,
              Link: data.event,
              Page: data.page,
            },
            {
              headers: {
                Accept: "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "X-RequestDigest": digestValue,
                "X-HTTP-Method": "POST",
              },
            }
          )
          .then((response) => {
            console.log("tracked page data sent ", response.data);
          })
          .catch((error) => {
            console.log("error sending data ", error);
          });
      }
    })
    .catch(function (error) {
      //console.log('context info Error', error);
    });
};

const EventComponent = ({ children }) => {
  return <>{children}</>;
};

const EventAnalytics = track(
  // app-level tracking data
  { app: "fso-together" },

  // top-level options
  {
    // custom dispatch to //console.log in addition to pushing to dataLayer[]
  //   dispatch: (data) => {
  //     if (isProduction) {
        
  //       postEventData(webUrlClient, data);
  //       postEventData(webUrlCUK, data);
  //     }
  //   },
  
  dispatch: (() => {
    let dataSent = false;

    return (data) => {
      if (isProduction && !dataSent) {
        dataSent = true;

        postEventData(webUrlClient, data);
        postEventData(webUrlCUK, data);
      }
    };
  })(),

  }
)(EventComponent);

export default EventAnalytics;
