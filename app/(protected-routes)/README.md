# Protected Pages

*notes*: Route protection can be done by having a wrapper to wrap protected components. The wrapper is usually a client component due to the usage of `useEffect` to do verification fetching. *Do not* use layout.tsx(and also template.tsx) for route protection as layout does not re-render upon navigation.