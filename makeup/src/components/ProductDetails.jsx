import React from "react";
import "../sass/Dashboard.sass";
import "../sass/ProductDetails.sass";
import Navbar from "./Navbar";
import { Button } from "@material-ui/core";

/**
 * a component to display product details and opens in a new window
 *
 * @export
 * @param {Object} props
 * @returns {Component}
 */
export default function ProductDetails(props) {
	/**
	 * @type {const} item - holds all the information about the click product
	 */
	const item = props.location.state.itemInfo;
	/**
	 * @property {Function} -  opens product extradetail link in a new window
	 */
	const handleClick = () => {
		window.open(item.product_link, "_blank");
	};
	return (
		<div className="main">
			<Navbar />
			<div className="container">
				<div className="productsPane">
					<div className="imgcontainer">
						<img
							src={item.image_link}
							alt={item.name}
							style={{ maxHeight: "500px", maxWidth: "500px"}}
						/>
					</div>
					<div className="productinfo">
						<div className="textinline end">
							<Button
								variant="text"
								size="small"
								onClick={() => {
									props.history.goBack();
								}}
							>
								<u>Back</u>
							</Button>
						</div>
						<h2>{item.name}</h2>
						<div className="textinline start">
							<p>brand:</p>
							<h3 className="margined">{item.brand}</h3>
						</div>
						<div className="textinline start">
							<p>category:</p>&nbsp;
							<h4 style={{ marginLeft: "5px" }}>{item.category}</h4>
						</div>
						<div className="textinline start">
							<p>price:</p>&nbsp;
							<h4 className="margined">
								{item.price_sign}&nbsp;{item.price}&nbsp;{item.currency}
							</h4>
						</div>
						<div className="textinline" style={{ flexWrap: "nowrap" }}>
							<h5
								style={{
									alignSelf: "flex-start",
									marginTop: "6px",
									color: "#fc7fb2",
								}}
							>
								description:
							</h5>
							&nbsp;
							<p style={{ color: "#45454d" }}>{item.description}</p>
						</div>
						<div className="textinline end">
							<Button
								id="btn"
								variant="contained"
								size="small"
								onClick={handleClick}
							>
								Buy Now
							</Button>
						</div>
						<div className="textinline start">
							<p style={{ alignSelf: "flex-start" }}>available colors:</p>&nbsp;
							{item.product_colors.map((d) => (
								<div key={d.hex_value} className="colorc">
									{d.colour_name}
									<div
										className="col"
										style={{ backgroundColor: d.hex_value }}
									></div>
								</div>
							))}
						</div>

						<div className="textinline start">
							<p>tags:</p>
							{item.tag_list.map((t) => (
								<p key={t} style={{ color: "#45454d", marginLeft: "5px" }}>{t}</p>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
