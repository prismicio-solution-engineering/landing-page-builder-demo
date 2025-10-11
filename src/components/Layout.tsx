import { ReactNode } from "react";

import { CustomService } from "@/services/custom.service";

import FooterComponent from "@/components/Footer";
import HeaderComponent from "@/components/Header";
import {
  FooterDocument,
  // HeaderDocument,
  LandingDocument
} from "@/prismicio-types";
import { AlternateLanguage } from "@prismicio/client";

import { PropsLayoutHF } from "@/types";

const Header = async (props: PropsLayoutHF) => {
  // const customService = new CustomService(props.lang);
  // const header = (await customService.getHeader()) as HeaderDocument;

  return <HeaderComponent {...props} />;
};

const Footer = async (props: PropsLayoutHF) => {
  const customService = new CustomService(props.lang);
  const footer = (await customService.getFooter()) as FooterDocument;

  return <FooterComponent footer={footer} {...props} />;
};

export default function Layout({
  children,
  ...props
}: {
  children: ReactNode;
  lang: string;
  altLang: AlternateLanguage<string, string>[];
  currentPage: string;
  page: LandingDocument;
}) {
  return (
    <>
      <Header {...props} />
      <main>{children}</main>
      <Footer {...props} />
    </>
  );
}
