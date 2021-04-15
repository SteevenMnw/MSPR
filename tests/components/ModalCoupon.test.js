import React from "react";
import { render } from "@testing-library/react-native";

import ModalCoupon from "../../src/components/ModalCoupon";

it("renders", () => {
  render(<ModalCoupon visible={true} idCoupon={1} />);
});

it("modalShowTrue", () => {
  const { getByText, getByTestId, queryByText } = render(
    <ModalCoupon visible={true} idCoupon={4} />
  );

  expect(getByTestId("descriptionCoupon").props.childrens).toBe(
    "20% de réduction sur tous les produits du site."
  );
});
