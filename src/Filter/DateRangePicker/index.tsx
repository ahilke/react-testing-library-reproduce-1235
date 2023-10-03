import { MobileDateRangePicker, renderDateRangeViewCalendar } from "@mui/x-date-pickers-pro";
import { default as CalendarIcon } from "@mui/icons-material/Event";
import type { FC } from "react";
import type { Moment } from "moment";
import type { MobileDateRangePickerProps } from "@mui/x-date-pickers-pro";

export type DateRangePickerProps = Omit<MobileDateRangePickerProps<Moment>, "slotProps"> & {
  error?: boolean;
};

export const DateRangePicker: FC<DateRangePickerProps> = ({ format = "DD.MM.YYYY", error, ...props }) => {
  return (
    <MobileDateRangePicker<Moment>
      {...props}
      format={format}
      viewRenderers={{
        day: (props) =>
          renderDateRangeViewCalendar({
            ...props,
            calendars: 2,
          }),
        ...props.viewRenderers,
      }}
      slotProps={{
        fieldSeparator: {
          display: "none",
        },
        actionBar: {
          actions: ["today", "clear", "accept"],
        },
        toolbar: {
          toolbarFormat: "dd, DD MMM ([KW]ww)",
          hidden: false,
        },
        dialog: {
          sx: {
            "& .MuiDialog-paper": {
              maxWidth: "800px",
            },
            "& .MuiDateRangePickerToolbar-root": {
              backgroundColor: "#089c20",
            },
          },
        },
        textField: {
          error: !!error,
          InputProps: {
            endAdornment: (
              <CalendarIcon
                sx={{
                  color: error ? "#c9200a" : "#6f7370",
                }}
              />
            ),
          },
          sx: {
            backgroundColor: "white",

            "& .MuiInputBase-input": {
              py: 1.5,
            },
            "& .MuiIconButton-root": {
              height: 32,
              width: 32,
              p: 0.5,
              mr: 0,
            },
          },
        },
      }}
    />
  );
};
