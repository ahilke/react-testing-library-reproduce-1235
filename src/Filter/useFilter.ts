import type { Dispatch, Reducer } from "react";
import { useCallback, useEffect, useReducer, useState } from "react";
import _ from "lodash";
import { useLocalStorage } from "react-use";
import { useAsyncState } from "./useAsyncState";

export type UseFilterAction<T> =
  | {
      type: "setFilterState";
      payload: {
        [key: string]: any;
      };
    }
  | {
      type: "clearFilter";
      attributes: (keyof T)[];
    }
  | {
      type: "resetFilter";
    };

export const filterReducer = <TInitialState extends {}>({
  state,
  action,
  initialState,
}: {
  state: TInitialState;
  action: UseFilterAction<TInitialState>;
  initialState: TInitialState;
}) => {
  switch (action.type) {
    case "setFilterState":
      return { ...state, ...action.payload };
    case "clearFilter":
      return {
        ...state,
        ...Object.assign(
          {},
          ...action.attributes.map((attribute) => ({
            [attribute]: initialState[attribute],
          })),
        ),
      };
    case "resetFilter":
      return initialState;
  }
};
interface UseFilterProps<TInitialState> {
  initialState: TInitialState;
  storageKey: string;
  suppressLocalStorage?: boolean;
}
export const useFilter = <TInitialState extends {}>({
  initialState,
  storageKey,
  suppressLocalStorage,
}: UseFilterProps<TInitialState>) => {
  const projectId = "projectId";
  const [isInitialState, setIsInitialState] = useState(false);

  const [filterStateStorage, setFilterStateStorage] = useLocalStorage<TInitialState>(
    suppressLocalStorage
      ? `filters.${storageKey}.disabled` // this one is arbitrary, it will never be called if the suppressLocalStorage is set to 'true' (it doesn't accept undefined)
      : `filters.${storageKey}.${projectId}`,
    initialState,
  );

  const filterReducerWithInitialState = useCallback(
    (state: any, action: any) =>
      filterReducer({
        state,
        action,
        initialState,
      }),
    [initialState],
  );

  const [state, asyncDispatch] = useAsyncState(
    useReducer<Reducer<TInitialState, UseFilterAction<TInitialState>>>(
      filterReducerWithInitialState,
      filterStateStorage as TInitialState,
    ),
  );

  useEffect(() => {
    setIsInitialState(state === initialState || _.isEqual(state, initialState));
  }, [state, initialState]);

  useEffect(() => {
    if (!suppressLocalStorage) {
      setFilterStateStorage(state);
    }
  }, [state, setFilterStateStorage, suppressLocalStorage]);

  return {
    filterState: state,
    filterDispatch: asyncDispatch as Dispatch<UseFilterAction<TInitialState>>,
    isInitialState,
  };
};
