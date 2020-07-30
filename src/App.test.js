import React from "react";
import { render } from "@testing-library/react";
import Home from "./components/Home";

test("find text", () => {
  const { getByText } = render(<Home />);
  const linkElement = getByText(/WeatherOrNot/i);
  expect(linkElement).toBeInTheDocument();
});
