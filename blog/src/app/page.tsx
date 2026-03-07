import { getArticles } from "@/utils/getArticles";
import { ArticleCard } from "@/components/article-card";

export default async function Home() {
  const articles = await getArticles();

  return (
      <div className="w-full max-w-4xl px-6 py-0 mx-auto">
      <div className="pt-8 pb-8">
      <h1 className="text-4xl font-semibold text-foreground mb-2">Статьи</h1>
      <span className="text-md">Здесь я делюсь своими мыслями и опытом в области разработки и дизайна.</span>
      </div>
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none m-0 p-0"
          aria-label="Article list"
        >
          {articles.map((article) => (
            <li key={article.slug} className="flex min-h-0">
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </div>
  );
}
