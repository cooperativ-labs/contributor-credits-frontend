// store.js
import React, { createContext, useReducer } from 'react';

export interface ApplicationStoreProps {
  ManagerSidebarOpen: boolean;
  WalletModalOpen: boolean;
  WalletActionLockModalOpen: boolean;
  sidebarOpen: boolean;
  noticesOpen: boolean;
  project: any;
  dispatch: React.Dispatch<any>;
}

const initialState: ApplicationStoreProps = {
  project: {},
  ManagerSidebarOpen: false,
  WalletModalOpen: false,
  WalletActionLockModalOpen: false,
  sidebarOpen: false,
  noticesOpen: true,
  dispatch: null,
};
const store = createContext(initialState);
const { Provider } = store;
const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'TOGGLE_MANAGER_SIDEBAR':
        return { ...state, ManagerSidebarOpen: !state.ManagerSidebarOpen };
      case 'TOGGLE_WALLET_MODAL':
        return { ...state, WalletModalOpen: !state.WalletModalOpen };
      case 'TOGGLE_WALLET_ACTION_LOCK':
        return { ...state, WalletActionLockModalOpen: !state.WalletActionLockModalOpen };
      case 'TOGGLE_SIDEBAR':
        return { ...state, sidebarOpen: !state.sidebarOpen };
      case 'TOGGLE_NOTICES':
        return { ...state, noticesOpen: !state.noticesOpen };
      case 'SET_PROJECT':
        return { ...state, project: action.payload };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ ...state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
