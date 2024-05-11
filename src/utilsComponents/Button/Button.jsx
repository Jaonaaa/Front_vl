import React from "react";
import Loader from "../Hider/Loader/Loader";
import "./Button.sass";

const Button = ({ icon = null, type = "submit", text = "", className = "", loading = false, onClick = () => {} }) => {
  return (
    <>
      <button className={`btn_p ${className}`} type={type} onClick={onClick}>
        {loading ? (
          <>
            <Loader white size="1.4rem" weigth="0.65rem" />
          </>
        ) : (
          <>
            {icon && <div className="icon"> {icon} </div>}
            <div className="text"> {text}</div>
          </>
        )}
      </button>
    </>
  );
};

export default Button;
