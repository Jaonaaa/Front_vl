import React from "react";
import { MdCheck } from "react-icons/md";
import "./Form.sass";
import Button from "../Button/Button";

const Form = ({
  children,
  title = "",
  subtitle = "",
  onSubmit = () => {},
  className = "",
  text_btn = "Validate",
  icon_btn = <MdCheck />,
  centered = false,
  loading = false,
}) => {
  return (
    <div className={`form_container ${className}`}>
      <div className={`header_form ${centered ? "center" : ""}`}>
        <div className="title"> {title}</div>
        <div className="subtitle"> {subtitle} </div>
      </div>
      <form onSubmit={onSubmit}>
        <div className="list_form">{children}</div>
        <Button text={text_btn} icon={icon_btn} className="btn_form" />
      </form>
    </div>
  );
};

export default Form;
