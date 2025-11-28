import { Metadata } from "next";

import { generateMetadata as fetchMetadata } from "@/utils/generateMetadata";

import { RecapDocument } from "@/prismicio-types";
import { createClient } from "@/prismicio";
import Container from "@/components/Container";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { isFilled } from "@prismicio/client";

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

  console.log(page)

  return (
    <>
      {/* Hero */}
      <section className="bg-[#FFFFFF] py-[80px]">
        <Container size="xl" className="flex flex-col items-center text-center gap-16">
          <div className="flex flex-col items-center text-center gap-4">
            <PrismicNextImage field={data.client_logo} height={48} />
            <p>{data.hero_eyebrow}</p>
          </div>
          <div className="flex flex-col items-center text-center gap-6 max-w-[700px]">
            <h1 className="text-6xl font-bold">{data.hero_title}</h1>
            <PrismicRichText field={data.hero_text} />
          </div>
          <div className="px-8 py-4 rounded-2xl bg-[#F7F7F7]">
            <div className="flex justify-center items-center gap-6">
              {isFilled.contentRelationship(data.contact) && (
                <PrismicNextImage field={data.contact.data?.image} width={64} height={64} className="object-cover aspect-square rounded-full" />
              )}
              <div className="flex flex-col justify-center items-start">
                {isFilled.contentRelationship(data.contact) && (
                  <p className="font-semibold">{data.contact.data?.name}</p>
                )}
                {isFilled.contentRelationship(data.contact) && (
                  <p>{data.contact.data?.position}</p>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Context */}
      <section className="bg-[#151515] py-[80px]">
        <Container size="xl" className="flex flex-col items-center text-center gap-16">
          <div className="flex flex-col items-center text-center gap-6 max-w-[700px]">
            <h2 className="text-4xl font-bold text-[#FFFFFF]">{data.context_title}</h2>
            <PrismicRichText field={data.context_text} components={{
              paragraph: ({ children }) => <p className="text-[#A4A4A4]">{children}</p>,
            }}/>
          </div>
        </Container>
      </section>

      {/* Opps */}
      <section className="bg-[#151515] py-[80px]">
        <Container size="xl" className="flex flex-col items-start gap-16">
            <h2 className="text-4xl font-bold text-[#FFFFFF]">{data.opportunities_title}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {data.opportunity.map((item, index) => (
                <div key={index} className="bg-[#1F1F1F] rounded-xl p-[48px] gap-4 flex flex-col items-start">
                  <div className="w-[48px] h-[48px] rounded-lg bg-[#59b6f833] flex justify-center items-center">
                    <div className="w-[24px] h-[24px] bg-[#59b6f8] rounded-2xl"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#FFFFFF]">{item.title}</h3>
                  <PrismicRichText field={item.text} components={{
                      paragraph: ({ children }) => <p className="text-[#A4A4A4]">{children}</p>,
                  }}/>
                </div>
              ))}
            </div>
        </Container>
      </section>

      {/* Data */}
      <section className="bg-[#151515] py-[80px]">
        <Container size="xl" className="flex flex-col items-center text-center gap-16">
           <div className="flex flex-col items-center text-center gap-6 max-w-[700px]">
            <h2 className="text-4xl font-bold text-[#FFFFFF]">{data.data_title}</h2>
            <PrismicRichText field={data.data_text} components={{
              paragraph: ({ children }) => <p className="text-[#A4A4A4]">{children}</p>,
            }}/>
          </div>

            <div className="border border-solid border-[#ffffff32] rounded-2xl overflow-hidden">
              <table className="text-white font-light text-left">
                <thead>
                  <tr>
                    <th className="p-4 border border-[#ffffff32] rounded-tl-2xl align-top text-left">Company</th>
                    <th className="p-4 border border-[#ffffff32] align-top text-left">Role</th>
                    <th className="p-4 border border-[#ffffff32] align-top text-left">Challenges</th>
                    <th className="p-4 border border-[#ffffff32] align-top text-left">Pain Point</th>
                    <th className="p-4 border border-[#ffffff32] align-top text-left">Industry Information</th>
                    <th className="p-4 border border-[#ffffff32] align-top text-left">Key Message</th>
                    <th className="p-4 border border-[#ffffff32] rounded-tr-2xl align-top text-left">Page</th>
                  </tr>
                </thead>
                <tbody>
                    {data.generated_page.map((item, index) => (
                      <tr key={index}>
                        <th key={item.company_name} className="p-4 border border-[#ffffff32] align-top text-left">{item.company_name}</th>
                        <td key={item.role} className="p-4 border border-[#ffffff32] text-[#A4A4A4] text-sm align-top text-left">{item.role}</td>
                        <td key={item.challenges} className="p-4 border border-[#ffffff32] text-[#A4A4A4] text-sm align-top text-left">{item.challenges}</td>
                        <td key={item.pain_point} className="p-4 border border-[#ffffff32] text-[#A4A4A4] text-sm align-top text-left">{item.pain_point}</td>
                        <td key={item.industry_information} className="p-4 border border-[#ffffff32] text-[#A4A4A4] text-sm align-top text-left">{item.industry_information}</td>
                        <td key={item.key_message} className="p-4 border border-[#ffffff32] text-[#A4A4A4] text-sm align-top text-left">{item.key_message}</td>
                        <td key={item.page.text} className="p-4 border border-[#ffffff32] text-sm align-top text-left">
                          <PrismicNextLink field={item.page}/>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
        </Container>
      </section>

      {/* Next steps */}
      <section className="bg-[#FFFFFF] py-[80px]">
        <Container size="xl" className="flex flex-col items-center text-center gap-16">
          <div className="flex flex-col gap-8 items-center rounded-t-xl border-t-2 border-r-2 border-l-2 border-solid border-[#EEEEEE] p-[56px] bg-gradient-to-b from-[#EEEEEE] to-[#FFFFFF]z">
            <div className="flex flex-col gap-8 items-center rounded-2xl p-[48px] bg-gradient-to-b from-[#D4F2E9] to-[#E8F8F3]">
              <div className="flex flex-col items-center gap-4">
                <p className="text-[#3BBB96]">{data.next_eyebrow}</p>
                <h2 className="text-4xl font-bold">{data.next_title}</h2>
              </div>
              <p className="text-[#505050]">{data.next_text}</p>
            </div>
            <div className="flex gap-4">
              {data.buttons.map((link) => (
                <PrismicNextLink
                  key={link.key}
                  field={link}
                  className={link.variant}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
