import { defineConfig } from "fumapress";
import { fumadocsMdx } from "fumapress/adapters/mdx";
import {
  blogMetaSchema,
  blogPageSchema,
} from "fumapress/adapters/mdx/schema";
import { blogPlugin } from "fumapress/plugins/blog";
import { defineDocs } from "fumadocs-mdx/macro";
import { queryPlugin } from "@/src/query-plugin";

const blog = defineDocs({
  dir: "content/blog",
  docs: {
    async: true,
    schema: blogPageSchema,
    lastModified: true,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: blogMetaSchema,
  },
});

export default defineConfig({
  content: blog.toFumadocsSource(),
  site: {
    name: "Blog",
    // the URL where your site is deployed, needed for SEO features like sitemap:
    // baseUrl: "https://example.com",
  },
  defaultLayoutProps: {
    nav: {
      title: "Blog",
    },
  },
  meta: {
    root() {
      return (
        <>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Geist:ital,wght@0,100..900;1,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
            rel="stylesheet"
          />
        </>
      );
    },
  },
})
  .plugins(
    blogPlugin({
      isBlog: () => true,
      paths: {
        index: "/",
        tags: "/tags",
      },
    }),
    queryPlugin(),
  )
  .adapters(fumadocsMdx());
