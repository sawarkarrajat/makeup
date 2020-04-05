import axios from "axios";
// const {address} = require("../configs/routeConfig");
const address = "http://makeup-api.herokuapp.com/api/v1/products.json";
// var token = localStorage.getItem("token");
export default class axiosServices {
  getJson() {
    return axios.get(address);
  }

  getMethod(target) {
    return axios.get(address + "?" + target);
  }
}
