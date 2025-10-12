import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Container from "@/components/Container";
import { getFontStyles } from "@/utils/getFontStyles";
import { LandingDocumentData } from "@/prismicio-types";

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const Carousel: FC<CarouselProps> = ({ slice, context }) => {
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
      <Container className="flex justify-between gap-10 text-left" size="xl">
        <div className="flex justify-between items-end w-full">
          <div className="flex flex-col gap-5 sm:max-w-[500px]">
            <PrismicRichText field={slice.primary.ontitle} />
            <PrismicRichText
              field={slice.primary.title}
              components={{
                heading3: ({ children }) => (
                  <h2 className="font-bold text-4xl">{children}</h2>
                )
              }}
            />
            <PrismicRichText
              field={slice.primary.txt}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-gray-700 text-lg leading-7">{children}</p>
                )
              }}
            />
          </div>
          <div className="p-3 border border-gray-900">
            <span>{slice.primary.btn_txt}</span>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Carousel;
