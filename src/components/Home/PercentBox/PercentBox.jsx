import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import "./PercentBox.sass";

const PercentBox = ({
  max = 0,
  value = 0,
  title = "Loremm ipsum deta opopp dsds",
  subtitle = "Progression",
  clientName = "",
  date = "2024-10-02",
  opositte = "",
  onClick = () => {},
}) => {
  return (
    <div className="percent_container">
      <div className="top">
        <div className="title">{title}</div>
        <div className="btn_params" onClick={onClick}>
          See details <IoIosArrowForward />
        </div>
      </div>

      <div className="center">
        <div className="value"> {getPercent(value, max)}</div>
        <div className="opposite"> {opositte}</div>
      </div>
      <div className="upper_bottom">
        <div className="text">
          {" "}
          {subtitle} <div className="date">{date}</div>
        </div>
        <div className="client_name"> {clientName}</div>
      </div>
      <div className="bar">
        <div className="progress_bar" style={{ width: getPercent(value, max) }}></div>+{" "}
      </div>
    </div>
  );
};

/**
 *
 * @param {Number} value
 * @param {Number} repere
 * @returns
 */

const getPercent = (value, repere) => {
  if (value == 0 && repere == 0) return 100 + "%";
  let percent = ((value * 100) / repere).toFixed(2);
  return (percent < 0 ? 0 : percent) + "%";
};

export default PercentBox;
