import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { PageService } from "@/services/page.service";

import { generateMetadata as fetchMetadata } from "@/utils/generateMetadata";

import { components as componentsHeros } from "@/sections/heroes";
import { components as componentsSlices } from "@/sections/slices";

import Layout from "@/components/Layout";

import { LandingDocument } from "@/prismicio-types";

import { notFound } from "next/navigation";

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  return fetchMetadata({ params: resolvedParams, currentPage: "landing" });
}

export default async function Landings({
  params
}: {
  params: Promise<{ lang: string; uid: string }>;
}) {
  const resolvedParams = await params;
  const { lang, uid } = resolvedParams;

  const pageService = new PageService(lang);

  const [page] = await Promise.all([
    pageService.getPageByUID({ documentType: "landing", uid: uid })
  ]);
  if (!page) {
    notFound();
  }

  const { data } = page as LandingDocument;

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
        context={{ pageData: page.data, locale: page?.lang }}
      />
      <></>
    </Layout>
  );
}

export async function generateStaticParams() {
  const pageService = new PageService("*");

  const pages = await pageService.getAllPageByTypes({
    documentType: "landing"
  });

  return pages?.map(page => {
    return { uid: page.uid, lang: page.lang };
  });
}
