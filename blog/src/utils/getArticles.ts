import { promises as fs } from "fs";
import path from "path";
import { readMarkdownFile } from "./readMarkdownFile";

const ARTICLES_DIR = path.join(process.cwd(), "articles");

export interface ArticleMeta {
  slug: string;
  title: string;
  description?: string;
  category: string;
  date: string;
  thumbnail?: string;
}

export async function getArticles(): Promise<ArticleMeta[]> {
  const files = await fs.readdir(ARTICLES_DIR);
  const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

  const articles = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(ARTICLES_DIR, file);
      const { data } = await readMarkdownFile(filePath);
      return {
        slug,
        title: data.title as string,
        description: data.description as string | undefined,
        category: data.category as string,
        date: data.date as string,
        thumbnail: data.thumbnail as string | undefined,
      };
    })
  );

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
