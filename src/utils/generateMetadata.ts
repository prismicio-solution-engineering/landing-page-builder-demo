import { Metadata } from 'next'

import { AllDocumentTypes } from '@/prismicio-types'

import { PageService } from '@/services/page.service'
import { CustomService } from '@/services/custom.service'

interface MetadataType {
  meta_title: string
  meta_description: string
  meta_image: {
    url: string
  }
}

export async function generateMetadata({
  params,
  currentPage,
}: {
  params: { lang: string; uid?: string }
  currentPage: AllDocumentTypes['type']
}): Promise<Metadata> {
  const { lang, uid } = params

  const domain = process.env.NEXT_PUBLIC_DOMAIN as string
  const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE as string

  const pageService = new PageService(lang)
  const options = {
    options: {
      graphQuery: `
        {
          ${currentPage} {
            meta_title
            meta_description
            meta_image
          }
        }
      `,
    },
  }
  const [page] = await Promise.all([
    currentPage === 'home' || currentPage === '404'
      ? pageService.getSinglePage({
          documentType: currentPage,
          ...options,
        })
      : pageService.getPageByUID({
          documentType: currentPage,
          uid: uid ?? '',
          ...options,
        }),
  ])

  const customService = new CustomService(lang)
  const alternatePages = await Promise.all(
    page.alternate_languages.map(
      async altLang => await customService.getPageFromAltLang(currentPage, altLang.uid as string, altLang.lang)
    )
  )

  const alternateLanguages = {
    canonical: page.url,
    languages: {
      'x-default':
        defaultLocale === page.lang || (defaultLocale !== page.lang && alternatePages.length === 0)
          ? page.url
          : alternatePages.find(alternate => alternate.lang === defaultLocale)?.url,
      [page.lang]: alternatePages.find(alternate => alternate.lang === page.lang)?.url ?? page.url,
      ...Object.fromEntries(alternatePages.map(alternate => [[alternate.lang], `${alternate.url}`])),
    },
  }

  const { data } = page as { data: MetadataType }

  return {
    title: data.meta_title || undefined,
    description: data.meta_description || undefined,
    openGraph: {
      title: data.meta_title || undefined,
      description: data.meta_description || undefined,
      images: [
        {
          url: data.meta_image.url || '',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.meta_title || undefined,
      description: data.meta_description || undefined,
      images: [
        {
          url: data.meta_image.url || '',
        },
      ],
    },
    metadataBase: new URL(domain),
    alternates: {
      ...alternateLanguages,
    },
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  }
}
