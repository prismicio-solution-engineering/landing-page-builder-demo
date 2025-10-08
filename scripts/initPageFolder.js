/*************************/
/*  CREATE ARRAY PAGES  */
/*************************/
const fs = require("fs");
const path = require("path");

const unwantedIds = ["home", "404"];

const customtypesPath = path.join(__dirname, `../customtypes`);

const customtypesFiles = fs.readdirSync(customtypesPath);

const customtypesFolders = customtypesFiles
  .filter(file => fs.statSync(path.join(customtypesPath, file)).isDirectory())
  .map(folder => folder);

const customtypesFoldersPage = customtypesFolders.filter(folder => {
  const customtypesPathTempo = path.join(
    __dirname,
    `../customtypes/${folder}/index.json`
  );
  const custometypesContent = JSON.parse(
    fs.readFileSync(customtypesPathTempo, "utf-8")
  );
  return (
    custometypesContent["format"] === "page" &&
    !unwantedIds.includes(custometypesContent["id"])
  );
});

// On parcourt les customtypes format "page"
customtypesFoldersPage.map(folder => {
  const pageType = folder;
  const pageName = pageType
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  const pageTypePath = path.join(__dirname, `../src/app/[lang]/${pageType}`);

  if (fs.existsSync(pageTypePath)) return;

  fs.mkdirSync(pageTypePath);
  fs.mkdirSync(`${pageTypePath}/[uid]`);

  const indexContent = `import { Metadata } from 'next'
import { SliceZone } from '@prismicio/react'

import { PageService } from '@/services/page.service'

import { generateMetadata as fetchMetadata } from '@/utils/generateMetadata'

import { components as componentsBoiler } from '@/sections/boiler'
import { components as componentsHeros } from '@/sections/heros'
import { components as componentsSlices } from '@/sections/slices'

import Layout from '@/components/Layout'

import { ${pageName}Document } from '@/prismicio-types'

export async function generateMetadata({ params }: { params: { lang: string; uid: string } }): Promise<Metadata> {
  return fetchMetadata({ params, currentPage: '${pageType}' })
}

export default async function ${pageName}({ params }: { params: { lang: string; uid: string } }) {
  const { lang, uid } = params

  const pageService = new PageService(lang)

  const [page] = await Promise.all([
    pageService.getPageByUID({ documentType: '${pageType}', uid: uid }),
  ])

  const { data } = page as ${pageName}Document

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
          ...componentsBoiler,
        }}
      />
    </Layout>
  )
}

export async function generateStaticParams() {
  const pageService = new PageService('*')

  const pages = await pageService.getAllPageByTypes({ documentType: '${pageType}' })

  return pages.map(page => {
    return { uid: page.uid, lang: page.lang }
  })
}
`;

  fs.writeFileSync(
    path.join(`${pageTypePath}/[uid]`, "page.tsx"),
    indexContent
  );

  console.log(
    `Dossier "${pageType}" créé avec succès dans le dossier src/app/[lang].`
  );

  /***********************/
  /*  UPDATE PRISMIC IO  */
  /***********************/

  const prismicioPath = path.join(__dirname, `../src/prismicio.ts`);

  const prismicioContent = fs.readFileSync(prismicioPath, "utf-8");

  const insertHere = prismicioContent.indexOf("},\n]");

  if (insertHere === -1) {
    console.error("IndexOf non trouvée dans le fichier existant.");
    process.exit(1);
  }

  const prismicioContentNew =
    prismicioContent.slice(0, insertHere) +
    `},\n  {
    type: '${pageType}',
    path: '/:lang?/:uid',\n  ` +
    prismicioContent.slice(insertHere);

  fs.writeFileSync(prismicioPath, prismicioContentNew);
});
