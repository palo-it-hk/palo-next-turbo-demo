# Suspense boundary

NextJS offers to types of suspense boundary

1. with loading.tsx
2. with React's `<Suspense>`

## loading.tsx

By having `loading.tsx` inside the same folder as the `page.tsx`, Next is able to use the content inside `loading.tsx` as a fallback once it detects the component is waiting the fetch to complete . 

## Streaming with React's `<Suspense>`

Since `loading.tsx` wraps the entire page.tsx(the one in the same folder as it), the downside is that the client has to wait for the entire page to complete data fetching before showing you any content. Therefore, you might want to manually create Suspense Boundaries for your own UI components. *Streaming* is when the client side doesn't have to wait for all the content of the page to completely render before having any content to show in the client. Instead, content can be loaded incrementally by wrapping content in react's `<Suspense>`. 