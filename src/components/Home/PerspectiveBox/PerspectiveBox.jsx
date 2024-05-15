import React from "react";
import Box from "../../../utilsComponents/Box/Box";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { HiMiniArrowTrendingDown } from "react-icons/hi2";

import "./PerspectiveBox.sass";

const PerspectiveBox = ({ bubbleBg = "#9acbe4", title_box = "Unknown", value = "+99.9%", upper = true, valueBox = "15,500 $" }) => {
  return (
    <Box className="container_perspective_box">
      <div className="left">
        <div className="title_box"> {title_box} </div>
        <div className="description_state">
          <div className="icon">
            {upper ? <HiMiniArrowTrendingUp className="icon_" /> : <HiMiniArrowTrendingDown className="icon_" />}
          </div>
          <div className="value"> {value}</div>
        </div>
        <div className="value_box"> {valueBox}</div>
      </div>
      <div className="right" style={{ "--bubble-bg": bubbleBg }}>
        <div className="deco_bubble"></div>
        <div className="_pic_container"></div>
        <div className="border_glow"></div>
      </div>
    </Box>
  );
};

export default PerspectiveBox;
