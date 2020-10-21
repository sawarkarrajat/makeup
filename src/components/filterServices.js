/**
 * this method filters given products array on the basis
 * of rating provided and null values in rating.
 *
 * @param {Array<Object>} products - an array of products objects
 * @param {String|Number} rating - rating property of single product object
 * @property {function}
 * @returns {Array<Object>} data - filtered array of objects
 */
export const ratingFilter = (products, rating) => {
  let data = products.filter((item) => {
    return (
      item.rating <= rating ||
      item.rating === null ||
      !item.hasOwnProperty("rating")
    );
  });
  return data;
};

/**
 * this method filters given products array for the range of
 * minimum and maximum price and null values in price
 * @param {Array<Object>} products - an array of products objects
 * @param {Number} minimum - minimum price
 * @param {Number} maximum - maximum price
 * @property {function}
 * @returns {Array<Object>} data - filtered array of objects
 */
export const minMaxPriceFilter = (products, minimum, maximum) => {
  let data = products.filter((item) => {
    return (
      (Number(item.price) <= Number(maximum) &&
        Number(item.price) >= Number(minimum)) ||
      Number(item.price) === null
    );
  });
  return data;
};

/**
 * this method filters on basis of tags they contain
 * if they contain even a single tag they will be added to resultant array.
 *
 * @param {Array<Object>} products - an array of products objects
 * @param {Array<String>} tagFiltersArray - an array of tag label strings
 * @property {function}
 * @returns {Array<Object>} data - filtered array of objects
 */
export const tagsFilter = (products, tagFiltersArray) => {
  let data = [];
  products.forEach((item) => {
    item.tag_list.forEach((tag) => {
      if (tagFiltersArray.includes(tag) && !data.includes(item)) {
        data.push(item);
      }
    });
  });
  return data;
};

/**
 * this method filters products on the basis of brand labels
 *
 * @param {Array<Object>} products - an array of product Objects
 * @param {Array<String>} brandFiltersArray - an array of brand label strings
 * @property {function}
 * @returns {Array<Object>} data - filtered array of objects
 */
export const brandsFilter = (products, brandFiltersArray) => {
  let data = products.filter((item) => brandFiltersArray.includes(item.brand));
  return data;
};
