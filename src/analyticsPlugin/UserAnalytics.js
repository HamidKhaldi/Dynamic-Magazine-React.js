import React, { useState, useEffect } from "react";
import track, { useTracking } from "react-tracking";
import axios from "axios";
import { isProduction } from "../hooks/usePathString";

const UserAnalytics = ({ children }) => {
  const [trackedData, setTrackedData] = useState({});
  const [trackedPage, setTrackedPage] = useState("");
  const [trackedDataSent, setTrackedDataSent] = useState(false);
  const [userDetails, setUserDetails] = useState({
    Title: "",
    Department: "",
    Location: "",
  });
  const [titleObj, setTitleObj] = useState({});
  const [deptObj, setDeptObj] = useState({});
  const [locationObj, setLocationObj] = useState({});
  const [pageObj, setPageObj] = useState({});
  const [dateObj, setDateObj] = useState({});
  const [dataSent, setDataSent] = useState(false);
  const [userAnalytics, setUserAnalytics] = useState([]);
  const [pageAnalytics, setPageAnalytics] = useState([]);
  const [xrequestDigest, setXrequestDigest] = useState("");
  const [userData, setUserData] = useState(false);


  const addQuotes = (str) => {
    return `"${str}"`;
  };

  const webUrlClient = "siteUrl";
  const webUrlCUK = "siteUrl";

  const postUserData = (url) => {
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

        axios
          .post(
            `${url}/_api/web/lists/GetByTitle('Lst_User-Analytics')/items`,
            {
              __metadata: {
                type: "SP.Data.Lst_x005f_UserAnalyticsListItem",
              },
              Title: userDetails.Title,
              Department: userDetails.Department,
              Location: userDetails.Location,
              Returning: userDetails.Returning,
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
            console.log("tracked user data sent ", response.data);
          })
          .catch((error) => {
            // console.log('error sending data ', error);
          });
      })
      .catch((error) => {
        // console.log('context info Error', error);
      });
  };

  useEffect(() => {
    const isReturningUser = localStorage.getItem("isReturningUser");
    let webUrl = "siteUrl";

    if(isProduction){
      axios
      .get(webUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        //console.log("user response", response.data.UserProfileProperties);
        let newUserDetails = {
          Title: "",
          Department: "",
          Location: "",
        };
        response.data.UserProfileProperties.forEach(function (item) {
          if (item.Key === "Title") {
            userDetails.Title = item.Value;
          }
          if (item.Key === "Department") {
            userDetails.Department = item.Value;
          }
          if (item.Key === "EYWorkLocationAddressCountry") {
            userDetails.Location = item.Value;
          }
          userDetails.Returning = isReturningUser;
        });

        setUserDetails({ ...userDetails }, newUserDetails);
        console.log("user details final ", userDetails);
        if (isProduction) {
          postUserData(webUrlClient);
          postUserData(webUrlCUK);
          if (!isReturningUser) {
            localStorage.setItem("isReturningUser", "true");
          }
        }
      });
    }
  

    // axios
    //   .get(
    //     "https://eygb.sharepoint.com/sites/Creative-UK-Analytics/FSO-Together/_api/web/lists/GetByTitle('Lst_User-Analytics')/items?select=*&top=5000",
    //     {
    //       headers: {
    //         "Access-Control-Allow-Origin": "*",
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     //console.log('userAnalytics response', response.data.value);
    //     setUserAnalytics(response.data.value);
    //     //console.log('userAnalytics', userAnalytics);
    //     let titleArr = [],
    //       deptArr = [],
    //       locationArr = [],
    //       titleCountObj = {},
    //       deptCountObj = {},
    //       locationCountObj = {};

    //     setUserData(true);
    //     userAnalytics.map((user) => {
    //       titleArr.push(user.Title);
    //       deptArr.push(user.Department);
    //       locationArr.push(user.Location);
    //     });

    //     titleArr.map((a) => {
    //       a = addQuotes(a);
    //       if (a in titleCountObj) titleCountObj[a]++;
    //       else titleCountObj[a] = 1;
    //     });

    //     setTitleObj(titleCountObj);
    //     //console.log('titleObj ', titleCountObj);

    //     deptArr.map((a) => {
    //       a = addQuotes(a);
    //       if (a in deptCountObj) deptCountObj[a]++;
    //       else deptCountObj[a] = 1;
    //     });

    //     setDeptObj(deptCountObj);
    //     //console.log('deptObj ', deptCountObj);

    //     locationArr.map((a) => {
    //       a = addQuotes(a);
    //       if (a in locationCountObj) locationCountObj[a]++;
    //       else locationCountObj[a] = 1;
    //     });

    //     setLocationObj(locationCountObj);
    //     //console.log('locationObj ', locationCountObj);
    //   })
    //   .catch(function (error) {
    //     //console.log('analytics list error', error);
    //   });
  }, []);

  return <>{children}</>;
};

export default UserAnalytics;
