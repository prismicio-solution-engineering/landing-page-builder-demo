import { LandingDocumentData } from "@/prismicio-types";

export const getFontStyles = (pageData: LandingDocumentData) => {
  return {
    fontFamily:
      pageData?.font === "Inter"
        ? "'Inter', sans-serif"
        : "Helvetica, Arial, sans-serif"
  };
};
