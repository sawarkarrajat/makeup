import axios from "axios";
const address = "http://makeup-api.herokuapp.com/api/v1/products.json?";
/**
 * a class with services to serve api requests
 */
export default class Services {
  /**
   * 
   * @param {String} filters 
   */
  getJson(filters) {
    return axios.get(address+filters);
  }
}
