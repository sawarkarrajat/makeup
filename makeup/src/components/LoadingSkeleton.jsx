import React from "react";
import "../sass/LoadingSkeleton.sass";
import Skeleton from "@material-ui/lab/Skeleton";
/**
 *@property {Function} - a loading skeleton
 *@returns {htmlComponent} - a card with loading skeleton of material ui
 */
export default function LoadingSkeleton() {
  const mar = {
    margin: "0 3px 3px 3px",
  };
  return (
    <div className="panel-body-skeleton">
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
        <Skeleton variant="circle" height="20px" width="20px" style={mar} />
        <Skeleton variant="circle" height="20px" width="20px" style={mar} />

        <Skeleton variant="circle" height="20px" width="20px" style={mar} />

        <Skeleton variant="circle" height="20px" width="20px" style={mar} />
      </div>
    </div>
  );
}
