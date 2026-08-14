import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-24 text-center">
      <h1 className="text-4xl font-bold text-navy-2">Page not on Next.js yet</h1>
      <p className="mt-4 text-lg">
        This homepage is the first page of the O360 migration off WordPress. Other
        routes still live on o360.com until they are rebuilt here.
      </p>
      <p className="mt-8">
        <Link href="/" className="text-primary underline">
          Back to the new homepage
        </Link>
        {" · "}
        <a href="https://o360.com/" className="text-primary underline">
          Current WordPress site
        </a>
      </p>
    </main>
  );
}
