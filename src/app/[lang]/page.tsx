import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import Layout from "@/components/Layout";

import { PageService } from "@/services/page.service";

import { generateMetadata as fetchMetadata } from "@/utils/generateMetadata";

import { components as componentsHeros } from "@/sections/heroes";
import { components as componentsSlices } from "@/sections/slices";

import { HomeDocument } from "@/prismicio-types";

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  return fetchMetadata({ params: resolvedParams, currentPage: "home" });
}

export default async function Home({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  const pageService = new PageService(lang);

  const [page] = await Promise.all([
    pageService.getSinglePage({ documentType: "home" })
  ]);

  const { data } = page as HomeDocument;

  return (
    <Layout
      lang={lang}
      altLang={page.alternate_languages}
      currentPage={page.type}
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
