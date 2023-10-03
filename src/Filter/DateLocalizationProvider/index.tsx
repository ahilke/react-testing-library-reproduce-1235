import type { FC, ReactNode } from "react";
import { useEffect } from "react";
import { LocalizationProvider, deDE, enUS } from "@mui/x-date-pickers-pro";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { default as moment } from "moment";

import "moment/locale/de";

export type DateLocalizationProviderProps = {
  lng?: "de" | "en";
  children?: ReactNode;
};

export const DateLocalizationProvider: FC<DateLocalizationProviderProps> = ({ children, lng = "de" }) => {
  const localeText = (() => {
    switch (lng) {
      case "de":
        return deDE.components.MuiLocalizationProvider.defaultProps.localeText;
      case "en":
        return enUS.components.MuiLocalizationProvider.defaultProps.localeText;
      default:
        console.warn(`Warning! current language fell through a backup case. lng=${lng}`);
        return deDE.components.MuiLocalizationProvider.defaultProps.localeText;
    }
  })();

  const dateAdapter = AdapterMoment;

  useEffect(() => {
    switch (lng) {
      case "de":
        moment.locale("de");
        break;
      case "en":
        moment.locale();
        break;
      default:
        console.warn(`Warning! current language fell through a backup case. lng=${lng}`);
        moment.locale("de");
        break;
    }
  }, [lng]);

  return (
    <LocalizationProvider localeText={localeText as any} dateAdapter={dateAdapter}>
      {children}
    </LocalizationProvider>
  );
};
