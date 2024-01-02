import React, { useEffect } from "react";

const AwardPrizes = ({ awardImages }) => {
  useEffect(() => {
    ////console.log("AwardPrizes: ", awardImages);
  }, [awardImages]);

  return (
    <>
      {awardImages.length > 0 && (
        <div className="fsot__prize-section">
          <p className="fsot__prize-section-intro">
            What did our Award winners do with their prizes?
          </p>
          <ul className="fsot__prize-img-list">
            {awardImages.map((item, index) => {
              const imageUrl = item?.Award_x002d_Image?.Url; // Use optional chaining
              if (imageUrl) {
                return (
                  <li key={index} className="fsot__prize-img-list--item">
                    <img
                      src={imageUrl}
                      className="fsot__prize-img-list--img"
                      alt={item.Title}
                    />
                  </li>
                );
              }
              return null; // Handle the case where 'Url' is null or undefined
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default AwardPrizes;
