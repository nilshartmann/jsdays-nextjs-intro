import { revalidatePath } from "next/cache";

import LikeIcon from "@/components/LikeIcon";
import { mutateArticleLikes } from "@/queries/queries";

type LikesWidgetProps = {
  articleId: string;
  currentLikes: number;
};

export function LikesWidget({ articleId, currentLikes }: LikesWidgetProps) {
  // SERVER FUNCTION
  async function handleSubmit(formData: FormData) {
    "use server";
    console.log("HANDLE SUBMIT", articleId);

    await mutateArticleLikes(articleId);
    revalidatePath("/articles");
    revalidatePath(`/articles/${articleId}`);
  }

  return (
    <form action={handleSubmit} className={"inline-block"}>
      <button
        type={"submit"}
        className={
          "flex space-x-2 rounded border border-slate-200 bg-slate-50 px-2 py-1 text-[15px] text-teal-700 hover:cursor-default hover:bg-teal-700 hover:text-white disabled:cursor-default disabled:border-teal-600 disabled:bg-teal-600 disabled:text-teal-50 disabled:hover:bg-teal-600"
        }
      >
        <span className={"ms-2"}>
          <LikeIcon />
          {currentLikes}
        </span>
      </button>
    </form>
  );
}
