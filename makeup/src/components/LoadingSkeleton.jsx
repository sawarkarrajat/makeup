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
    <div className="container">
      <section>
        <h1 id="loadingText">Loading...</h1>
      </section>
      <section className="containersec">
        {Array(12)
          .fill()
          .map((_, i) => (
            <div key={i + 27852} className="panel-body-skeleton">
              <div className="product_image">
                <Skeleton
                  id="skImage"
                  variant="rect"
                  height="80px"
                  width="100px"
                />
                <div className="panelTextContainer">
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" style={{ width: "50%" }} />
                </div>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}
