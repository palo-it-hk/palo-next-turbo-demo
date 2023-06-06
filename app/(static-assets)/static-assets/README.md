#Static Assets

Static files such as images in the `public` in the root directly. Once inside, they can be referenced, by your code starting from the base URL (`/`).

- It's the only directory to serve static assets 
- Also where `robots.txt`, `favicon.ico` are stored
- The file should not share the same name as the files in the `app`
- Only assets that are in the public directory at build time will be served by Next.js. Files added at runtime won't be available. We recommend using a third party service like AWS S3 for persistent file storage.

In webpack and some other frameworks, importing an image returns a string containing that image' URL, but in Next, it returns an object. This is so it can be fed into Next's `<Image>` component as part of optimization. 