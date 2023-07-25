# Routing

**RTFM**: [Routing](https://beta.nextjs.org/docs/routing/fundamentals)

The App Router is in beta and some conventions could change before stability is reached. We do not recommend using the app directory in production. It is intended to replace the 'page' directory.

The app directory is intentionally designed to work simultaneously with the pages directory to allow for incremental page-by-page migration.

By default, components inside `app/` are React Server Components. To use client-side rendering, add `'use client';` before imports.

```typescript
'use client';
import someComponent from 'someLibrary';

export default function Mycomponent(){};
```

It's recommended to fetch data without 'use client' by making use of Next 13 beta's new fetching methods. If you are using React client hooks then you should add `'use client';`.

_________________

## Folders and files inside app

Next 13 beta has changed and added special files to create UI with specific behaviors:
| File     | Description | Demo | warning |
| ----------- | ----------- | ----------- | ----------- |
| page.ts | Replaces index.ts | any folder that contains a `page.tsx` | a folder cannot have `route.tsx` and `page.tsx` at the same time |
| route.ts | Works the same as API routes in the stable next 13, there is no need to have an `/api` folder. Our demo is in the `/api` folder for the sake of organization | routes inside `/app/api/*` | a folder cannot have `route.tsx` and `page.tsx` at the same time |
| layout.ts | UI that is shared between multiple pages. | within `(layout-vs-template)` | Passing data between a parent layout and its children is not possible though the layout can fetch data. |
| template.ts | Similar to `layout.ts` except templates create a new instance for each of their children on navigation |  within `(layout-vs-template)` | when a user navigates between routes that share a template, a new instance of the component is mounted, DOM elements are recreated, state is not preserved, and effects are re-synchronized  |
| loading.ts | this component will be rendered whenever the suspense boundary is triggered | within `(suspense boundary)` | `{/* @ts-expect-error Async Server Component */}` should be placed in front of the component that is to be loaded |
| error.ts | this component will be rendered whenever the error boundary is triggered | within (`error-boundary`) | error.js boundaries do not catch errors thrown in layout.js or template.js components of the same segment |
| not-found.ts | this component when a `notFound()` is thrown | within `(not-found)` | error.js boundaries do not catch errors thrown in layout.js or template.js components of the same segment |

