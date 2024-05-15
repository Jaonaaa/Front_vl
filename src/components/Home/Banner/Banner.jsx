import React from "react";
import People from "../../../assets/img/people.png";
import { LuArrowUpRight } from "react-icons/lu";
import "./Banner.sass";

const Banner = ({
  title = (
    <>
      Welcome back 🤞
      <br />
      Peter Parker
    </>
  ),
  subtitle = "If you are going to see a passage of Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  btn_text = <>Go check news</>,
  onClick = () => {},
  imgSrc = People,
  color_title = " #084d2c",
  color_subtitle = "#237f53",
  color_btn = " #48a377",
  color_bg = "#cff6e3",
}) => {
  return (
    <div
      className="banner_container"
      style={{ "--color-title": color_title, "--color-bg": color_bg, "--color-subtitle": color_subtitle, "--color-btn": color_btn }}
    >
      <div className="left">
        <div className="title"> {title}</div>
        <div className="subtitle"> {subtitle}</div>
        <div className="button_" onClick={onClick}>
          <button>
            {btn_text} <LuArrowUpRight />
          </button>
        </div>
      </div>
      <div className="right">
        <div className="picture">
          <img src={imgSrc} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
