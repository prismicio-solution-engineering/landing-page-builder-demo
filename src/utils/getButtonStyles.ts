export const getButtonStyles = (btn: any, pageData: any) => {
  return {
    backgroundColor:
      btn.variant === "Primary"
        ? pageData?.primary_color
        : pageData?.secondary_color,
    borderRadius:
      pageData?.buttonstyle === "Medium rounded"
        ? "8px"
        : pageData?.buttonstyle === "Square"
          ? "0px"
          : "12px",
    fontFamily: pageData?.font === "Inter" ? "'Inter', sans-serif" : "inherit"
  };
};
