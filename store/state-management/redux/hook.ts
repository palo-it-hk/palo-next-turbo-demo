//  useSelector and useDispatch allows your component to subscribe and modify the state.

// If you are using Typescript, you'll likely be asked to type your functions.
// Hence the below configuration.
// Rather than using useDispatch and useSelector, use useAppDispatch and useAppSelector.

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
