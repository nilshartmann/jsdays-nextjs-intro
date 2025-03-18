import { notFound } from "next/navigation";

import { ArticleBanner } from "@/components/articlepage/ArticleBanner";
import ArticleBody from "@/components/articlepage/ArticleBody";
import { fetchArticle } from "@/queries/queries";

type ArticlePageProps = {
  params: Promise<{ articleId: string }>;
};

export async function generateStaticParams() {
  console.log("generateStaticParams!");
  return [{ articleId: "A_1" }, { articleId: "A_2" }, { articleId: "A_3" }];
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { articleId } = await params;
  console.log(
    "Rendering ArticlePage " + articleId,
    new Date().toLocaleTimeString(),
  );

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
