import React from "react";
import "../sass/Panel.sass";
import Skeleton from "@material-ui/lab/Skeleton";

export default function LoadingSkeleton() {
	return (
		<div className="panel-body">
			<div className="product_image">
				<Skeleton variant="circle" height="156px" width="156px" />
			</div>
			<div className="panelTextContainer">
				<Skeleton animation="wave" />
				<Skeleton animation="wave" />
				<Skeleton animation="wave" />
				<Skeleton animation="wave" style={{ width: "50%" }} />
			</div>
			<div className="colour_section">
				<Skeleton
					variant="circle"
					height="20px"
					width="20px"
					style={{
						margin: "0 3px 3px 3px"
					}}
				/>
				<Skeleton
					variant="circle"
					height="20px"
					width="20px"
					style={{
						margin: "0 3px 3px 3px"
					}}
				/>
				
				<Skeleton
					variant="circle"
					height="20px"
					width="20px"
					style={{
						margin: "0 3px 3px 3px"
					}}
				/>
				
				<Skeleton
					variant="circle"
					height="20px"
					width="20px"
					style={{
						margin: "0 3px 3px 3px"
					}}
				/>
				
			</div>
		</div>
	);
}
