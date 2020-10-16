export const ratingFilter = (products, rating) => {
  let data = products.filter((item) => {
    return (
      item.rating <= rating ||
      item.rating === null ||
      !item.hasOwnProperty("rating")
    );
  });
  console.log("value in rating filter", data);
  return data;
};

export const minMaxPriceFilter = (products, minimum, maximum) => {
  console.log("value of minimum,maximum", minimum, maximum);
  let data = products.filter((item) => {
    return (
      (Number(item.price) <= maximum && item.price >= Number(minimum)) ||
      Number(item.price) === null
    );
  });
  console.log("value in minmax filter", { data, minimum, maximum });
  return data;
};
export const tagsFilter = (products, tagFiltersArray) => {
  let data = [];
  products.forEach((item) => {
    item.tag_list.forEach((tag) => {
      if (tagFiltersArray.includes(tag) && !data.includes(item)) {
        data.push(item);
      }
    });
  });
  console.log("value in tag filter", data);
  return data;
};
export const brandsFilter = (products, brandFiltersArray) => {
  let data = products.filter((item) => brandFiltersArray.includes(item.brand));
  console.log("value in brand filter", data);
  return data;
};
