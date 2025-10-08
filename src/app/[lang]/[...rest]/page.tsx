import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { generateMetadata as fetchMetadata } from '@/utils/generateMetadata'

export async function generateMetadata(): Promise<Metadata> {
  const lang = (process.env.NEXT_PUBLIC_DEFAULT_LOCALE as string) ?? ''
  return fetchMetadata({ params: { lang: lang }, currentPage: '404' })
}

export default function CatchAllPage() {
  notFound()
}
