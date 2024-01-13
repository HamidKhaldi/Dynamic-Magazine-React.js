var fs = require("fs");

var input = process.argv[2];
var output = process.argv[3];
var environment = process.argv[4];

console.log("environment", environment);

let pathString;
switch (environment) {
  case "staging":
    pathString =
      "siteUrl/SiteAssets/Staging-Pages/static";
    break;
  case "test":
    pathString =
      "siteUrl/SiteAssets/Test-Pages/static";
    break;
  case "live":
    pathString =
      "siteUrl/SiteAssets/Pages/static";
    break;

  default:
    break;
}

var content = fs.readFileSync(input, "utf8");
// console.log(content);
// take test site of of all urls

var newStr = content.replace(/static/g, pathString);
// console.log(newStr);

newStr = newStr.replace(/\/https/g, "https");
newStr = newStr.replace(/\/manifest.json/g, "");

fs.writeFileSync(output, newStr);
