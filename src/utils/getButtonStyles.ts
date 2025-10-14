import { LandingDocumentData } from "@/prismicio-types";
import { LinkField } from "@prismicio/client";

export const getButtonStyles = (
  btn: LinkField,
  pageData: LandingDocumentData
) => {
  const getBackgroundColor = () => {
    switch (btn?.variant || btn) {
      case "Primary":
        return pageData?.primary_color;
      default:
        return pageData?.secondary_color;
    }
  };

  const getBorderRadius = () => {
    switch (pageData?.button_style) {
      case "Medium rounded":
        return "8px";
      case "Square":
        return "0px";
      default:
        return "12px";
    }
  };

  const getFontFamily = () => {
    switch (pageData?.font_heading) {
      case "Proxima Bold":
        return "'Proxima-Bold', sans-serif";
      default:
        return "Arial, sans-serif";
    }
  };

  return {
    backgroundColor: getBackgroundColor() || "#000",
    borderRadius: getBorderRadius(),
    fontFamily: getFontFamily(),
    padding: "10px 20px"
  };
};
