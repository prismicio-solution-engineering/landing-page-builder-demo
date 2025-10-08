const fs = require("fs");
const path = require("path");

const slicemachineConfigPath = path.join(
  __dirname,
  `../slicemachine.config.json`
);

const slicemachineConfigFile = JSON.parse(
  fs.readFileSync(slicemachineConfigPath, "utf-8")
);

slicemachineConfigFile.libraries.map(library => {
  const libraryPath = path.join(__dirname, `../${library}`);
  const libraryFolders = fs.readdirSync(libraryPath);
  libraryFolders
    .filter(file => fs.statSync(path.join(libraryPath, file)).isDirectory())
    .map(sliceName => {
      const SliceMocksPath = path.join(
        __dirname,
        `../${library}/${sliceName}/mocks.json`
      );
      const mocks = JSON.parse(fs.readFileSync(SliceMocksPath, "utf-8"));
      mocks.map(variant => {
        const sliceVariation = variant.variation;
        const SliceVariantPath = path.join(
          __dirname,
          `../${library}/${sliceName}/${sliceVariation}`
        );

        if (fs.existsSync(SliceVariantPath)) return;

        fs.mkdirSync(SliceVariantPath);

        const indexContent = `import { Content } from '@prismicio/client'

import { SliceComponentProps } from '@prismicio/react'
import Container from "@/components/Container";
        
export type ${sliceName}Props = SliceComponentProps<Content.${sliceName}Slice>
        

const ${sliceName}${sliceVariation.charAt(0).toUpperCase() + sliceVariation.slice(1)} = ({ slice }: ${sliceName}Props): JSX.Element => {
  if(slice.variation !== '${sliceVariation}') return <></>
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Container>
          ${sliceName.toUpperCase()} ${sliceVariation.toUpperCase()}
      </Container>
    </section>
  )
}

export default ${sliceName}${sliceVariation.charAt(0).toUpperCase() + sliceVariation.slice(1)}`;

        fs.writeFileSync(
          path.join(SliceVariantPath, "index.tsx"),
          indexContent
        );

        console.log(
          `Dossier "${sliceVariation}" créé avec succès dans la slice ${sliceName}.`
        );
      });

      const SlicePath = path.join(__dirname, `../${library}/${sliceName}`);

      const sliceNameFiles = fs.readdirSync(SlicePath);
      const allFolders = sliceNameFiles
        .filter(file => fs.statSync(path.join(SlicePath, file)).isDirectory())
        .map(folder => folder);

      const switchContent = `import { Content } from '@prismicio/client'

import { SliceComponentProps } from '@prismicio/react'

${allFolders
  .map(
    f =>
      `import ${sliceName}${f.charAt(0).toUpperCase() + f.slice(1)} from './${f.toLowerCase()}'`
  )
  .join("\n")}

export type ${sliceName}Props = SliceComponentProps<Content.${sliceName}Slice>

const ${sliceName} = ({ slice, ...otherProps }: ${sliceName}Props): JSX.Element => {
  switch (slice.variation) {
    ${allFolders
      .map((f, i) => {
        const indent = "    ";
        return `${i > 0 ? indent : ""}case '${f.toLowerCase()}':
      return <${sliceName}${f.charAt(0).toUpperCase() + f.slice(1)} slice={slice} {...otherProps} />`;
      })
      .join("\n")}
    default:
      return <></>
  }
}
    
export default ${sliceName}`;

      const switchPathIndexJSX = path.join(SlicePath, "index.tsx");
      fs.writeFileSync(switchPathIndexJSX, switchContent);
    });
});
