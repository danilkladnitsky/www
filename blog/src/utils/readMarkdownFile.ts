import matter from "gray-matter";
import { promises as fs } from "fs";

export async function readMarkdownFile(filePath: string) {
  const raw = await fs.readFile(filePath, "utf-8");
  const { content, data } = matter(raw);
  return { content, data };
}