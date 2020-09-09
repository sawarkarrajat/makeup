import React from "react";
import "../sass/Panel.sass";
import uniqid from "uniqid";

/**
 * a simple component to render cards for product
 *
 * @export
 * @param {Object} props
 * @returns {htmlbody}
 */
export default function Panel(props) {
	/**
	 * @property {Function} - used to handle click on cards
	 */
	const handleClick = () => {
		props.clicked(props.info);
	}
	return (
		<div className="panel-body" onClick={handleClick}>
			<div className="product_image">
				<img
					className="panelImage"
					src={props.info.api_featured_image}
					alt=" product"
				></img>
			</div>
			<div className="panelTextContainer">
				<h3>{props.info.brand}</h3>
				<h4>{props.info.name}</h4>
				<p>
					<span className="bold">Category: </span>
					{props.info.category}
				</p>
				<p>
					{props.info.price_sign} &nbsp; {props.info.price}
				</p>
				<p></p>
			</div>
			<div className="colour_section">
				{props.info.product_colors.map((color) => (
          <div
            key={uniqid()}
						className="color"
						style={{
              backgroundColor: color.hex_value
						}}
					></div>
				))}
			</div>
		</div>
	);
}
