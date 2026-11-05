import { notFound } from 'next/navigation';

export const metadata = { title: 'Not found | Cesco UI' };

export default function ComponentNotFoundRoute(): never {
  notFound();
}
