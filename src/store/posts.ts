import { atom } from 'jotai';
import { atomsWithQuery } from 'jotai-tanstack-query';
import axios from 'axios';

export const idAtom = atom(1);
export const [postsAtom] = atomsWithQuery((get) => ({
  queryKey: ['posts', get(idAtom)],
  queryFn: async ({ queryKey: [, id] }) => {
    return axios(`https://jsonplaceholder.typicode.com/posts/${id}`).then((resp) => resp.data);
  },
  onError: (error) => {
    console.log('error', error);
  },
}));
