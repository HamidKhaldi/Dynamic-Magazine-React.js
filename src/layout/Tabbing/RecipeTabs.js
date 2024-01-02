import React, { useState, useEffect } from "react";
import { useTracking } from "react-tracking";

import RecipeTabContent from "./RecipeTabContent";

const TabComponent = ({ recipesArr }) => {

  const { trackEvent } = useTracking();
  useEffect(() => {
    ////console.log("recipesArr", recipesArr);
  }, [recipesArr]);

  const tabs = [];
  recipesArr.map((recipe) => {
    tabs.push({
      name: recipe.Title,
      content: <RecipeTabContent recipeData={recipe} />,
    });
  });

  ////console.log("tabs", tabs);

  // The state of the active tab
  const [activeTab, setActiveTab] = useState(0);

  // The function to change the active tab
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  // The JSX for rendering the tabs
  const renderTabs = () => {
    if(tabs.length > 0) {
      return tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => {handleTabClick(index); trackEvent({
            component: tab.name,
            event: "Recipe-Tab",
          });}}
          className={`fsot__recipe-tab ${activeTab === index ? "active-tab" : ""}`}
        >
          {tab.name}
        </button>
      ));
    }
  };

  // The JSX for rendering the content
  const renderContent = () => {
    if(tabs.length > 0){
      return (
        <div className="fsot__recipe-tab-content">{tabs[activeTab].content}</div>
      );
    } 
    
  };

  return (
    <div className="fso__recipe-tab-section">
      <div className="fso__recipe-tabs">{renderTabs()}</div>
      {renderContent()}
    </div>
  );
};

export default TabComponent;
