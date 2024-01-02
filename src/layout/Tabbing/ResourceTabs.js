import React, { useState, useEffect } from "react";
import { useTracking } from "react-tracking";


import ResourceTabContent from "./ResourceTabContent";

// Main component
const ResourceTabs = ({ resourcesArr }) => {

  const { trackEvent } = useTracking();
  useEffect(() => {
    ////console.log("resourcesArr", resourcesArr);
  }, [resourcesArr]);

  const tabs = [];
  resourcesArr.map((resource) => {
    tabs.push({
      name: resource.Title,
      content: <ResourceTabContent resourceData={resource} />,
    });
  });


  // The state of the active tab
  const [activeTab, setActiveTab] = useState(0);

  // The function to change the active tab
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  // The JSX for rendering the tabs
  const renderTabs = () => {
    return tabs.map((tab, index) => (
      <button
        key={index}
        onClick={() => {handleTabClick(index);   trackEvent({
          component: tab.name,
          event: "Resource-Tab",
        });}}
        className={`fsot__resource-tab ${activeTab === index ? "active-resource-tab" : ""}`}
      >
        {tab.name}
      </button>
    ));
  };

  // The JSX for rendering the content
  const renderContent = () => {
    return <div className="fsot__resource-tab-content">{tabs[activeTab].content}</div>;
  };

  return (
    <div className="fsot__resource-tab-section">
      <div className="fsot__resource-tabs">{renderTabs()}</div>
      {renderContent()}
    </div>
  );
};

export default ResourceTabs;
