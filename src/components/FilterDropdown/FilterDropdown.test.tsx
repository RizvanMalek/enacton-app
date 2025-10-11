import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterDropdown from "./FilterDropdown";

describe("FilterDropdown Component", () => {
  const label = "Rocket";
  const options = ["Falcon 1", "Falcon 9", "Starship"];

  test("renders the label and all options", () => {
    render(
      <FilterDropdown
        label={label}
        options={options}
        value=""
        onChange={() => {}}
      />
    );

    // Check label
    expect(screen.getByText(label)).toBeInTheDocument();

    // Check "All" option
    expect(screen.getByRole("option", { name: "All" })).toBeInTheDocument();

    // Check all options
    options.forEach((opt) => {
      expect(screen.getByRole("option", { name: opt })).toBeInTheDocument();
    });
  });

  test("calls onChange when option is selected", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <FilterDropdown
        label={label}
        options={options}
        value=""
        onChange={handleChange}
      />
    );

    const select = screen.getByRole("combobox");

    // Select "Falcon 9"
    await user.selectOptions(select, "Falcon 9");

    // onChange should be called with "Falcon 9"
    expect(handleChange).toHaveBeenCalledWith("Falcon 9");
  });
});
