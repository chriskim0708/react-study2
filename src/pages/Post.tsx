import React, { useContext } from 'react';
import { CounterProivder, CounterContext, CounterActionContext } from '../contexts/CounterContext';

const FirstChildComponent = () => {
  const { count } = useContext(CounterContext);
  return <div>first child component: {count}</div>;
};

const FirstComponent = () => {
  return (
    <div>
      <FirstChildComponent />
    </div>
  );
};

const SecondComponent = () => {
  const { count } = useContext(CounterContext);
  return <div>second component: {count}</div>;
};

const ThirdComponent = () => {
  const { count } = useContext(CounterContext);
  return <div>third component: {count}</div>;
};

const Button = () => {
  const actions = useContext(CounterActionContext);
  return (
    <>
      <button onClick={actions?.increase}>increase click</button>
      <button onClick={actions?.decrease}>decrease click</button>
    </>
  );
};

const Post = () => {
  return (
    <div>
      About
      <br />
      <br />
      <FirstComponent />
      <SecondComponent />
      <ThirdComponent />
      <Button />
    </div>
  );
};

export default Post;
