import HeroLandingDefault from "./default";
import HeroLandingVariant1 from "./variation1";
import HeroLandingVariant2 from "./variation2";

import type { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { LandingDocumentData } from "@/prismicio-types";

export type HeroLandingProps = SliceComponentProps<Content.HeroLandingSlice> & {
  context: { pageData: LandingDocumentData };
};

const HeroLanding = ({
  slice,
  ...otherProps
}: HeroLandingProps): JSX.Element => {
  switch (slice.variation) {
    case "variation1":
      return <HeroLandingVariant1 slice={slice} {...otherProps} />;
    case "variation2":
      return <HeroLandingVariant2 slice={slice} {...otherProps} />;
    default:
      return <HeroLandingDefault slice={slice} {...otherProps} />;
  }
};

export default HeroLanding;
