"use client";
import { use, useState } from "react";

import RelatedArticleBox from "@/components/articlepage/RelatedArticleBox";
import { RelatedArticle } from "@/types";

// Client Komponente
//    wird gerendert:
//     - im Client (Browser)
//     - auf dem Server (SSR)

type RelatedArticleSliderProps = {
  headline?: string;
  relatedArticlesPromise: Promise<RelatedArticle[]>;
};

export default function RelatedArticleSlider({
  headline,
  relatedArticlesPromise,
}: RelatedArticleSliderProps) {
  console.log("RelatedArticlesSlider rendering");

  // useEffect( () => fetch("..."), [] )

  const articles = use(relatedArticlesPromise);

  const [currentArticle, setCurrentArticle] = useState(0);

  const handleClick = (amount: number) => {
    let newIndex = currentArticle + amount;
    if (newIndex < 0) {
      newIndex = articles.length - 1;
    } else if (newIndex >= articles.length) {
      newIndex = 0;
    }
    setCurrentArticle(newIndex);
  };

  return (
    <>
      {headline}
      <RelatedArticleBox
        article={articles[currentArticle]}
        onNextClick={() => handleClick(+1)}
        onPrevClick={() => handleClick(-1)}
      />
    </>
  );
}
