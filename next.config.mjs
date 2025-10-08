import * as prismic from "@prismicio/client";
import fs from "fs";
import path from "path";

const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    // Read the JSON file using fs
    const slicemachineConfigPath = path.join(
      process.cwd(),
      "slicemachine.config.json"
    );
    const slicemachineConfig = JSON.parse(
      fs.readFileSync(slicemachineConfigPath, "utf8")
    );

    const client = prismic.createClient(slicemachineConfig.repositoryName);
    const repository = await client.getRepository();
    const locales = repository.languages.map(lang => lang.id);
    const excludes = (process.env.NEXT_PUBLIC_EXCLUDES ?? "").split(",");
    const allDocument = await Promise.all(
      locales.map(lang => client.dangerouslyGetAll({ lang }))
    );

    return locales.flatMap((lang, i) => {
      return allDocument[i]
        .filter(page => !excludes.includes(page.type))
        .map(page => {
          const source =
            page.type === "home" ? `/${lang}` : `/${lang}/${page.uid}`;
          const destination =
            page.type === "home"
              ? `/${lang}`
              : `/${lang}/${page.type}/${page.uid}`;
          return {
            source: source,
            destination: destination,
            locale: false
          };
        });
    });
  },

  async redirects() {
    // Read the JSON file using fs
    const slicemachineConfigPath = path.join(
      process.cwd(),
      "slicemachine.config.json"
    );
    const slicemachineConfig = JSON.parse(
      fs.readFileSync(slicemachineConfigPath, "utf8")
    );

    const client = prismic.createClient(slicemachineConfig.repositoryName);
    const allRedirect = await client.getAllByType("redirect", { lang: "*" });

    return allRedirect.flatMap(page => {
      const { data } = page;
      return data.redirect.map(r => {
        return {
          source: r.source,
          destination: r.destination,
          statusCode: 301
        };
      });
    });
  }
};

export default nextConfig;
