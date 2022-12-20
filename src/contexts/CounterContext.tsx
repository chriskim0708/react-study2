import { createContext, useState, FC, useMemo } from 'react';

interface CounterProivderProps {
  children: React.ReactNode;
}

interface ContextProps {
  count: number;
}

interface ContextActionProps {
  actions: {
    increase: () => void;
    decrease: () => void;
  };
}

export const CounterActionContext = createContext<any>({});
export const CounterContext = createContext<Partial<ContextProps>>({});

export const CounterProivder: FC<CounterProivderProps> = ({ children }) => {
  const [count, setCount] = useState(0);
  const actions = useMemo(
    () => ({
      increase: () => {
        setCount((c) => c + 1);
      },
      decrease: () => {
        setCount((c) => c - 1);
      },
    }),
    []
  );
  return (
    <CounterActionContext.Provider value={actions}>
      <CounterContext.Provider value={{ count }}>{children}</CounterContext.Provider>
    </CounterActionContext.Provider>
  );
};
