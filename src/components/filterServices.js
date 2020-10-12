export const ratingFilter = (products, rating) => {
  let data = products.filter((item) => {
    return item.rating === rating || item.rating === null;
  });
  console.log("value in rating filter", data);
  return data;
};
