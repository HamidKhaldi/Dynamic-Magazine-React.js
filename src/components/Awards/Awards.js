import React, { useState, useEffect } from "react";
import SelectFilter from "../../layout/SelectFilter/SelectFilter";
import parse from "html-react-parser";
import WinnerCard from "../../layout/WinnerCard/WinnerCard";
import awardsBgImg from "../../assets/images/Jill-Wellington.png";
import { useMediaString } from "../../hooks/usePathString";
import { useCheckBase64Image } from "../../hooks/useBaseImage";

const AwardsComp = ({ awardSection, awardWinnersArr }) => {
  const [options, setOptions] = useState([]);
  const [awardWinners, setAwardWinners] = useState(awardWinnersArr);
  const [filteredAwardWinners, setFilteredAwardWinners] = useState(awardWinnersArr);
  const [itemsToShow, setItemsToShow] = useState(8);
  const [selectedInput, setSelectedInput] = useState("All");
  const [selectedOptions, setSelectedOptions] = useState([]);

 console.log("awardWinnersArr", awardWinnersArr);

  const optionsArr = [];

  const sortArray = (a, b) => {return a - b}

  const getUniqueListBy = (arr, key) => {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  };

  useEffect(() => {
    if (awardWinners) {
      awardWinners.forEach((awardWinner) => {
        if (awardWinner.Category.length > 0) {
          awardWinner.Category.forEach((category) => {
            let catObj = { value: category, label: category };
            if (!optionsArr.some((opt) => opt.value === catObj.value)) {
              optionsArr.push(catObj);
            }
          });
        }
      });
      setOptions(getUniqueListBy(optionsArr, "value"));
    }
  }, [awardWinners]);

  const filterAwardWinners = () => {
    // Filter based on selectedInput
    let filteredData = awardWinnersArr;
    if (selectedInput !== "All") {
      filteredData = filteredData.filter(
        (awardWinner) => awardWinner.Award_x002d_Type === selectedInput
      );
    }

    // Filter based on selectedOptions
    if (selectedOptions.length > 0) {
      filteredData = filteredData.filter((awardWinner) =>
        selectedOptions.some((option) => awardWinner.Category.includes(option.value))
      );
    }
    filteredData = filteredData.sort(function (a, b) {
      if (a.Title.toLowerCase() < b.Title.toLowerCase()) {
        return -1;
      }
      if (a.Title.toLowerCase() > b.Title.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    setFilteredAwardWinners(filteredData);
  };

  const handleLoadMore = () => {
    setItemsToShow(itemsToShow + 8);
  };

  const handleInputChange = (input) => {
    setSelectedInput(input);
    filterAwardWinners();
  };

  const handleOptionChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions || []); // Handle null selectedOptions
    filterAwardWinners();
  };

  useEffect(() => {
    filterAwardWinners();
  }, [selectedInput, selectedOptions, awardWinnersArr]);

  const mediaPath = useMediaString();
  const bgImg = useCheckBase64Image(awardsBgImg)
    ? awardsBgImg
    : mediaPath + awardsBgImg;

  const bgImgStyle = {
    background: `linear-gradient(rgba(46, 46, 56, 0.9) 10%, transparent), url(${awardSection.Award_x002d_Background_x002d_Ima})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      <div className="fsot__awards-section">
        <div className="fsot__awards-intro-cont">
          <h3 className="fsot__awards-title">{awardSection.Title}</h3>
          { awardSection.Awards_x002d_Intro && <p className="fsot__awards-intro">
            {parse(awardSection.Awards_x002d_Intro)}
          </p> }
        </div>
        <div className="fsot__awards-filter-cont">
          <ul className="fsot__awards-filter-list">
            <li className="fsot__awards-filter-list--item">
              <input
                onChange={() => handleInputChange("All")}
                type="checkbox"
                name="All"
                className="fsot__awards-filter-list--input"
                checked={selectedInput === "All"}
              />
              <label htmlFor="All" className="fsot__awards-filter-list--label">
                All Awards
              </label>
            </li>
            <li className="fsot__awards-filter-list--item">
              <input
                onChange={() => handleInputChange("Individual")}
                type="checkbox"
                name="Individual"
                className="fsot__awards-filter-list--input"
                checked={selectedInput === "Individual"}
              />
              <label
                htmlFor="Individual"
                className="fsot__awards-filter-list--label"
              >
                Individual Awards
              </label>
            </li>
            <li className="fsot__awards-filter-list--item">
              <input
                onChange={() => handleInputChange("Team")}
                type="checkbox"
                name="Team"
                className="fsot__awards-filter-list--input"
                checked={selectedInput === "Team"}
              />
              <label htmlFor="Team" className="fsot__awards-filter-list--label">
                Team Awards
              </label>
            </li>
          </ul>

          <SelectFilter
            theme="dark"
            filterHeading="Categories"
            options={options}
            value={selectedOptions}
            placeholder="Select a category... "
            onChange={handleOptionChange}
          />
        </div>
        <div className="fsot__awards-card-cont" style={bgImgStyle}>
          <h4 className="fsot__awards-card-title">
            {selectedInput === "All" ? "All" : selectedInput} Awards
          </h4>
          <ul className="fsot__awards-card-list">
            {filteredAwardWinners.slice(0, itemsToShow).map((awardWinner, index) => (
              <li key={index} className="fsot__awards-card-list--item">
                <WinnerCard
                  awardWinner={awardWinner}
                  awardType={awardWinner.Award_x002d_Type}
                />
              </li>
            ))}
          </ul>
          {filteredAwardWinners.length > itemsToShow && (
            <button
              onClick={handleLoadMore}
              className="fsot__awards-card-list-btn"
              type="button"
            >
              Load more
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default AwardsComp;
