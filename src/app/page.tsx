import Link from "next/link";

import { H1 } from "@/components/Heading";

export default function LandingPage() {
  return (
    <section>
      <H1>Hallo Next.js!</H1>
      <Link className={"cursor-pointer underline"} href={"/articles"}>
        Zeig mir alle Artikel an!
      </Link>
    </section>
  );
}
