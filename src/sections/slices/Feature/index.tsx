import FeatureDefault from "./default";
import FeatureVariation1 from "./variation1";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";


/**
 * Props for `Feature`.
 */
export type FeatureProps = SliceComponentProps<Content.MediaFeatureSlice>;

/**
 * Component for "Feature" Slices.
 */
const Feature = ({ 
  slice, 
  ...otherProps 
}:FeatureProps): JSX.Element => {
  switch (slice.variation) {
    case "variation1":
      console.log(slice.variation)
      return <FeatureVariation1 slice={slice} {...otherProps} />;
    default:
      return <FeatureDefault slice={slice} {...otherProps} />;
  }
};

export default Feature;
