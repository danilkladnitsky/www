import { promises as fs } from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { readMarkdownFile } from "@/utils/readMarkdownFile";
import { Article } from "@/components/article";
import { CodeBlock } from "@/components/code-block";
import { MdxImage } from "@/components/mdx-image";

const ARTICLES_DIR = path.join(process.cwd(), "articles");

export async function generateStaticParams() {
  const files = await fs.readdir(ARTICLES_DIR);
  const slugs = files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
  return slugs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  const { data } = await readMarkdownFile(filePath);
  return {
    title: data.title,
    description: data.description,
    openGraph: { title: data.title, description: data.description },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  const { content, data } = await readMarkdownFile(filePath);

  return (
    <div className="min-h-screen flex justify-center max-w-4xl w-full mx-auto">
      <Article>
        <Article.Header date={data.date} category={data.category} />
        <Article.Content>
          <MDXRemote
            source={content}
            components={{
              pre: CodeBlock,
              img: MdxImage,
            }}
          />
        </Article.Content>
      </Article>
    </div>
  );
}
