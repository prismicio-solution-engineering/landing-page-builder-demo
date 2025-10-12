"use client";
import { useState } from "react";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Container from "@/components/Container";
import { getFontStyles } from "@/utils/getFontStyles";
import { ArticleDocument, LandingDocumentData } from "@/prismicio-types";
import { PrismicNextImage } from "@prismicio/next";
/**
 * Props for `Testimonials`.
 */
export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

/**
 * Component for "Testimonials" Slices.
 */
const Testimonials: FC<TestimonialsProps> = ({ slice, context }) => {
  const { pageData } = context as { pageData: LandingDocumentData };

  if (slice.variation !== "default") return null;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`flex justify-center my-[120px] overflow-hidden`}
      style={getFontStyles(pageData)}
    >
      <Container
        className="flex flex-col justify-between gap-10 text-left"
        size="xl"
      >
        <></>
      </Container>
    </section>
  );
};

export default Testimonials;
