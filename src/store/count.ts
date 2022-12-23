import { atom } from 'jotai';

export const countAtom = atom<number>(0);
export const multiplyCountAtom = atom((get) => get(countAtom) * 2);

export const readWriteCountAtom = atom(
  (get) => get(countAtom) + 10,
  (get, set, count: number) => {
    set(countAtom, count - 2);
  }
);
