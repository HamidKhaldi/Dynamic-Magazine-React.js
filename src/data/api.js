import React, { useState, useEffect } from "react";
import axios from "axios";
import { isProduction } from "../hooks/usePathString";

import primaryHeroJSON from "./mock/primaryHero.json";
import secondaryHeroJSON from "./mock/secondaryHero.json";
import quotesJSON from "./mock/quotes.json";
import level1ArticlesJSON from "./mock/level1Articles.json";
import level2ArticlesJSON from "./mock/level2Articles.json";
import level3ArticlesJSON from "./mock/level3Articles.json";
import contentIndexJSON from "./mock/contentIndex.json";
import numberedArticlesJSON from "./mock/numberedArticles.json";
import awardSectionJSON from "./mock/awardSection.json";
// import carouselPeopleJSON from "./mock/carouselPeople.json";
import talentIntroJSON from "./mock/talentIntro.json";
import talentPeopleJSON from "./mock/talentPeople.json";
import awardImagesJSON from "./mock/awardImages.json";
import awardWinnersJSON from "./mock/awardWinners.json";
import recipesJSON from "./mock/recipes.json";
import resourcesJSON from "./mock/resources.json";
import resourcesLinksJSON from "./mock/resourcesLinks.json";
import awardEventsJSON from "./mock/awardEvents.json";
import awardEventsCalendarJSON from "./mock/awardEventsCalendar.json";
import componentOrderJSON from "./mock/componentOrder.json";
import pagesJSON from "./mock/pages.json";
import askMeJSON from "./mock/askMe.json";
import usersJSON from "./mock/users.json";

