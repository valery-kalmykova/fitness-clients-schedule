import {
  SetStateAction,
  Dispatch,
  ReactNode,
  useContext,
  useState,
  createContext,
} from "react";

type Props = {
  children: ReactNode;
};

type AppContextType = {
  windowSize: number;
  setWindowSize: Dispatch<SetStateAction<number>>;
};

const defaultValue = {
  windowSize: window.innerWidth,
  setWindowSize: () => {},
};

export const AppContext = createContext<AppContextType>(defaultValue);

export const AppContextProvider = (props: Props) => {
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

  return (
    <AppContext.Provider
      value={{
        windowSize,
        setWindowSize,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
