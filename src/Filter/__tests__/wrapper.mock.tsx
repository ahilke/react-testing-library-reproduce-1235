import type { ReactNode } from "react";
import { DateLocalizationProvider } from "../DateLocalizationProvider";

export const FiltersTestWrapper = ({ children }: { children: ReactNode }) => {
  return <DateLocalizationProvider lng="de">{children}</DateLocalizationProvider>;
};
