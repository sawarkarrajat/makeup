import React from "react";
import muData from "../makeupData.json";
import cart from "../asset/cart.png";
import left from "../asset/angle-left.png";
import "../sass/ProductDetails.sass";

function ProductDetails(props) {
  const pid = props.match.params.id;
  console.log("value in pid", pid);
  const product = muData.find((obj) => obj.id === Number(pid));
  const {
    image_link,
    api_featured_image,
    brand,
    name,
    tag_list,
    category,
    price,
    price_sign,
    product_colors,
    rating,
    description,
  } = product;
  console.log("in productDetail", product);
  const createMarkup = () => {
    return { __html: description };
  };
  return (
    <div className="productDetails__container">
      <div className="productDetails__leftcolumn">
        <img src={image_link || api_featured_image} alt="product" />
      </div>
      <div className="productDetails__rightcolumn">
        <div className="productDetails__inline">
          <h1>{name}</h1>
        </div>
        <div className="productDetails__inline">
          <h3>brand:&nbsp;&nbsp;&nbsp; </h3>
          <h2> {brand}</h2>
        </div>
        <div className="productDetails__inline">
          <h3>category:&nbsp;&nbsp;&nbsp; </h3>
          <h2> {category}</h2>
        </div>
        <div className="productDetails__inline">
          <h4>
            {price_sign ? price_sign : "$"}:&nbsp;&nbsp;&nbsp;
            {price ? price : "no price tag"}
          </h4>
        </div>
        <div className="productDetails__inline">
          <h4>rating:&nbsp;&nbsp;&nbsp; {rating ? rating : "unrated"}</h4>
        </div>
        <div className="productDetials__buynow">
          <button className="dashboard__Button">
            buy now
            <img src={cart} alt="cart" />
          </button>
        </div>
        <div className="productDetials__colorPalete">
          {product_colors?.map((color) => (
            <div
              key={color.hex_value + Math.random()}
              className="productDetials__color"
            >
              <div
                className="spot"
                style={{ backgroundColor: color.hex_value }}
              ></div>
              <p className="name">{color.colour_name}</p>
            </div>
          ))}
        </div>
        <div
          className="productDetails__description"
          dangerouslySetInnerHTML={createMarkup()}
        ></div>
        <div className="productDetials__tag">
          <strong>Tags</strong>
          <br />
          <ul>
            {tag_list?.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>
        <div className="productDetials__goback">
          <button
            className="dashboard__Button"
            onClick={() => {
              props.history.push("/makeup");
            }}
          >
            go back
            <img src={left} alt="left" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
