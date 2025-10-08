import { HeaderDocument } from "@/prismicio-types";

import { PropsLayoutHF } from "@/types";
import Container from "../Container";

const Header = ({ header, ...props }: { header: HeaderDocument }) => {
  const { data } = header;
  const { lang, altLang, currentPage } = props as PropsLayoutHF;
  return (
    <>
      <header className="fixed w-full bg-primary_2 text-4xl">
        <Container>Header</Container>
      </header>
      <div className="h-10" />
    </>
  );
};

export default Header;
