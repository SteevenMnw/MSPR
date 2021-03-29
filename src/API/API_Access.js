import axios from "axios";

const BASE_URL = "https://springmspr.herokuapp.com/";

// Récupère tous les coupons
export function getAllCoupons() {
  const url = BASE_URL + "/coupons/all";
  return axios.get(url).then((response) => response.data);
}

// Récupère un coupon grâce à l'id
export function getCouponById(id) {
  const url = BASE_URL + "coupons/" + id;
  return axios.get(url).then((response) => response.data);
}

// Récupère tous les utilisateurs
export function getAllUsers() {
  const url = BASE_URL + "/users/all";
  return axios.get(url).then((response) => response.data);
}

// Récupère l'utilisateur grâce à l'id
export function getUserById(id) {
  const url = BASE_URL + "/users/" + id;
  return axios.get(url).then((response) => response.data);
}

// Récupère l'utilisateur grâce à son email et son password
export function getUserByEmailAndPassword(email, password) {
  const url = BASE_URL + "/users/identification";
  return axios
    .get(url, { params: { email: email, password: password } })
    .then((response) => response.data);
}

// Ajout d'un coupon à l'utilisateur en utilisant l'id du coupon, l'id de l'utilisateur
export function addCouponForUser(idUser, idCoupon) {
  const url = BASE_URL + `/users/${idUser}/addCoupon`;
  return axios
    .put(url, null, { params: { idCoupon } })
    .then((response) => response.data);
}
