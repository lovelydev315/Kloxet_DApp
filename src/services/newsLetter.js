import http from "./httpService";
import config from "../config.json";

export function subscripeNewsletter(account) {
  console.log(account);
  return http.post(config.apiEndPoint + "/news-letter", {
    email: account.email
  });
}

export default {
  subscripeNewsletter
};
