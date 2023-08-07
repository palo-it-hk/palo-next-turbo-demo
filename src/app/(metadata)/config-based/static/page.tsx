import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'some title',
  description:
    'To define static metadata, export a Metadata object from a layout.js or static page.js file.',
  keywords: 'metadata, config, layout, page',
};

export default function Page() {
  return (
    <div>
      <h1>Config-based metadata</h1>
      <p>
        To define static metadata, export a Metadata object from a layout.js or
        static page.js file.
      </p>
    </div>
  );
}
