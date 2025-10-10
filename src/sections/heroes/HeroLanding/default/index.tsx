"use client";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Container from "@/components/Container";
import { PrismicNextLink } from "@prismicio/next";
import { getButtonStyles } from "@/utils/getButtonStyles";

/**
 * Props for `HeroLanding`.
 */
export type HeroLandingProps = SliceComponentProps<Content.HeroLandingSlice>;

/**
 * Component for "HeroLanding" Slices.
 */
const HeroLanding: FC<HeroLandingProps> = ({ slice, context }) => {
  console.log(slice);
  console.log(context);
  const pageData = context?.pageData;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex justify-center py-[120px]"
    >
      <Container className="max-w-[500px] text-center" size="xl">
        <PrismicRichText field={slice.primary.title} />
        <PrismicRichText field={slice.primary.txt} />
        <div className="flex gap-2">
          {slice.primary.btns.map((btn, index) => (
            <PrismicNextLink
              field={btn}
              key={index}
              className="p-2 text-white"
              style={getButtonStyles(btn, pageData)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HeroLanding;
