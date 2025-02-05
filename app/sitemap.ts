import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.thestageplotter.com";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date().toISOString(),
    },
  ];
}
