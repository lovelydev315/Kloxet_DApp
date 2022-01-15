import http from "./httpService";
import config from "../config.json";

export function contactUsService(contactUsData) {
  return http.post(config.apiEndPoint + "/contact", {
    name: contactUsData.name,
    email: contactUsData.email,
    contact: contactUsData.contactNumber,
    subject: contactUsData.subject,
    message: contactUsData.message
  });
}

export default {
  contactUsService
};
