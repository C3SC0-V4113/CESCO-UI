import Link from 'next/link';

export default function NotFound() {
  return (
    <article className="mx-auto max-w-4xl">
      <p className="text-sm text-muted-foreground">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Component not found</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        The component you are looking for does not exist.
      </p>
      <Link className="mt-6 inline-flex text-sm underline underline-offset-4" href="/">
        Browse components
      </Link>
    </article>
  );
}
