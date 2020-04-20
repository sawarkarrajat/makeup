import React from "react";
import "../sass/Panel.sass";
export default function Panel() {
	return (
		<div className="panel-body">
			<div className="product_image">
				<img
					className="panelImage"
					src="http://s3.amazonaws.com/donovanbailey/products/api_featured_images/000/001/035/original/open-uri20180630-4-n6wb0y?1530390383"
					alt="Open uri20180630 4 n6wb0y?1530390383"
				></img>
			</div>
			<div className="panelTextContainer">
				<h3>rejuva minerals</h3>
				<h4>Multi Purpose Powder - Blush &amp; Eye</h4>
				<p>
					<span className="bold">Category: </span>powder
				</p>
				<p>$0.00</p>
				<p></p>
			</div>
			<div className="colour_section">
				<div
					className="color"
					style={{
						backgroundColor: "#D7A7A3",
						height: "20px",
						margin: "0 3px 3px 3px",
					}}
				></div>
				<div
					className="color"
					style={{
						backgroundColor: "#E1BFC0",
						height: "20px",
						margin: "0 3px 3px 3px",
					}}
				></div>
				<div
					className="color"
					style={{
						backgroundColor: "#E6C3CB",
						height: "20px",
						margin: "0 3px 3px 3px",
					}}
				></div>
			</div>
		</div>
	);
}
