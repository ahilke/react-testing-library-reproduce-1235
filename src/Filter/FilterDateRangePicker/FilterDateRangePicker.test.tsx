import { screen, render } from "@testing-library/react";
import { FilterDateRangePicker } from ".";
import { FiltersTestWrapper } from "../__tests__/wrapper.mock";
import userEvent from "@testing-library/user-event";
import moment from "moment";

describe("FilterSection", () => {
  const title = "title";
  const attributeFrom = "attributeFrom";
  const attributeTo = "attributeTo";
  const filterDispatch = jest.fn();
  const filterState = {
    [attributeFrom]: null,
    [attributeTo]: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const repeats = 1000;

  test.each(Array(repeats).fill(0))("sets a date range", async () => {
    render(
      <FilterDateRangePicker
        title={title}
        attributeFrom={attributeFrom}
        attributeTo={attributeTo}
        // filterDispatch={filterDispatch}
        filterState={filterState}
        maxDate={moment().add(1, "year")}
      />,
      { wrapper: FiltersTestWrapper },
    );

    const fromInput = screen.getByLabelText("from");
    const toInput = screen.getByLabelText("to");

    await userEvent.click(fromInput);

    const todayButton = await screen.findByText("Heute");

    await userEvent.click(todayButton);

    // expect(filterDispatch).toHaveBeenCalledWith({
    //   type: "setFilterState",
    //   payload: {
    //     [attributeFrom]: moment().startOf("day"),
    //     [attributeTo]: moment().endOf("day").toISOString(),
    //   },
    // });

    expect(fromInput).toHaveValue(moment().startOf("day").format("DD.MM.YYYY"));
    expect(toInput).toHaveValue(moment().endOf("day").format("DD.MM.YYYY"));
  });
});
