import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import FeatureDefault from "./default";

/**
 * Props for `Feature`.
 */
export type FeatureProps = SliceComponentProps<Content.MediaFeatureSlice>;

/**
 * Component for "Feature" Slices.
 */
const Feature = ({ slice, ...otherProps }: FeatureProps): JSX.Element => {
  switch (slice.variation) {
    default:
      return <FeatureDefault slice={slice} {...otherProps} />;
  }
};

export default Feature;
