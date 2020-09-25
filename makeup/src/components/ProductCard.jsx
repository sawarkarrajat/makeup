import React from "react";
import "../sass/ProductCard.sass";
function ProductCard() {
  return (
    <div className="productCard__card">
      <div className="productCard__upperPart">
        <img
          src="http://s3.amazonaws.com/donovanbailey/products/api_featured_images/000/000/472/original/data?1514063327"
          alt="makeup"
        />
        <div className="productCard__info">
          <h3>rejuva minerals</h3>
          <p>Maybelline Face Studio Master Hi-Light Light Booster Blush</p>
        </div>
      </div>

      <div className="productCard__lowerPart">
        <p>
          <strong>category:</strong> powder
        </p>
        <p>$ 14.00</p>
        <p>
          rating: <strong>4.3</strong>
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
