import React, { children, useEffect } from 'react';
import track, { useTracking } from 'react-tracking';
import axios from 'axios';
import { isProduction } from '../hooks/usePathString';

const PageAnalytics = ({ children, pageName }) => {
  // console.log('pageName ', pageName);
  const webUrlClient = "siteUrl";
  const webUrlCUK = "https://eygb.sharepoint.com/sites/Creative-UK-Analytics/FSO-Together";

  useEffect(() => {
    console.log('Page name changed:', pageName);
    if(pageName !== undefined && isProduction){
      postPageData(webUrlClient, pageName);
      postPageData(webUrlCUK, pageName);
    }
  }, [pageName]);

  const postPageData = (url, page) => {
    axios.post(url + '/_api/contextinfo', {}, {
      headers: { "Accept": "application/json; odata=verbose" }
    })
      .then(response => {
        let digestValue = response.data.d.GetContextWebInformation.FormDigestValue;

        axios.post(`${url}/_api/web/lists/GetByTitle('Lst_Page-Analytics')/items`, {
          __metadata: {
            type: 'SP.Data.Lst_x005f_PageAnalyticsListItem'
          },
          'Title': page ? page : 'No page name',
        }, {
          headers: {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": digestValue,
            "X-HTTP-Method": "POST"
          }
        })
          .then(response => {
            // console.log('tracked page data sent ', response.data);
          })
          .catch(error => {
            // console.log('error sending data ', error);
          });
      })
      .catch(error => {
        // console.log('context info Error', error);
      });
  };


  const { Track } = useTracking(
    { page: pageName }
  );

  return (
    <Track>
      {children}
    </Track>
  );
};

export default track()(PageAnalytics);
