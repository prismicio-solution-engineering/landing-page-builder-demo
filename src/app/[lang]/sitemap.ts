import fs from 'fs'
import path from 'path'
import * as prismic from '@prismicio/client'
import { MetadataRoute } from 'next'

interface PageData {
  category?: {
    uid?: string
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const excludes = (process.env.NEXT_PUBLIC_EXCLUDES ?? '').split(',')

  const filePath = path.join(process.cwd(), 'slicemachine.config.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const slicemachineConfig = JSON.parse(fileContents)

  const client = prismic.createClient(slicemachineConfig.repositoryName)
  const repository = await client.getRepository()

  const locales = repository.languages.map(lang => lang.id)

  const allDocument = await Promise.all(locales.map(lang => client.dangerouslyGetAll({ lang })))

  const domain = process.env.NEXT_PUBLIC_DOMAIN

  return locales.flatMap((lang, i) => {
    const langPath = lang === process.env.NEXT_PUBLIC_DEFAULT_LOCALE ? '' : `/${lang}`
    return allDocument[i]
      .filter(page => !excludes.includes(page.type))
      .map(page => {
        const category = `${(page.data as PageData)?.category?.uid ?? ''}/`
        const source = page.type === 'home' ? `${langPath}${category}` : `${langPath}${category}${page.uid}`
        return {
          url: `${domain}${source}`,
        }
      })
  })
}
