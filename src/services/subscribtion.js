import http from "./httpService";
//import jwtDecode from "jwt-decode";
import config from "../config.json";

const tokenKey = "token";


export function getSubscribtionPlan() {
  http.setJwt(getJWTAuthToken(tokenKey));
  return http.get(config.apiEndPoint + "/subscription-plans");
}

function getJWTAuthToken(token) {
  return localStorage.getItem(token);
}

export default {
  getSubscribtionPlan
};
