import React from "react";
import "../sass/ProductCard.sass";
function ProductCard(props) {
  const {
    image_link,
    api_featured_image,
    brand,
    name,
    category,
    price,
    price_sign,
    product_colors,
    rating,
  } = props.product;
  return (
    <div className="productCard__card">
      <div className="productCard__upperPart">
        <div className="productCard__img">
          <img src={image_link || api_featured_image} alt={brand} />
        </div>
        <div className="productCard__info">
          <h3>{brand}</h3>
          <p className="productCard__pname">{name}</p>
        </div>
      </div>

      <div className="productCard__lowerPart">
        {category ? (
          <p>
            <strong>category:</strong> {category}
          </p>
        ) : null}
        {price ? (
          <p>
            <strong>{price_sign}</strong> {price}
          </p>
        ) : null}
        {rating ? (
          <p>
            rating: <strong>{rating}</strong>
          </p>
        ) : null}
        <div className="productCard__colorswatch">
          {product_colors?.map((color) => (
            <span
              key={color.hex_value + Math.random()}
              title={color.colour_name}
              style={{ backgroundColor: color.hex_value }}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