// //console.log('isProduction ', isProduction)



  const GetAllData = () => {
    const [allData, setAllData] = useState({});
  
    const BASE_URL = (listName) =>
      `siteUrl/_api/web/lists/getByTitle('${listName}')/items?&select=*&top=5000`;
  
    const defaultHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          
          if (isProduction) {
            const response = await axios.get(BASE_URL("Lst_Component-Order"), {
              headers: defaultHeaders,
            });
            setAllData((prevData) => ({
              ...prevData,
              componentOrderData: response.data.value,
            }));
          } else {
            setAllData((prevData) => ({
              ...prevData,
              componentOrderData: componentOrderJSON,
            }));
          }

          if (isProduction) {
            const response = await axios.get(BASE_URL("Lst_Primary-Hero"), {
              headers: defaultHeaders,
            });
            setAllData((prevData) => ({
              ...prevData,
              primaryHeroData: response.data.value,
            }));
          } else {
            setAllData((prevData) => ({
              ...prevData,
              primaryHeroData: primaryHeroJSON,
            }));
          }
  
          if (isProduction) {
            const response = await axios.get(BASE_URL("Lst_Secondary-Hero"), {
              headers: defaultHeaders,
            });
            setAllData((prevData) => ({
              ...prevData,
              secondaryHeroData: response.data.value,
            }));
          } else {
            setAllData((prevData) => ({
              ...prevData,
              secondaryHeroData: secondaryHeroJSON,
            }));
          }

          if (isProduction) {
            const response = await axios.get(BASE_URL("Lst_Quotes"), {
              headers: defaultHeaders,
            });
            setAllData((prevData) => ({
              ...prevData,
              quotesData: response.data.value,
            }));
          } else {
            setAllData((prevData) => ({
              ...prevData,
              quotesData: quotesJSON,
            }));
          }

          if (isProduction) {
            const response = await axios.get(BASE_URL("Lst_Level-1-Article"), {
              headers: defaultHeaders,
            });
            setAllData((prevData) => ({
              ...prevData,
              level1ArticlesData: response.data.value,
            }));
          } else {
            setAllData((prevData) => ({
              ...prevData,
              level1ArticlesData: level1ArticlesJSON,
            }));
          }

          if (isProduction) {
            const response = await axios.get(BASE_URL("Lst_Level-2-Article"), {
              headers: defaultHeaders,
            });
            setAllData((prevData) => ({
              ...prevData,
              level2ArticlesData: response.data.value,
            }));
          } else {
            setAllData((prevData) => ({
              ...prevData,
              level2ArticlesData: level2ArticlesJSON,
            }));
          }
  
          if (isProduction) {
            const response = await axios.get(BASE_URL("Lst_Level-3-Article"), {
              headers: defaultHeaders,
            });
            setAllData((prevData) => ({
              ...prevData,
              level3ArticlesData: response.data.value,
            }));
          } else {
            setAllData((prevData) => ({
              ...prevData,
              level3ArticlesData: level3ArticlesJSON,
            }));
          }

          if (isProduction) {
            const response = await axios.get(BASE_URL("Lst_Content-Index"), {
              headers: defaultHeaders,
            });
            setAllData((prevData) => ({
              ...prevData,
              contentIndexData: response.data.value,
            }));
          } else {
            setAllData((prevData) => ({
              ...prevData,
              contentIndexData: contentIndexJSON,
            }));
          }

          if (isProduction) {
            const response = await axios.get(BASE_URL("Lst_Numbered-Articles"), {
              headers: defaultHeaders,
            });
            setAllData((prevData) => ({
              ...prevData,
              numberedArticlesData: response.data.value,
            }));
          } else {
            setAllData((prevData) => ({
              ...prevData,
              numberedArticlesData: numberedArticlesJSON,
            }));
          }

          if (isProduction) {
            const response = await axios.get(BASE_URL("Lst_Talent-Intro"), {
              headers: defaultHeaders,
            });
            setAllData((prevData) => ({
              ...prevData,
              talentIntroData: response.data.value,
            }));
          } else {
            setAllData((prevData) => ({
              ...prevData,
              talentIntroData: talentIntroJSON,
            }));
          }

          if (isProduction) {
            const response = await axios.get(BASE_URL("Lst_Talent-People"), {
              headers: defaultHeaders,
            });
            setAllData((prevData) => ({
              ...prevData,
              talentPeopleData: response.data.value,
            }));
          } else {
            setAllData((prevData) => ({
              ...prevData,
              talentPeopleData: talentPeopleJSON,
            }));
          }

          // if (isProduction) {
          //   const response = await axios.get(BASE_URL("Lst_Carousel-People-Video"), {
          //     headers: defaultHeaders,
          //   });
          //   setAllData((prevData) => ({
          //     ...prevData,
          //     carouselPeopleData: response.data.value,
          //   }));
          // } else {
          //   setAllData((prevData) => ({
          //     ...prevData,
          //     carouselPeopleData: carouselPeopleJSON,
          //   }));
          // }

          if (isProduction) {
            const response = await axios.get(BASE_URL("Lst_Awards-Section"), {
              headers: defaultHeaders,
            });
            setAllData((prevData) => ({
              ...prevData,
              awardSectionData: response.data.value,
            }));
          } else {
            setAllData((prevData) => ({
              ...prevData,
              awardSectionData: awardSectionJSON,
            }));
          }

          if (isProduction) {
            const response = await axios.get(BASE_URL("Lst_Award-Images"), {
              headers: defaultHeaders,
            });
            setAllData((prevData) => ({
              ...prevData,
              awardImagesData: response.data.value,
            }));
          } else {
            setAllData((prevData) => ({
              ...prevData,
              awardImagesData: awardImagesJSON,
            }));
          }

          if (isProduction) {
            const response = await axios.get(BASE_URL("Lst_Award-Winners"), {
              headers: defaultHeaders,
            });
            setAllData((prevData) => ({
              ...prevData,
              awardWinnersData: response.data.value,
            }));
          } else {
            setAllData((prevData) => ({
              ...prevData,
              awardWinnersData: awardWinnersJSON,
            }));
          }

          if (isProduction) {
            const response = await axios.get(BASE_URL("Lst_Award-Events"), {
              headers: defaultHeaders,
            });
            setAllData((prevData) => ({
              ...prevData,
              awardEventsData: response.data.value,
            }));
          } else {
            setAllData((prevData) => ({
              ...prevData,
              awardEventsData: awardEventsJSON,
            }));
          }

          if (isProduction) {
            const response = await axios.get(BASE_URL("Lst_Award-Events-Calendar"), {
              headers: defaultHeaders,
            });
            setAllData((prevData) => ({
              ...prevData,
              awardEventsCalendarData: response.data.value,
            }));
          } else {
            setAllData((prevData) => ({
              ...prevData,
              awardEventsCalendarData: awardEventsCalendarJSON,
            }));
          }

          if (isProduction) {
            const response = await axios.get(BASE_URL("Lst_Recipes"), {
              headers: defaultHeaders,
            });
            setAllData((prevData) => ({
              ...prevData,
              recipesData: response.data.value,
            }));
          } else {
            setAllData((prevData) => ({
              ...prevData,
              recipesData: recipesJSON,
            }));
          }


          if (isProduction) {
            const response = await axios.get(BASE_URL("Lst_Resources"), {
              headers: defaultHeaders,
            });
            setAllData((prevData) => ({
              ...prevData,
              resourcesData: response.data.value,
            }));
          } else {
            setAllData((prevData) => ({
              ...prevData,
              resourcesData: resourcesJSON,
            }));
          }

          if (isProduction) {
            const response = await axios.get(BASE_URL("Lst_Resource-Links"), {
              headers: defaultHeaders,
            });
            setAllData((prevData) => ({
              ...prevData,
              resourcesLinksData: response.data.value,
            }));
          } else {
            setAllData((prevData) => ({
              ...prevData,
              resourcesLinksData: resourcesLinksJSON,
            }));
          }

          if (isProduction) {
            const response = await axios.get(BASE_URL("Lst_Pages"), {
              headers: defaultHeaders,
            });
            setAllData((prevData) => ({
              ...prevData,
              pagesData: response.data.value,
            }));
          } else {
            setAllData((prevData) => ({
              ...prevData,
              pagesData: pagesJSON,
            }));
          }

          if (isProduction) {
            const response = await axios.get(BASE_URL("Lst_Ask-me-component"), {
              headers: defaultHeaders,
            });
            setAllData((prevData) => ({
              ...prevData,
              askMeData: response.data.value,
            }));
          } else {
            setAllData((prevData) => ({
              ...prevData,
              askMeData: askMeJSON,
            }));
          }

          if (isProduction) {
            const response = await axios.get(BASE_URL("Lst_Users"), {
              headers: defaultHeaders,
            });
            setAllData((prevData) => ({
              ...prevData,
              usersData: response.data.value,
            }));
          } else {
            setAllData((prevData) => ({
              ...prevData,
              usersData: usersJSON,
            }));
          }


        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);
  
    return allData;
  };
  
  export default GetAllData;