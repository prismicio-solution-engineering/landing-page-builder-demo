import { LandingDocumentData } from "@/prismicio-types";

export const getButtonStyles = (btn: any, pageData: LandingDocumentData) => {
  const getBackgroundColor = () => {
    switch (btn.variant) {
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
    switch (pageData?.font) {
      case "Inter":
        return "'Inter', sans-serif";
      default:
        return "inherit";
    }
  };

  return {
    backgroundColor: getBackgroundColor(),
    borderRadius: getBorderRadius(),
    fontFamily: getFontFamily()
  };
};
