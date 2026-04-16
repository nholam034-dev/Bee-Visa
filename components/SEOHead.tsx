
import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getPageSEO } from "../seo";

interface SEOHeadProps {
  pageName?: string;
  customTitle?: string;
  customDescription?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ pageName, customTitle, customDescription }) => {
  const location = useLocation();
  const seo = getPageSEO(location.pathname, pageName);

  const title = customTitle || seo.title;
  const description = customDescription || seo.description;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={seo.canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Beetours Vietnam" />
      <meta property="og:locale" content="vi_VN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};
