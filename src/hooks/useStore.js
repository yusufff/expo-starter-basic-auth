import { createContext, useContext } from 'react';

export const StoreContext = createContext();

export function useStore() {
  return useContext(StoreContext);
}

export const Status = {
  Fetching: 'fetching',
  Done: 'done',
  Error: 'error',
}