import { LandingDocumentData } from "@/prismicio-types";

export const getFontStyles = (pageData: LandingDocumentData) => {
  const getFontFamily = () => {
    switch (pageData?.font) {
      case "Inter":
        return "'Inter', sans-serif";
      default:
        return "Helvetica, Arial, sans-serif";
    }
  };

  return {
    fontFamily: getFontFamily()
  };
};
