import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";

import ModalCoupon from "../../src/components/ModalCoupon";
import axios from "axios";

jest.mock("axios");

describe("ModalCoupon", function () {
  it("return couponById", async () => {
    const { getByTestId } = render(<ModalCoupon visible={true} idCoupon={4} />);

    const mockgetCouponById = jest.fn();

    const description = getByTestId("coupon_description");

    expect(description.props.children).toBe("n,;:!");
  });
});
