import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { use } from "react";
import "../globals.css";

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const resolvedParams = use(params);
  console.log(resolvedParams)
  return (
    <html lang={resolvedParams.lang}>
      <body suppressHydrationWarning>{children}</body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
