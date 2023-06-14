# Set up redux with typescript

Redux usage largely the same in NextJS. Some variance are mostly due to the usage of Typescript.

Redux Toolkit's configureStore API should not need any additional typings. You will, however, want to extract the RootState type and the Dispatch type from the store so that they can be referenced as needed. (You can checkout redux-store.ts for more elaboration).

While it's possible to import the RootState and AppDispatch types into each component, it's better to create typed versions of the useDispatch and useSelector hooks for usage in your application.

Why?
- For `useSelector`, it saves you the need to type `(state: RootState)` everytime. 
- For `useDispatch`, the default `Dispatch` type does not know about thunks. In order to correctly dispatch thunks, you need to use the specific customized `AppDispatch` type from the store that includes the thunk middleware types, and use that with useDispatch. Adding a pre-typed `useDispatch` hook keeps you from forgetting to import `AppDispatch` where it's needed.

## Installation of redux in Next 13

In the previous NextJS (one with the `pages` folder),  a `<Provider>` must be wrapper around the `_app.tsx` to enable subscription of the store across the whole app. 

With the latest NextJS (one with the `app` folder), the `_app.tsx` is replaced by the root `layout.tsx`. Hence, by logic, the `<Provider>` should be inside the root `layout.tsx`. However, because the Provider uses `useContext` which is a client only function, it cannot be used directly in the server-side only root `layout.tsx`. To work around this, a client component can be created that can act as a wrapper using the `Provider` and be placed within the root `layout.tsx`. 

In the root `layout.tsx` you will see a client component called `<Providers>` is wrapped around the children. 

## How do use Redux

It is highly recommended that you read the (Redux Essentials)[https://redux.js.org/tutorials/essentials/part-1-overview-concepts] in which this demo is based on.

We use the Redux Toolkit (aka RTK) which provides methods and API to do state management in a more intuitive way. 

To set up redux on the fly, you can see all the files below and read the comments.

(Its best to read in the following order)

**Setting up the store**
`store/state-management/redux/store.ts`
`store/state-management/redux/hook.ts`

**Setting up slices, reducers and thunks**
`store/state-management/redux/posts/slice.ts`

**Setting up selectors**
`store/state-management/redux/posts/selectors.ts`

## Demo

This repo demo's redux in the form of a simple blog site. You can run it with [http://localhost:3000/redux-demo] .
The folder of this page is within `/app/(redux)`
