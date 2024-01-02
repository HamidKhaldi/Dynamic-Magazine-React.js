import { useState, useEffect, useLayoutEffect, useContext } from "react";
import axios from "axios";

import { AllDataContext } from "../store/data-context";
import { useTracking } from "react-tracking";
import PageAnalytics from "../analyticsPlugin/PageAnalytics";

import HeroPrimary from "../layout/Hero/HeroPrimary";
import HeroSecondary from "../layout/Hero/HeroSecondary";
import Quote from "../layout/Quote/Quote";
import LevelOneArticle from "../layout/Article/LevelOneArticle";
import ArticleIndexing from "../components/Indexing/ArticleIndexing";
import LevelTwoArticle from "../layout/Article/LevelTwoArticle";
import NumberedArticle from "../layout/Article/NumberedArticle";
import LevelThreeArticle from "../layout/Article/LevelThreeArticle";
import AwardsComp from "../components/Awards/Awards";
import AwardPrizes from "../components/Awards/AwardPrizes";
import AwardEvents from "../components/Awards/AwardEvents";
import ChatComp from "../layout/Chat/Chat";
import RecipeTabs from "../layout/Tabbing/RecipeTabs";
import Resources from "../components/Resources/Resources";
import TalentComp from "../components/Talent/TalentComp";
import { isProduction } from "../hooks/usePathString";
import Back from "../layout/Back/Back";

