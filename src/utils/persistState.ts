import { AtomEffect } from 'recoil';

export interface PersistStorage {
  setItem(key: string, value: string): void;
  getItem(key: string): null | string;
}

export interface PersistConfiguration {
  key?: string;
  storage?: PersistStorage;
}

export const recoilPersist = (
  config: PersistConfiguration = {},
): { persistAtom: AtomEffect<any> } => {
  if (typeof window === 'undefined') {
    return {
      persistAtom: () => {},
    };
  }

  const { key = 'persist_state', storage = sessionStorage } = config;

  const persistAtom: AtomEffect<string> = ({
    onSet,
    node,
    trigger,
    setSelf,
  }) => {
    if (trigger === 'get') {
      const state = getState();
      if (node.key in state) {
        setSelf(state[node.key]);
      }
    }
    onSet(async (newValue, _, isReset) => {
      const state = getState();
      updateState(newValue, state, node.key, isReset);
    });
  };

  const updateState = (
    newValue: any,
    state: any,
    key: string,
    isReset: boolean,
  ) => {
    if (isReset) {
      delete state[key];
    } else {
      state[key] = newValue;
    }

    setState(state);
  };

  const parseState = (state: string) => {
    if (!state) {
      return {};
    }
    try {
      return JSON.parse(state);
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  const getState = (): any => {
    const toParse = storage.getItem(key);
    if (!toParse) {
      return {};
    }

    return parseState(toParse);
  };

  const setState = (state: any): void => {
    try {
      storage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.error(e);
    }
  };

  return { persistAtom };
};
