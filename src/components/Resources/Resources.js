import React, { useState, useEffect } from "react";

import SelectFilter from "../../layout/SelectFilter/SelectFilter";
import ResourceTabs from "../../layout/Tabbing/ResourceTabs";

const Resources = ({ resourcesArr }) => {
  const [options, setOptions] = useState([]);
  const [resources, setResources] = useState(resourcesArr);
  const [filteredResources, setFilteredResources] = useState(resourcesArr);
  const [selectedOptions, setSelectedOptions] = useState([]);

  //console.log("resourcesArr", resourcesArr);
  const optionsArr = [];

  const getUniqueListBy = (arr, key) => {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  };

  useEffect(() => {
    if (resourcesArr) {
      resourcesArr.forEach((resource) => {
        if (resource.Resource_x002d_Links && resource.Resource_x002d_Links.length > 0) {
          resource.Resource_x002d_Links.forEach((resourceLink) => {
            let catObj = { 
              value: resourceLink.Resource_x002d_Country, 
              label: resourceLink.Resource_x002d_Country };
            if (!optionsArr.some((opt) => opt.value === catObj.value)) {
              optionsArr.push(catObj);
            }
          });
        }
      });
      setOptions(getUniqueListBy(optionsArr, "value"));
    }
  }, [resourcesArr, filteredResources]);

  const filterResources = (optionsArr) => {
    let filteredData = []; // Start with the original data
  
    if (optionsArr.length > 0) {
      optionsArr.forEach((option) => {
        let tempResourcesArr = []; // Create a new array for each filter
  
        resourcesArr.forEach((resource) => {
          if (resource.Resource_x002d_Links.length > 0) {
            resource.Resource_x002d_Links.forEach((resourceLink) => {
              if (resourceLink.Resource_x002d_Country === option.value) {
                tempResourcesArr.push(resource);
              }
            });
          }
        });
  
        filteredData = [...filteredData, ...tempResourcesArr]; // Update filteredData for the next filter
      });
  
      setFilteredResources(getUniqueListBy(filteredData, 'Title')); // Set the final filtered data
    } else {
      setFilteredResources(resourcesArr); // If no options are selected, show all resources
    }
  };

  const handleOptionChange = (selectedOptions) => {
    //console.log('selectedOption', selectedOptions);
    setSelectedOptions(selectedOptions || []); // Handle null selectedOptions
    filterResources(selectedOptions);
  };

  return (
    <>
      <ResourceTabs resourcesArr={filteredResources} />
    </>
  );
};

export default Resources;
