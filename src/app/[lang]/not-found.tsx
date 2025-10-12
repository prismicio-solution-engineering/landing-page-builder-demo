import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import Layout from "@/components/Layout";

import { PageService } from "@/services/page.service";

import { generateMetadata as fetchMetadata } from "@/utils/generateMetadata";

import { components as componentsHeros } from "@/sections/heroes";
import { components as componentsSlices } from "@/sections/slices";

import { _404Document, LandingDocument } from "@/prismicio-types";

export async function generateMetadata(): Promise<Metadata> {
  const lang = (process.env.NEXT_PUBLIC_DEFAULT_LOCALE as string) ?? "";
  return fetchMetadata({ params: { lang: lang }, currentPage: "404" });
}

export default async function NotFound() {
  const lang = (process.env.NEXT_PUBLIC_DEFAULT_LOCALE as string) ?? "";
  const pageService = new PageService(lang);

  const [page] = await Promise.all([
    pageService.getSinglePage({ documentType: "404" })
  ]);

  const { data } = page as _404Document;

  return (
    <Layout
      lang={lang}
      altLang={page.alternate_languages}
      currentPage={page.type}
      page={page as LandingDocument}
    >
      <SliceZone
        slices={data.slices}
        components={{
          ...componentsHeros,
          ...componentsSlices
        }}
      />
    </Layout>
  );
}
