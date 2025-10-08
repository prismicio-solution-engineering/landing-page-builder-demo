import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Container from "@/components/Container";
import Button from "@/components/Button";

export type Hero404Props = SliceComponentProps<Content.HeroErrorSlice>;

const HeroErrorDefault = ({ slice }: Hero404Props): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Container>
        <div>
          <PrismicNextImage field={slice.primary.img} />
        </div>
        <PrismicRichText field={slice.primary.title} />
        <Button
          text={slice.primary.btntxt}
          link={slice.primary.btnlnk}
          style={1}
        />
      </Container>
    </section>
  );
};

export default HeroErrorDefault;
