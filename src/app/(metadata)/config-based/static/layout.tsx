import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    // Adds a prefix or a suffix to titles defined in child route segments.
    // Not applicable to page.tsx that are in the same location as this layout.tsx
    // because a page is always the terminating segment of a route.
    template: 'metadata - %s',

    // Provides a fallback title to child route segments that don't define a title.
    // Only works when this is defined in layout.tsx
    default:
      "I provide a fallback title to child route segments that don't define a title",
  },
  description:
    'To define static metadata, export a Metadata object from a layout.js or static page.js file.',
  keywords: 'metadata, config, layout, page',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1>I am the layout</h1>
      {children}
    </>
  );
}
