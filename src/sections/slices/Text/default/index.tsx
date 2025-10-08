import { Content } from "@prismicio/client";

import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Container from "@/components/Container";
export type TextProps = SliceComponentProps<Content.TextSlice>;

const TextDefault = ({ slice }: TextProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Container>
        <PrismicRichText field={slice.primary.txt} />
      </Container>
    </section>
  );
};

export default TextDefault;
