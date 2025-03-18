import { notFound } from "next/navigation";
import { Suspense } from "react";

import RelatedArticleSlider from "@/app/articles/[articleId]/RelatedArticleSlider";
import { ArticleBanner } from "@/components/articlepage/ArticleBanner";
import ArticleBody from "@/components/articlepage/ArticleBody";
import CommentList from "@/components/articlepage/CommentList";
import TwoColumnLayout from "@/components/layout/TwoColumnLayout";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Sidebar } from "@/components/Sidebar";
import { SidebarBox } from "@/components/SidebarBox";
import { fetchArticle } from "@/queries/queries";

type ArticlePageProps = {
  params: Promise<{ articleId: string }>;
};

// export async function generateStaticParams() {
//   console.log("generateStaticParams!");
//   return [{ articleId: "A_1" }, { articleId: "A_2" }, { articleId: "A_3" }];
// }

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

  // React.Suspense

  return (
    <main>
      <ArticleBanner article={article} />
      <TwoColumnLayout
        sidebar={
          <Sidebar>
            <SidebarBox title={"Comments"}>
              <Suspense fallback={<LoadingIndicator />}>
                <CommentList articleId={articleId} />
              </Suspense>
            </SidebarBox>
            <SidebarBox title={"Related Articles"}>
              <RelatedArticleSlider />
            </SidebarBox>
          </Sidebar>
        }
      >
        <ArticleBody body={article.body} />
      </TwoColumnLayout>
    </main>
  );
}
