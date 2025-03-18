"use server";

import { revalidatePath } from "next/cache";

import { mutateArticleLikes } from "@/queries/queries";

type LikesActionState = {
  likes: number;
  result?: string;
};

export async function handleLikeSubmit(
  state: LikesActionState,
  formData: FormData,
): Promise<LikesActionState> {
  const articleId = formData.get("articleId");
  if (typeof articleId !== "string") {
    console.error("Invalid articleId", articleId);
    return state;
  }

  const newLikes = await mutateArticleLikes(articleId);
  revalidatePath("/articles");
  revalidatePath(`/articles/${articleId}`);

  if (newLikes === null) {
    return state;
  }

  return {
    likes: newLikes,
    result: "Alles klar, hat geklappt!",
  };
}
