
export const useCheckBase64Image = (str) => {
    // Define a regular expression to match the pattern of base64-encoded data for image types (PNG, JPEG, GIF, etc.).
    const base64Pattern = /^(data:image\/(png|jpeg|jpg|gif|bmp);base64,)/;
  
    return base64Pattern.test(str);
  }
 