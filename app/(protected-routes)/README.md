# Protected Pages

*notes*: Route protection can be done by having a layout to wrap protected components. The layout is a client component due to the usage of `useEffect` to do verification fetching. Note that layout does not re-render upon navigation.