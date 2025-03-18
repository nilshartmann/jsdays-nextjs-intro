import Link from "next/link";

export default function LandingPage() {
  return (
    <section>
      <h1>Hallo Next.js!</h1>
      <Link className={"cursor-pointer underline"} href={"/articles"}>
        Zeig mir alle Artikel an!
      </Link>
    </section>
  );
}
