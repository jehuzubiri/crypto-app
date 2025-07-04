import Head from "next/head";
import { AppConfig } from "@/constant/App.const";

const PageHead: React.FC = () => {
  // @DESC - render head tag

  return (
    <Head>
      <title>{AppConfig.metaTitle}</title>
      <meta name="description" content={AppConfig.metaDescription} />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content="keyword1, keyword2, keyword3" />
      <meta name="author" content={AppConfig.appName} />
      <meta property="og:title" content="Your Page Title" />
      <meta
        property="og:description"
        content="A brief description of your page for social sharing."
      />
      <meta
        property="og:image"
        content="URL to an image that represents your page"
      />
      <meta property="og:url" content="URL of your page" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://domain-name.com/" />
    </Head>
  );
};

export default PageHead;
