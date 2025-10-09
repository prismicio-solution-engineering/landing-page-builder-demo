import { createClient } from "@/prismicio";
import { NextRequest, NextResponse } from "next/server";
import { AllDocumentTypes } from "@/prismicio-types";
import { Client } from "@prismicio/client";

async function getRewrites(client: Client<AllDocumentTypes>) {
  const repository = await client.getRepository();
  const locales = repository.languages.map(lang => lang.id);

  const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE;
  const excludes = (process.env.NEXT_PUBLIC_EXCLUDES ?? "").split(",");

  const allDocument = await Promise.all(
    locales.map(lang => client.dangerouslyGetAll({ lang }))
  );

  return locales.flatMap((lang, i) => {
    return [
      ...allDocument[i]
        .filter(
          page => !excludes.includes(page.type) && page.lang === defaultLocale
        )
        .map(page => {
          const source = page.type === "home" ? `/${lang}` : `/${page.uid}`;
          const destination =
            page.type === "home" ? "/" : `/${lang}/${page.type}/${page.uid}`;
          return {
            source: source as string,
            destination: destination as string,
            locale: false
          };
        }),
      ...allDocument[i]
        .filter(page => !excludes.includes(page.type))
        .map(page => {
          const source =
            page.type === "home" ? `/${lang}` : `/${lang}/${page.uid}`;
          const destination =
            page.type === "home" ? "/" : `/${lang}/${page.type}/${page.uid}`;
          return {
            source: source as string,
            destination: destination as string,
            locale: false
          };
        })
    ];
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const client = createClient();

  // REWRITES
  const rewrites = await getRewrites(client);
  const rewrite = rewrites.find(r => r.source === pathname);

  if (rewrite) {
    return NextResponse.rewrite(new URL(rewrite.destination, request.url));
  }

  // REWRITES LOCALES
  const repository = await client.getRepository();
  const locales = repository.languages.map(lang => lang.id);
  const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE;
  const pathnameIsMissingLocale = locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    return NextResponse.rewrite(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt).*)"]
};
