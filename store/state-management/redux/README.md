# Set up redux with typescript

Redux Toolkit's configureStore API should not need any additional typings. You will, however, want to extract the RootState type and the Dispatch type from the store so that they can be referenced as needed. (You can checkout redux-store.ts for more elaboration).

While it's possible to import the RootState and AppDispatch types into each component, it's better to create typed versions of the useDispatch and useSelector hooks for usage in your application.

Why?
- For `useSelector`, it saves you the need to type `(state: RootState)` everytime. 
- For `useDispatch`, the default `Dispatch` type does not know about thunks. In order to correctly dispatch thunks, you need to use the specific customized `AppDispatch` type from the store that includes the thunk middleware types, and use that with useDispatch. Adding a pre-typed `useDispatch` hook keeps you from forgetting to import `AppDispatch` where it's needed.


## Installation of redux in Next 13

In the previous nextjs (one with the `pages` folder), to have all components to reach the store, a `<Provider>` must be wrapper around the `_app.tsx`. With the latest nextjs (one with the `app` folder) `<Provider>` should be inside the root `layout.tsx`. Since the Provider uses `useContext`, it cannot be used directly in the `layout.tsx` root because it cannot be a client component. To work around this, a component can be created that can act as a wrapper using the `Provider` and it can be used within the root `layout.tsx`. 