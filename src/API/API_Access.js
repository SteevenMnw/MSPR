import axios from "axios";

const BASE_URL = "https://springmspr.herokuapp.com";

// Récupère tous les coupons
// https://springmspr.herokuapp.com/coupons/all
export function getAllCoupons() {
  const url = BASE_URL + "/coupons/all";
  return axios.get(url).then((response) => response.data);
}

// Récupère un coupon grâce à l'id
// https://springmspr.herokuapp.com/coupons/1
export function getCouponById(id) {
  const url = BASE_URL + "coupons/" + id;
  return axios.get(url).then((response) => response.data);
}

// Récupère tous les utilisateurs
// https://springmspr.herokuapp.com/users/all
export function getAllUsers() {
  const url = BASE_URL + "/users/all";
  return axios.get(url).then((response) => response.data);
}

// Récupère l'utilisateur grâce à l'id
// https://springmspr.herokuapp.com/users/1
export function getUserById(id) {
  const url = BASE_URL + "/users/" + id;
  return axios.get(url).then((response) => response.data);
}

// Récupère l'utilisateur grâce à son email et son password
// https://springmspr.herokuapp.com/users/identification
export function getUserByEmailAndPassword(email, password) {
  const url = BASE_URL + "/users/identification";
  return axios
    .get(url, { params: { email: email, password: password } })
    .then((response) => response.data);
}

// Ajout d'un coupon à l'utilisateur en utilisant l'id du coupon, l'id de l'utilisateur
// https://springmspr.herokuapp.com/users/addCoupon
export function addCouponForUser(idUser, idCoupon) {
  const url = BASE_URL + `/users/${idUser}/addCoupon`;
  return axios
    .put(url, null, { params: { idCoupon } })
    .then((response) => response.data);
}

// Ajout d'un utilisateur
// https://springmspr.herokuapp.com/users/add
export function addUser(mail, password, name, surname) {
  const url = BASE_URL + "/users/add";
  return axios
    .post(url, null, {
      params: {
        mail,
        password,
        name,
        surname,
      },
    })
    .catch((error) => console.log(error));
}
