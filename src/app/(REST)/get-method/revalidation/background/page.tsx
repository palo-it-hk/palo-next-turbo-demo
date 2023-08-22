import { getTime } from 'frontend-api/time';

export default async function Page() {
  let content;

  // You can set how often the page revalidate by seconds.
  const data = await getTime(5);

  if (!data) {
    content = <>No data can be fetched</>;
  } else {
    content = <>{data.currentTime}</>;
  }

  return (
    <>
      <p className="font-bold text-primary">
        Because dev mode rebuilds the page for each render, it&apos;s not able
        to demo the affects of caching. Please view this page in prod mode.
      </p>
      <div className="my-10">
        <p className="font-bold">Whats happening in the background</p>
        <ol className="list-inside list-decimal">
          <li>
            The page is generated during build time, and the data shown
            initially is cached from build time. Therefore, you won&apos;t see
            any data when you view this page thats freshly built.
          </li>
          <li>
            After 5 seconds, the page is ready to be rebuilt again but must be
            prompted by a user navigating or refreshing said page. Note that the
            user doing so is only prompting the rebuilding.
          </li>
          <li>
            After the page is finish rebuilding,a request to the page will show
            revalidated content. And the 5 seconds cycle starts again.
          </li>
        </ol>
      </div>
      <span className="my-10 font-bold">Data</span>: {content}
    </>
  );
}
