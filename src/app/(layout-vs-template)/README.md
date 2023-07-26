#Layout.tsx and template.tsx

## layout.tsx
A layout is UI that is shared between multiple pages. On navigation, layouts preserve state, remain interactive, and do not re-render.

- The top-most layout is called the Root Layout. This required layout is shared across all pages in an application. Root layouts must contain html and body tags.
- To create multiple root layouts, you can have a layout.tsx in each route group

For example:

```
- App
    - (marketing)
        - layout.tsx
        - ...
    - (shop)
        - layout.tsx
        - ...
```

*Notes on Rendering*: Aside from the root `layout.tsx`, `layout.tsx`s can be client side components, without automatically turning it's children into client components. However lets say you have a `page.tsx` that you've made into a client component by adding `use client`, then the children components are automatically turned into client components, even if you don't add `use client` into them. Which means child components of client components will be re-rendered everytime the wrapper updates. Whereas in server components, if their children components don't change, then the children will not reload. 


## template.tsx

Templates are similar to layouts in that they wrap each child layout or page. Unlike layouts that persist across routes and maintain state, templates create a new instance for each of their children on navigation. This means that when a user navigates between routes that share a template, a new instance of the component is mounted, DOM elements are recreated, state is not preserved, and effects are re-synchronized.
