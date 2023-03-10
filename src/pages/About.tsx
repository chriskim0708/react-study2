import React, { useContext, memo } from "react";
import {
  CounterProivder,
  CounterContext,
  CounterActionContext,
} from "../contexts/CounterContext";
import type {
  IDialogAction,
  IDialogState,
  DialogReducerType,
} from "../components/Dialog";

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
  console.log("button render");
  const actions = useContext(CounterActionContext);
  return (
    <>
      <button onClick={actions?.increase}>increase click</button>
      <button onClick={actions?.decrease}>decrease click</button>
    </>
  );
};

const Text = () => {
  return <span>About</span>;
};

const About = () => {
  return (
    <div>
      <br />
      <br />
      <FirstComponent />
      <SecondComponent />
      <ThirdComponent />
      <Button />
      <br />
      <Text />
    </div>
  );
};

export default About;
