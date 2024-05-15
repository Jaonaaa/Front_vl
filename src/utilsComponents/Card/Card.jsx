import React from "react";
import Button from "../Button/Button";
import "./Card.sass";

const Card = ({ imgSrc = null, title, text = "", value = "", actions = [], className = "" }) => {
  return (
    <div className={`card_ ${className} ${actions.length > 0 ? "bigger" : ""}`}>
      <div className="img_card">
        <img src={imgSrc} />
      </div>
      <div className="card_details">
        <div className="top">
          <div className="title"> {title}</div>
          <div className="right_text"> {value}</div>
        </div>
        <div className="content">
          <p className="text"> {text}</p>
        </div>
        <div className="bottom">
          {actions.map((action, i) => (
            <Button {...action} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
