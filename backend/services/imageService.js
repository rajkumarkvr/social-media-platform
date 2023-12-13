const fs = require("fs");
const path="/home/rajkumar/project/social-media-platform/backend/public/userprofile.png"
const getDefaultProfile = () => {
  const imgBuffer = fs.readFileSync(path);
  const encodedImage = imgBuffer.toString("base64");
  return encodedImage
};

module.exports=getDefaultProfile;