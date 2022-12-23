import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { countAtom, multiplyCountAtom, readWriteCountAtom } from '../store/count';
import { postsAtom, idAtom } from '../store/posts';

import { useAtomValue, useSetAtom, useAtom } from 'jotai';
import { useQueryClient } from '@tanstack/react-query';

const FirstChildComponent = () => {
  const posts = useAtomValue(postsAtom);
  const count = useAtomValue(countAtom);
  console.log('posts', posts);
  return <div>first child component: {count}</div>;
};

const FirstComponent = () => {
  return (
    <Suspense fallback={<>...loading</>}>
      <FirstChildComponent />
    </Suspense>
  );
};

const SecondComponent = () => {
  const count = useAtomValue(multiplyCountAtom);
  return <div>second component: {count}</div>;
};

const ThirdComponent = () => {
  const [count] = useAtom(readWriteCountAtom);
  return <div>third component: {count}</div>;
};

const Account = () => {
  const [id, setId] = useAtom(idAtom);
  const [count, setCount] = useAtom(countAtom);
  const [, setSubtractCount] = useAtom(readWriteCountAtom);
  const queryClient = useQueryClient();
  return (
    <div>
      Account
      <br />
      <br />
      <FirstComponent />
      <SecondComponent />
      <ThirdComponent />
      <button onClick={() => setCount((c) => c + 1)}>increase</button>
      <button onClick={() => setSubtractCount(count + 1)}>click</button>
      <button onClick={() => setId((c) => c + 1)}>post id increase</button>
      <button onClick={() => queryClient.invalidateQueries({ queryKey: ['posts'] })}>refetch</button>
      <Outlet />
    </div>
  );
};

export default Account;
