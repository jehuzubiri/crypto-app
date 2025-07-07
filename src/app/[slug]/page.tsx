import CryptoDetails from "@/pages/CryptoDetails";
import React from "react";

interface PageProps {
  params: { slug: string };
}

const SlugPage = ({ params }: PageProps) => {
  return <CryptoDetails slug={params.slug} />;
};

export default SlugPage;
