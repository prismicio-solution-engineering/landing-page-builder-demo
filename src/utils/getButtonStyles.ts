import { LandingDocumentData } from "@/prismicio-types";

export const getButtonStyles = (btn: any, pageData: LandingDocumentData) => {
  return {
    backgroundColor:
      btn.variant === "Primary"
        ? pageData?.primary_color
        : pageData?.secondary_color,
    borderRadius:
      pageData?.button_style === "Medium rounded"
        ? "8px"
        : pageData?.button_style === "Square"
          ? "0px"
          : "12px",
    fontFamily: pageData?.font === "Inter" ? "'Inter', sans-serif" : "inherit"
  };
};
