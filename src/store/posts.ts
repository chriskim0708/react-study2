import { atom } from 'jotai';
import { atomsWithQuery } from 'jotai-tanstack-query';

export const idAtom = atom(1);
export const [postsAtom] = atomsWithQuery((get) => ({
  queryKey: ['users', get(idAtom)],
  queryFn: async ({ queryKey: [, id] }) => {
    // console.log('name', name);
    // console.log('id', id);
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return res.json();
  },
  onError: (error) => {
    console.log('error', error);
  },
}));
