import { FilterAccordion } from "../FilterAccordion";
// import type { Dispatch } from 'react';
// import type { UseFilterAction } from '@/hooks/useFilter';
import { DateRangePicker } from "../DateRangePicker";
import moment from "moment";

interface FilterDateRangeProps<T> {
  title: string;
  attributeFrom: keyof T;
  attributeTo: keyof T;
  filterState: T;
  // filterDispatch: Dispatch<UseFilterAction<T>>;
  disabled?: boolean;
  maxDate: moment.Moment;
}

export const FilterDateRangePicker = <T extends Record<string, string | null>>({
  title,
  attributeFrom,
  attributeTo,
  // filterDispatch,
  filterState,
  disabled,
  maxDate,
}: FilterDateRangeProps<T>) => {
  return (
    <FilterAccordion
      title={title}
      onClear={() => {
        // filterDispatch({
        //   type: 'clearFilter',
        //   attributes: [attributeFrom, attributeTo],
        // });
      }}
      disableClear={!(filterState[attributeFrom] || filterState[attributeTo])}
    >
      <DateRangePicker
        maxDate={maxDate}
        value={[
          filterState[attributeFrom] ? moment(filterState[attributeFrom]) : null,
          filterState[attributeTo] ? moment(filterState[attributeTo]) : null,
        ]}
        localeText={{ start: "from", end: "to" }}
        onAccept={(value) => {
          const [from, to] = value;
          const toEod = to ? to.endOf("day").toISOString() : null;
          // filterDispatch({
          //   type: 'setFilterState',
          //   payload: { [attributeFrom]: from, [attributeTo]: toEod },
          // });
        }}
        disabled={!!disabled}
        sx={{
          "&.MuiStack-root": {
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
          },
          "& .MuiFormControl-root:nth-of-type(2)": {
            mt: 1,
            ml: 0,
          },
        }}
      />
    </FilterAccordion>
  );
};
