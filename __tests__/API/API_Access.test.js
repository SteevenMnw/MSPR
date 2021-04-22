// users.test.js
import axios from "axios";
import {
  getCouponById,
  getUserById,
  getUserByEmailAndPassword,
  addCouponForUser,
  deleteCouponForUser,
} from "../../src/API/API_Access";

jest.mock("axios");

test("should fetch coupon by Id", () => {
  const coupon = [
    {
      id_coupon: 1,
      libelle: "test",
      description: "test",
      date_end: "2021-03-02",
      compteur: null,
      info: 0,
    },
  ];
  const resp = { data: coupon };
  axios.get.mockResolvedValue(resp);

  return getCouponById(1).then((data) => expect(data).toEqual(coupon));
});

test("should fetch user by id", () => {
  const user = [
    {
      id_user: 1,
      mail: "anthony@gmail.com",
      password: "anthony",
      name: "Anthony",
      surname: "Leclercq",
      coupons: [
        {
          id_coupon: 1,
          libelle: "test",
          description: "test",
          date_end: "2021-03-02",
          compteur: null,
          info: 0,
        },
      ],
    },
  ];
  const resp = { data: user };
  axios.get.mockResolvedValue(resp);

  return getUserById(1).then((data) => expect(data).toEqual(user));
});

test("should fetch user by email and password", () => {
  const user = [
    {
      id_user: 1,
      mail: "anthony@gmail.com",
      password: "anthony",
      name: "Anthony",
      surname: "Leclercq",
      coupons: [
        {
          id_coupon: 1,
          libelle: "test",
          description: "test",
          date_end: "2021-03-02",
          compteur: null,
          info: 0,
        },
      ],
    },
  ];
  const resp = { data: user };
  axios.get.mockResolvedValue(resp);

  return getUserByEmailAndPassword(
    "anthony@gmail.com",
    "anthony"
  ).then((data) => expect(data).toEqual(user));
});

test("should add coupon of user", () => {
  const resp = { status: 200 };
  axios.put.mockResolvedValue(resp);

  return addCouponForUser(1, 2).then((data) => expect(data).toEqual(200));
});

test("should remove coupon of user", () => {
  const resp = { status: 200 };
  axios.put.mockResolvedValue(resp);

  return deleteCouponForUser(1, 2).then((data) => expect(data).toEqual(200));
});
