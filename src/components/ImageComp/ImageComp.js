const ImageComp = (props) => {
  const { title, icon, alt } = props;

  return (
    <>
      <div className="image-wrapper">
        <img className="image-icon" src={`https://eygb.sharepoint.com/:u:/r/sites/Creative-UK/SiteAssets/Pages-test-k/` + icon} alt={alt} />
        <h1 className="image-title">{title}</h1>
        <div className="image-bottom-icon"></div>
      </div>
      {/* TODO: Loop keywords/capabilities - need to add a column for capabilities */}
      <div className="image-overlay">
        <h1 className="image-title">{title}</h1>
        <ul className="image-content">
          <li className="image-content-item">Proofreading</li>
          <li className="image-content-item">Copyediting</li>
          <li className="image-content-item">Writing</li>
          <li className="image-content-item">Translation and transcreation</li>
        </ul>
      </div>
    </>
  );
};

export default ImageComp;