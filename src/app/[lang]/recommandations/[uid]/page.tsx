import { Metadata } from "next";

import { generateMetadata as fetchMetadata } from "@/utils/generateMetadata";

import { RecapDocument } from "@/prismicio-types";
import { createClient } from "@/prismicio";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; uid: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  return fetchMetadata({ params: resolvedParams, currentPage: "recap" });
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string; uid: string }>;
}) {
  const client = createClient();
  const resolvedParams = await params;
  const { lang, uid } = resolvedParams;

  const [page] = await Promise.all([
    client.getByUID("recap", uid, { lang: lang }),
  ]);

  const { data } = page as RecapDocument;

  return (
    <>
      <h1>{data.title}</h1>

      {/* Hero */}
      {/* Context */}
      {/* Opps */}
      {/* Data */}
      {/* Next steps */}
    </>
  );
}
