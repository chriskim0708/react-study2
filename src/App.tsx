import React, { useState, useEffect, useCallback, Suspense } from 'react';
import styled from '@emotion/styled';
import Button from './components/Button';
import Circle from './components/Circle';
import { useColor } from './hooks/useColor';
import { useCount } from './hooks/useCount';
import { textAtom } from './store/text';
import { postsAtom, idAtom } from './store/posts';
import { useSetAtom, useAtom } from 'jotai';

interface RectProps {
  width: number | string;
}

const lists = [
  {
    name: 'aaa',
  },
  {
    name: 'bbb',
  },
];

function App() {
  // console.log('App created');

  const [data] = useAtom(postsAtom);
  const setId = useSetAtom(idAtom);
  console.log('app data', data);

  const w = 200;
  // const [color, setColor] = useState<string>('#00ff00');
  const setText = (callback: Function) => {
    callback();
  };
  setText(() => {});
  const [view, setView] = useState<boolean>(true);
  const { color, changeColor } = useColor();
  const { multiply, increment } = useCount();

  const changeView = useCallback(() => {
    setView((state) => !state);
  }, []);

  useEffect(() => {
    // console.log('App mounted');
  }, []);

  useEffect(() => {
    // console.log('View changed');
  }, [view]);

  return (
    <Suspense fallback={<></>}>
      {data.body}
      count: {multiply}
      <Rect width={w} />
      <Circle color={color} style={{ opacity: view ? 0 : 1 }} />
      <Button onClick={changeColor} />
      <Button onClick={changeView} />
      <Button onClick={increment} />
      <>
        {lists.map((list) => (
          <div key={list.name}>{list.name}</div>
        ))}
      </>
      <button onClick={() => setId((i: number) => i + 1)}>add text</button>
    </Suspense>
  );
}

const Rect = styled('div', {
  shouldForwardProp: (prop) => prop !== 'width',
})(({ width }: RectProps) => ({
  backgroundColor: '#ff0000',
  width: `${width}px`,
  height: '100px',
  margin: '20px',
  padding: '20px',
}));

export default App;
