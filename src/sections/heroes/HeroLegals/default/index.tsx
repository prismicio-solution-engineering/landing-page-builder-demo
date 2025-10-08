import { Content } from "@prismicio/client";

import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type HeroLegalsProps = SliceComponentProps<Content.HeroLegalsSlice>;

import Container from "@/components/Container";

const HeroLegalsDefault = ({ slice }: HeroLegalsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Container>
        <PrismicRichText field={slice.primary.title} />
      </Container>
    </section>
  );
};

export default HeroLegalsDefault;
