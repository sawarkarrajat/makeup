import axios from "axios";
const address = "http://makeup-api.herokuapp.com/api/v1/products.json?";
export default class Services {
  getJson(filters) {
    return axios.get(address+filters);
  }
}
