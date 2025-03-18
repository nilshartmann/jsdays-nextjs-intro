import { notFound } from "next/navigation";

import { ArticleBanner } from "@/components/articlepage/ArticleBanner";
import ArticleBody from "@/components/articlepage/ArticleBody";
import { fetchArticle } from "@/queries/queries";

type ArticlePageProps = {
  params: Promise<{ articleId: string }>;
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { articleId } = await params;

  const article = await fetchArticle(articleId);

  if (!article) {
    return notFound();
  }

  return (
    <main>
      <ArticleBanner article={article} />
      <ArticleBody body={article.body} />
    </main>
  );
}
