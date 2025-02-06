import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://www.thestageplotter.com";
  const sitemap = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}/</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    <url>
      <loc>${baseUrl}/dashboard</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    <url>
      <loc>${baseUrl}/privacy</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
  </urlset>
  `;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
