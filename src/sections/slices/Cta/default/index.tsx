import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Container from "@/components/Container";
import { getFontStyles } from "@/utils/getFontStyles";
import { PrismicNextLink } from "@prismicio/next";
import { getButtonStyles } from "@/utils/getButtonStyles";
import { LandingDocumentData } from "@/prismicio-types";

/**
 * Props for `Cta`.
 */
export type CtaProps = SliceComponentProps<Content.CtaSlice>;

/**
 * Component for "Cta" Slices.
 */
const Cta: FC<CtaProps> = ({ slice, context }) => {
  const { page } = context as { page: LandingDocumentData };
  const pageData = page;

  if (slice.variation !== "default") return null;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`flex justify-center py-[120px]`}
      style={getFontStyles(pageData)}
    >
      <Container
        className="flex flex-col justify-center items-center gap-10 text-center"
        size="lg"
      >
        <PrismicRichText
          field={slice.primary.title}
          components={{
            heading2: ({ children }) => (
              <h2 className="font-bold text-4xl">{children}</h2>
            )
          }}
        />
        <PrismicRichText field={slice.primary.txt} />
        <div className="flex gap-2">
          {slice.primary.btns.map((btn, index) => (
            <PrismicNextLink
              field={btn}
              key={index}
              className="hover:opacity-80 p-3 text-white transition-opacity duration-300 ease-inout2"
              style={getButtonStyles(btn, pageData) as React.CSSProperties}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Cta;
