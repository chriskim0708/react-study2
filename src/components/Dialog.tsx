import {
  PropsWithChildren,
  createContext,
  Dispatch,
  useReducer,
  Reducer,
  useContext,
  useCallback,
} from "react";
export type Action<T, P = unknown> = { type: T; payload?: P };

export interface IDialogState {
  isOpen?: boolean;
}
export type IDialogAction = Action<typeof actionTypes.setIsOpen, boolean>;
export type DialogReducerType = typeof dialogReducer;

const actionTypes = {
  setIsOpen: "SET_IS_OPEN",
} as const;

const initialState: IDialogState = {
  isOpen: false,
};
const DialogStateContext = createContext(initialState);
const DialogDispatchContext = createContext<Dispatch<IDialogAction> | null>(
  null
);

function dialogReducer(state: IDialogState, action: IDialogAction) {
  switch (action.type) {
    case actionTypes.setIsOpen: {
      return {
        ...state,
        isOpen: action.payload,
      };
    }
    default: {
      throw new Error("uknown action type");
    }
  }
}

export function Dialog({
  children,
  reducer,
}: PropsWithChildren<{ reducer: DialogReducerType }>) {
  const [state, dispatch] = useReducer<Reducer<IDialogState, IDialogAction>>(
    reducer,
    initialState
  );
  return (
    <DialogDispatchContext.Provider value={dispatch}>
      <DialogStateContext.Provider value={state}>
        {children}
      </DialogStateContext.Provider>
    </DialogDispatchContext.Provider>
  );
}

export const useDialogContext = () => {
  const { isOpen } = useContext(DialogStateContext);
  const dispatch = useContext(DialogDispatchContext);

  const setIsOpen = useCallback(
    (payload: boolean) => dispatch?.({ type: actionTypes.setIsOpen, payload }),
    [dispatch]
  );

  const getRootProps = () => ({
    isOpen,
  });

  return {
    setIsOpen,
    getRootProps,
  };
};
