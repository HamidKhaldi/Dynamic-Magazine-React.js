const isProduction = true; // For production set true

export const usePathString = () => {
  if (isProduction) {
    return "/sites/FSO-Together/SiteAssets/Pages/FSO-Together.aspx";
  }
  return "";
};

export const useMediaString = () => {
  if (isProduction) {
    return "siteUrl/SiteAssets/Pages";
  } 
  return "";
}

// export const usePathString = () => {
//   if (isProduction) {
//     return "/sites/FSO-Together/SiteAssets/Test-Pages/FSO-Together.aspx";
//   }
//   return "";
// };

// export const useMediaString = () => {
//   if (isProduction) {
//     return "siteUrl/SiteAssets/Test-Pages";
//   } 
//   return "";
// }


export { isProduction };