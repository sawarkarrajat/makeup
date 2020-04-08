import React from "react";
import "../sass/Collage.sass";
import pic1 from "../asset/pic1.png";
import pic2 from "../asset/pic2.png";
import pic3 from "../asset/pic3.png";
import pic4 from "../asset/pic4.png";

export default function Collage() {
  return (
    <div className="collage_Container">
      <img id="pic1" src={pic1} alt="Cinque Terre" width="180" height="120"></img>
      <img id="pic2" src={pic2} alt="Cinque Terre" width="150" height="100"></img>
      <img id="pic3" src={pic3} alt="Cinque Terre" width="160" height="107"></img>
      <img id="pic4" src={pic4} alt="Cinque Terre" width="175" height="116"></img>
    </div>
  );
}
