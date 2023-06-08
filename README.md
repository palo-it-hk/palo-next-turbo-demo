# Next.js + Turbopack App Directory Playground

[Turbopack](https://turbo.build/pack) is a new incremental bundler optimized for JavaScript and TypeScript, written in Rust by the creators of Webpack and Next.js at [Vercel](https://vercel.com). On large applications Turbopack updates 10x faster than Vite and 700x faster than Webpack ([benchmark](https://turbo.build/pack/docs/benchmarks)). For the biggest applications the difference grows even more stark with updates up to 20x faster than Vite.

This playground is a mirror of the [Next.js v13 App Directory Playground](https://github.com/vercel/app-playground), but uses Turbopack as the Next.js development server (`next dev --turbo`).

**As a reminder, Turbopack is currently in beta and not yet ready for production. We appreciate your ongoing support as we work to make it ready for everyone.**

## Running Locally

1. Install dependencies: `yarn`
2. Start the dev server: `yarn dev`

## Running Storybook

1. Install dependencies: `yarn`
2. Start the dev server: `yarn storybook`

**Note:** The playground uses [Tailwind CSS](https://tailwindcss.com) via [PostCSS](https://turbo.build/pack/docs/features/css#postcss).

For more information, see: https://turbo.build/pack/docs/features/css#tailwind-css

## Documentation

https://nextjs.link/with-turbopack

## Providing Feedback

https://nextjs.link/turbopack-feedback


## Async Server Component Typescript Error

To use an async Server Component with TypeScript, ensure you are using `TypeScript 5.1.3` or higher and `@types/react 18.2.8` or higher.

If you are using an older version of TypeScript, you may see a `'Promise<Element>' is not a valid JSX element type` error. Updating to the latest version of TypeScript and `@types/react` should resolve this issue.

An alternative is to ignore the error by adding a ts-expect-error: 

```typescript
 return (
    <>
      <p> The loading sequence will start from container 3, 2 and 1</p>
      {/* @ts-expect-error Async Server Component */}
      <Container1>
        <p>asd</p>
      </Container1>
    </>
  );
```