const PageTemplate = ({ pageID, Title }) => {
  const [pageData, setPageData] = useState({});
  const dataCtx = useContext(AllDataContext);
  console.log("dataCtx", dataCtx);

  const componentArr = [
    { component: <Quote />, componentIdentifier: "Quote" },
    { component: <LevelOneArticle />, componentIdentifier: "LevelOneArticle" },
    {
      component: <LevelThreeArticle />,
      componentIdentifier: "LevelThreeArticle",
    },
    { component: <LevelTwoArticle />, componentIdentifier: "LevelTwoArticle" },
    { component: <NumberedArticle />, componentIdentifier: "NumberedArticle" },
    { component: <ArticleIndexing />, componentIdentifier: "ArticleIndexing" },
    { component: <TalentComp />, componentIdentifier: "TalentComp" },
    { component: <AwardsComp />, componentIdentifier: "AwardsComp" },
    { component: <AwardPrizes />, componentIdentifier: "AwardPrizes" },
    { component: <AwardEvents />, componentIdentifier: "AwardEvents" },
    { component: <RecipeTabs />, componentIdentifier: "RecipeTabs" },
    { component: <Resources />, componentIdentifier: "Resources" },
  ];

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pageID, dataCtx.pagesData]);

  useEffect(() => {
    const filteredPageData = dataCtx.pagesData.find(
      (page) => page.ID === parseInt(pageID)
    );
    setPageData(filteredPageData);
  }, [pageID, dataCtx.pagesData]);

  useEffect(() => {
    const getUserDetails = (id) => {
      const user = dataCtx.usersData.find((user) => user.ID === id);
      return user;
    };

    //console.log("pageData inside", pageData);

    if (pageData.Component_x002d_OrderId) {
      let componentOrderArr = [],
        displayComponentsArr = [];
      pageData.Component_x002d_OrderId.forEach((compId) => {
        //console.log("compId", compId);
        let matchedComponent = dataCtx.componentOrderData.filter(
          (comp) => comp.ID === compId
        );
        //console.log("matchedComponent[0]", matchedComponent[0]);
        if (matchedComponent[0]) {
          componentOrderArr.push(matchedComponent[0]);
        }
      });
      if (componentOrderArr.length > 0) {
        //console.log("componentOrderArr", componentOrderArr);
        componentArr.forEach((comp) => {
          //console.log("comp.componentIdentifier", comp.componentIdentifier);
          componentOrderArr.map((compOrder) => {
            //console.log("compOrder.Title", compOrder.Title);
            if (compOrder && compOrder.Title === comp.componentIdentifier) {
              displayComponentsArr.push({
                component: comp.componentIdentifier,
                order: componentOrderArr.indexOf(compOrder) + 1,
              });
            }
          });
        });
        //console.log("displayComponentsArr", displayComponentsArr);
        setPageData((prevState) => ({
          ...prevState,
          Display_x002d_Components: displayComponentsArr,
        }));
      }
    }

    if (pageData.Primary_x002d_HeroId) {
      let primaryHero = dataCtx.primaryHeroData.filter(
        (hero) => hero.ID === pageData.Primary_x002d_HeroId
      );
      setPageData((prevState) => ({
        ...prevState,
        Primary_x002d_Hero: primaryHero[0],
      }));
    }

    if (pageData.Secondary_x002d_HeroId) {
      let secondaryHero = dataCtx.secondaryHeroData.filter(
        (hero) => hero.ID === pageData.Secondary_x002d_HeroId
      );
      setPageData((prevState) => ({
        ...prevState,
        Secondary_x002d_Hero: secondaryHero[0],
      }));
    }

    if (pageData.QuotesId) {
      let quotes = [];

      const quoteUserDetailsPromises = pageData.QuotesId.map(
        async (quoteId) => {
          if (quoteId) {
            const matchedQuote = dataCtx.quotesData.find(
              (quote) => quote.ID === quoteId
            );
            //console.log("matchedQuote", matchedQuote);
            if (matchedQuote) {
              // if (isProduction) {
              // //console.log('isProduction', isProduction);
              const userDetails = getUserDetails(matchedQuote.Quote_AuthorId);
              matchedQuote.userDetails = userDetails;
              // }
              quotes.push(matchedQuote);
            }
          }
        }
      );

      Promise.all(quoteUserDetailsPromises)
        .then(() => {
          setPageData((prevState) => ({
            ...prevState,
            Quotes: quotes,
          }));
        })
        .catch((error) => {
          console.error("Error fetching user details for quotes:", error);
        });
    }

    if (pageData.Content_x002d_IndexId) {
      const contentIndexId = pageData.Content_x002d_IndexId;
      let contentIndex = dataCtx.contentIndexData.find(
        (content) => content.ID === contentIndexId
      );
      if (contentIndex) {
        contentIndex.Main_x002d_Author = contentIndex.Main_x002d_AuthorId
          ? getUserDetails(contentIndex.Main_x002d_AuthorId)
          : null;
        contentIndex.Highlight_x002d_1_x002d_Author =
          contentIndex.Highlight_x002d_1_x002d_AuthorId
            ? getUserDetails(contentIndex.Highlight_x002d_1_x002d_AuthorId)
            : null;
        contentIndex.Highlight_x002d_2_x002d_Author =
          contentIndex.Highlight_x002d_2_x002d_AuthorId
            ? getUserDetails(contentIndex.Highlight_x002d_2_x002d_AuthorId)
            : null;
        contentIndex.OA_x002d_1_x002d_Author =
          contentIndex.OA_x002d_1_x002d_AuthorId
            ? getUserDetails(contentIndex.OA_x002d_1_x002d_AuthorId)
            : null;
        contentIndex.OA_x002d_2_x002d_Author =
          contentIndex.OA_x002d_2_x002d_AuthorId
            ? getUserDetails(contentIndex.OA_x002d_2_x002d_AuthorId)
            : null;
        contentIndex.OA_x002d_3_x002d_Author =
          contentIndex.OA_x002d_3_x002d_AuthorId
            ? getUserDetails(contentIndex.OA_x002d_3_x002d_AuthorId)
            : null;
        contentIndex.OA_x002d_4_x002d_Author =
          contentIndex.OA_x002d_4_x002d_AuthorId
            ? getUserDetails(contentIndex.OA_x002d_4_x002d_AuthorId)
            : null;
        contentIndex.OA_x002d_5_x002d_Author =
          contentIndex.OA_x002d_5_x002d_AuthorId
            ? getUserDetails(contentIndex.OA_x002d_5_x002d_AuthorId)
            : null;
        setPageData((prevState) => ({
          ...prevState,
          Content_x002d_Index: contentIndex,
        }));
      } else {
        console.warn("Content index not found for ID:", contentIndexId);
      }
    }

    if (
      pageData.Level_x002d_1_x002d_ArticleId &&
      pageData.Level_x002d_1_x002d_ArticleId.length > 0
    ) {
      let level1Articles = [];
      pageData.Level_x002d_1_x002d_ArticleId.forEach((articleId) => {
        let matchedArticle = dataCtx.level1ArticlesData.filter(
          (article) => article.ID === articleId
        );
        level1Articles.push(matchedArticle[0]);
      });
      setPageData((prevState) => ({
        ...prevState,
        Level_x002d_1_x002d_Articles: level1Articles,
      }));
    }

    if (
      pageData.Level_x002d_2_x002d_ArticleId &&
      pageData.Level_x002d_2_x002d_ArticleId.length > 0
    ) {
      let level2Articles = [];
      pageData.Level_x002d_2_x002d_ArticleId.forEach((articleId) => {
        let matchedArticle = dataCtx.level2ArticlesData.filter(
          (article) => article.ID === articleId
        );
        level2Articles.push(matchedArticle[0]);
      });
      setPageData((prevState) => ({
        ...prevState,
        Level_x002d_2_x002d_Articles: level2Articles,
      }));
    }

    if (
      pageData.Level_x002d_3_x002d_ArticleId &&
      pageData.Level_x002d_3_x002d_ArticleId.length > 0
    ) {
      let level3Articles = [];
      pageData.Level_x002d_3_x002d_ArticleId.forEach((articleId) => {
        let matchedArticle = dataCtx.level3ArticlesData.filter(
          (article) => article.ID === articleId
        );
        level3Articles.push(matchedArticle[0]);
      });
      setPageData((prevState) => ({
        ...prevState,
        Level_x002d_3_x002d_Articles: level3Articles,
      }));
    }

    if (pageData.Numbered_x002d_ArticlesId) {
      let matchedArticle = dataCtx.numberedArticlesData.filter(
        (article) => article.ID === pageData.Numbered_x002d_ArticlesId
      );
      setPageData((prevState) => ({
        ...prevState,
        Numbered_x002d_Articles: matchedArticle[0],
      }));
    }

    if (pageData.Award_x002d_SectionId) {
      let awardSection = dataCtx.awardSectionData.filter(
        (section) => section.ID === pageData.Award_x002d_SectionId
      );
      setPageData((prevState) => ({
        ...prevState,
        Award_x002d_Section: awardSection[0],
      }));
    }

    if (pageData.Talent_x002d_IntroId) {
      let talentIntroSection = dataCtx.talentIntroData.filter(
        (section) => section.ID === pageData.Talent_x002d_IntroId
      );
      setPageData((prevState) => ({
        ...prevState,
        Talent_x002d_Intro: talentIntroSection[0],
      }));
    }

    if (
      pageData.Talent_x002d_PeopleId &&
      pageData.Talent_x002d_PeopleId.length > 0
    ) {
      let talentPeople = [];
      pageData.Talent_x002d_PeopleId.map((talentItem) => {
        let matchedItem = dataCtx.talentPeopleData.filter(
          (item) => item.ID === talentItem
        );
        talentPeople.push(matchedItem[0]);
      });

      const talentUserDetailsPromises = talentPeople.map(async (item) => {
        if (item) {
          item.userDetails = getUserDetails(item.NomineeId);
        }
      });

      Promise.all(talentUserDetailsPromises)
        .then(() => {
          setPageData((prevState) => ({
            ...prevState,
            Talent_x002d_People: talentPeople,
          }));
        })
        .catch((error) => {
          console.error(
            "Error fetching user details for talent people:",
            error
          );
        });
    }

    if (pageData.Award_x002d_SectionId) {
      let awardSection = dataCtx.awardSectionData.filter(
        (section) => section.ID === pageData.Award_x002d_SectionId
      );
      setPageData((prevState) => ({
        ...prevState,
        Award_x002d_Section: awardSection[0],
      }));
    }

    if (
      pageData.Awards_x002d_WinnersId &&
      pageData.Awards_x002d_WinnersId.length > 0
    ) {
      let awardWinndersArr = [];

      const awardUserDetailsPromises = pageData.Awards_x002d_WinnersId.map(
        async (awardWinnerId) => {
          if (awardWinnerId) {
            const matchedAwardWinner = dataCtx.awardWinnersData.find(
              (awardWinner) => awardWinner.ID === awardWinnerId
            );
            //console.log("matchedAwardWinner", matchedAwardWinner);
            if (matchedAwardWinner) {
              if (matchedAwardWinner.Winners_x002d_DetailsId) {
                //console.log("isProduction", isProduction);
                const userDetails = getUserDetails(
                  matchedAwardWinner.Winners_x002d_DetailsId
                );
                matchedAwardWinner.userDetails = userDetails;
              }
              awardWinndersArr.push(matchedAwardWinner);
            }
          }
        }
      );

      Promise.all(awardUserDetailsPromises)
        .then(() => {
          setPageData((prevState) => ({
            ...prevState,
            Award_x002d_Winners: awardWinndersArr,
          }));
        })
        .catch((error) => {
          console.error(
            "Error fetching user details for award winners:",
            error
          );
        });

      // });
    }

    if (pageData.Award_x002d_ImagesId) {
      let imagesArr = [];
      pageData.Award_x002d_ImagesId.forEach((imageId) => {
        let matchedImage = dataCtx.awardImagesData.filter(
          (image) => image.ID === imageId
        );
        imagesArr.push(matchedImage[0]);
      });
      setPageData((prevState) => ({
        ...prevState,
        Award_x002d_Images: imagesArr,
      }));
    }

    if (pageData.Award_x002d_EventsId) {
      let matchedEvent = dataCtx.awardEventsData.filter(
        (event) => event.ID === pageData.Award_x002d_EventsId
      );
      if (matchedEvent[0].Award_x002d_DatesId.length > 0) {
        let awardDatesArr = [];
        matchedEvent[0].Award_x002d_DatesId.forEach((awardDateId) => {
          let matchedAwardDate = dataCtx.awardEventsCalendarData.filter(
            (awardDate) => awardDate.ID === awardDateId
          );
          awardDatesArr.push(matchedAwardDate[0]);
        });
        matchedEvent[0].Award_x002d_Dates = awardDatesArr;
      }
      setPageData((prevState) => ({
        ...prevState,
        Award_x002d_Events: matchedEvent[0],
      }));
    }

    if (pageData.RecipesId) {
      let recipesArr = [];
      pageData.RecipesId.forEach((recipeId) => {
        let matchedRecipe = dataCtx.recipesData.filter(
          (recipe) => recipe.ID === recipeId
        );
        recipesArr.push(matchedRecipe[0]);
      });
      setPageData((prevState) => ({
        ...prevState,
        Recipes: recipesArr,
      }));
    }

    if (pageData.ResourcesId && pageData.ResourcesId.length > 0) {
      let resourcesArr = [];
      pageData.ResourcesId.forEach((resourceId) => {
        let matchedResource = dataCtx.resourcesData.filter(
          (resource) => resource.ID === resourceId
        );
        if (
          matchedResource[0].Resource_x002d_LinksId !== null &&
          matchedResource[0].Resource_x002d_LinksId.length > 0
        ) {
          let linksArr = [];
          matchedResource[0].Resource_x002d_LinksId.forEach((linkId) => {
            let matchedLink = dataCtx.resourcesLinksData.filter(
              (link) => link.ID === linkId
            );
            linksArr.push(matchedLink[0]);
          });
          matchedResource[0].Resource_x002d_Links = linksArr;
        }
        resourcesArr.push(matchedResource[0]);
      });

      setPageData((prevState) => ({
        ...prevState,
        Resources: resourcesArr,
      }));
    }
  }, [pageData.Primary_x002d_HeroId, pageData.Secondary_x002d_Hero]);

  console.log("pageData after filter ", pageData);

  const checkComponentOrder = (compName) => {
    if (pageData.Display_x002d_Components) {
      const matchedComp = pageData.Display_x002d_Components.find(
        (compObj) => compObj.component === compName
      );
      if (matchedComp) {
        return matchedComp.order;
      } else {
        return null;
      }
    }
  };

  return (
    <>
      <PageAnalytics pageName={pageData.Title}>
        {pageData.Primary_x002d_Hero && (
          <HeroPrimary
            smallHeading={pageData.Primary_x002d_Hero.Title}
            largeHeading={pageData.Primary_x002d_Hero.Large_x002d_Heading}
            banner={pageData.Primary_x002d_Hero.Banner.Url}
            introHeading={pageData.Primary_x002d_Hero.Intro_x002d_Heading}
            introText={pageData.Primary_x002d_Hero.Intro_x002d_Text}
          />
        )}
        {pageData.Secondary_x002d_Hero && (
          <HeroSecondary
            smallHeading={pageData.Secondary_x002d_Hero.Title}
            largeHeading={pageData.Secondary_x002d_Hero.Large_x002d_Heading}
            banner={pageData.Secondary_x002d_Hero.Banner.Url}
            introHeading={pageData.Secondary_x002d_Hero.Intro_x002d_Heading}
            introText={pageData.Secondary_x002d_Hero.Intro_x002d_Text}
            heroText={pageData.Secondary_x002d_Hero.Hero_x002d_Text}
          />
        )}
        <div className="fsot__app-main-section">
          {pageData.Quotes && pageData.Quotes.length > 0 && (
            <div style={{ order: checkComponentOrder("Quote") }}>
              <Quote quoteContent={pageData.Quotes[0]} />
            </div>
          )}
          {pageData.Level_x002d_1_x002d_Articles && (
            <div style={{ order: checkComponentOrder("LevelOneArticle") }}>
              <LevelOneArticle
                l1ArticlesArr={pageData.Level_x002d_1_x002d_Articles}
              />
            </div>
          )}
          {pageData.Level_x002d_2_x002d_Articles && (
            <div style={{ order: checkComponentOrder("LevelTwoArticle") }}>
              <LevelTwoArticle
                l2ArticlesArr={pageData.Level_x002d_2_x002d_Articles}
              />
            </div>
          )}
          {pageData.Level_x002d_3_x002d_Articles && (
            <div style={{ order: checkComponentOrder("LevelThreeArticle") }}>
              <LevelThreeArticle
                l3ArticlesArr={pageData.Level_x002d_3_x002d_Articles}
              />
            </div>
          )}
          {pageData.Numbered_x002d_Articles && (
            <div style={{ order: checkComponentOrder("NumberedArticle") }}>
              <NumberedArticle
                numberedArticles={pageData.Numbered_x002d_Articles}
              />
            </div>
          )}
          {pageData.Content_x002d_Index && (
            <div style={{ order: checkComponentOrder("ArticleIndexing") }}>
              <ArticleIndexing contentIndex={pageData.Content_x002d_Index} />
            </div>
          )}
          {pageData.Talent_x002d_People && (
            <div style={{ order: checkComponentOrder("TalentComp") }}>
              <TalentComp
                talentIntro={pageData.Talent_x002d_Intro}
                talentArr={pageData.Talent_x002d_People}
              />
            </div>
          )}
          {pageData.Award_x002d_Section && pageData.Award_x002d_Winners && (
            <div style={{ order: checkComponentOrder("AwardsComp") }}>
              <AwardsComp
                awardSection={pageData.Award_x002d_Section}
                awardWinnersArr={pageData.Award_x002d_Winners}
              />
            </div>
          )}
          {pageData.Award_x002d_Images && (
            <div style={{ order: checkComponentOrder("AwardPrizes") }}>
              <AwardPrizes awardImages={pageData.Award_x002d_Images} />
            </div>
          )}
          {pageData.Award_x002d_Events && (
            <div style={{ order: checkComponentOrder("AwardEvents") }}>
              <AwardEvents awardEventsDetails={pageData.Award_x002d_Events} />
            </div>
          )}
          {pageData.Recipes && pageData.Recipes.length > 0 && (
            <div style={{ order: checkComponentOrder("RecipeTabs") }}>
              <RecipeTabs recipesArr={pageData.Recipes} />
            </div>
          )}
          {pageData.Resources && (
            <div style={{ order: checkComponentOrder("Resources") }}>
              <Resources resourcesArr={pageData.Resources} />
            </div>
          )}
        </div>
        {dataCtx.askMeData && (
          <ChatComp askMeData={dataCtx.askMeData} pageID={pageData.ID} />
        )}
        {pageData.Primary_x002d_Hero && pageData.ID !== 1 && <Back />}
      </PageAnalytics>
    </>
  );
};

export default PageTemplate;
