import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { PageService } from "@/services/page.service";

import { generateMetadata as fetchMetadata } from "@/utils/generateMetadata";

import { components as componentsBoiler } from "@/sections/boiler";
import { components as componentsHeros } from "@/sections/heroes";
import { components as componentsSlices } from "@/sections/slices";

import Layout from "@/components/Layout";

import { LegalsDocument } from "@/prismicio-types";

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  return fetchMetadata({ params: resolvedParams, currentPage: "legals" });
}

export default async function Legals({
  params
}: {
  params: Promise<{ lang: string; uid: string }>;
}) {
  const resolvedParams = await params;
  const { lang, uid } = resolvedParams;

  const pageService = new PageService(lang);

  const [page] = await Promise.all([
    pageService.getPageByUID({ documentType: "legals", uid: uid })
  ]);

  const { data } = page as LegalsDocument;

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
          ...componentsSlices,
          ...componentsBoiler
        }}
      />
    </Layout>
  );
}

export async function generateStaticParams() {
  const pageService = new PageService("*");

  const pages = await pageService.getAllPageByTypes({ documentType: "legals" });

  return pages.map(page => {
    return { uid: page.uid, lang: page.lang };
  });
}
