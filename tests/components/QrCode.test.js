import React from "react";
import { render } from "@testing-library/react-native";

import QrCode from "../../src/components/QrCode";

it("renders", () => {
  render(<QrCode />);
});
