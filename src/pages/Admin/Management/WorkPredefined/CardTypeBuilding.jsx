import React from "react";
import HouseImage from "../../../../assets/img/house.png";
import "./CardTypeBuilding.sass";
import { formatNumber } from "../../../../utils/Format";

const CardTypeBuilding = ({
  id,
  label,
  duration = 0,
  childDescriptions = [{ description: "Jolie" }],
  className = "",
  index,
  surface = 0,
  price = "Not price yet",
  onClick = () => {},
}) => {
  return (
    <div
      className={`card_type_container ${className}`}
      onClick={() => {
        onClick(index);
      }}
    >
      <div className="title"> {label} </div>
      <div className="img">
        <img src={HouseImage} alt="" />
      </div>
      <div className="row_label">
        <div className="label"> {formatNumber(+price)} Ar </div>
        <div className="row_little">
          <div className="label_time"> {duration} days</div>
        </div>
      </div>

      <div className="row_label surface">
        <div className="row_little">
          <div className="label_time"> {formatNumber(+surface)} m2 </div>
        </div>
      </div>

      <div className="list">
        {childDescriptions.map((child, i) => (
          <div className="row" key={i}>
            <div className="label"> {child.description} </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardTypeBuilding;
