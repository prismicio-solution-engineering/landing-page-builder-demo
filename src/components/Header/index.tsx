"use client";
import { useEffect, useState } from "react";

import { PropsLayoutHF } from "@/types";
import Container from "../Container";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { getFontStyles } from "@/utils/getFontStyles";
import { getButtonStyles } from "@/utils/getButtonStyles";

const Header = (props: PropsLayoutHF) => {
  const { page } = props;
  const { data } = page;
  const [showHeader, setShowHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 20) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsMounted(true);
    setShowHeader(true);
  }, []);

  return (
    <>
      <header
        className={`fixed top-5 w-[calc(100%-40px)] md:w-[calc(100%-80px)] left-5 md:left-10 bg-white z-100 flex items-center shadow-lg rounded-lg h-[75px] -translate-y-[150%] ${showHeader ? "translate-y-0" : "-translate-y-[150%]"} transition-all duration-500 ease-inout2 ${isMounted && showHeader ? "duration-800" : "duration-500"}`}
        style={getFontStyles(data)}
      >
        <Container className="flex justify-between items-center h-full">
          <PrismicNextImage field={data.logo} className="w-auto h-8" />
          <nav className="flex gap-4">
            {data?.lnks?.map((item, index) => (
              <PrismicNextLink
                field={item}
                key={index}
                className="ml-6 font-medium text-gray-700 hover:text-gray-900 text-sm"
              />
            ))}
          </nav>
          <PrismicNextLink
            field={data.cta}
            className="flex items-center gap-2 hover:opacity-80 p-3 w-fit text-white transition-opacity duration-300 ease-inout2"
            style={getButtonStyles(data.cta, data) as React.CSSProperties}
          >
            <span>{data.cta.text}</span>
            <svg width="14" height="13" viewBox="0 0 14 13" fill="none">
              <path
                d="M7.69603 0.870117L12.9993 6.17342M12.9993 6.17342L7.69603 11.4767M12.9993 6.17342L1 6.17342"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
              ></path>
            </svg>
          </PrismicNextLink>
        </Container>
      </header>
      <div className="h-10" />
    </>
  );
};

export default Header;
