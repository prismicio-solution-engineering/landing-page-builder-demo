import { Content } from "@prismicio/client";

import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Container from "@/components/Container";
export type HeroHomeProps = SliceComponentProps<Content.HeroHomeSlice>;

const HeroHomeDefault = ({ slice }: HeroHomeProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Container>
        <PrismicRichText
          field={slice.primary.title}
          components={{
            heading1: ({ children }) => (
              <h1 className="font-inter-bold text-4xl">{children}</h1>
            )
          }}
        />
      </Container>
    </section>
  );
};

export default HeroHomeDefault;
