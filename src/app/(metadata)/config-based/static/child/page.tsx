import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Child page title',
  description: "I'm a child page",

  // absolute:'Provides a title that ignores title.template set in parent segments.',
};

export default function Page() {
  return (
    <>
      <h1>Child page</h1>
      <p>I have the prefix in my title that is inherited from the layout</p>
    </>
  );
}
