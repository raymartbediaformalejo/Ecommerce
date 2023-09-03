import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { TScreenSizeContext } from "../types/TScreenSizeContext";

type ScreenSizeContextProviderProps = {
  children: ReactNode;
};

const screenSizeContext = createContext<TScreenSizeContext>({
  screenWidth: 0,
});

const useScreenSizeContext = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", onResize);

    setScreenWidth(window.innerWidth);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const onResize = () => {
    setScreenWidth(window.innerWidth);
  };

  return {
    screenWidth,
  };
};

export const ScreenSizeContextProvider = ({
  children,
}: ScreenSizeContextProviderProps) => {
  const screenSize = useScreenSizeContext();
  return (
    <screenSizeContext.Provider value={screenSize}>
      {children}
    </screenSizeContext.Provider>
  );
};

export const useScreenSize = () => useContext(screenSizeContext);
