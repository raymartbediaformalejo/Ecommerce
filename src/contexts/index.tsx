import { ReactChild } from "react";
import { ScreenSizeContextProvider } from "./screenSizeContext";

interface AllContextProvidersProps {
  children: ReactChild;
}

const AllContextProviders = ({ children }: AllContextProvidersProps) => {
  return <ScreenSizeContextProvider>{children}</ScreenSizeContextProvider>;
};

export default AllContextProviders;
