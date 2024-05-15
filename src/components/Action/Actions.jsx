import React, { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi2";
import { BsSendPlusFill } from "react-icons/bs";
import { FaTrashCanArrowUp } from "react-icons/fa6";
import "./Actions.sass";

const Actions = ({
  className = "",
  actions = [
    { icon: <BsSendPlusFill />, text: "Test add", onClick: () => {} },
    { icon: <FaTrashCanArrowUp />, text: "Delete", onClick: () => {} },
  ],
  text = null,
  icon = null,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div
      className={`actions_float_containers ${className} ${text ? "flex" : ""}`}
      tabIndex={0}
      onFocus={() => {
        console.log("focused");
      }}
      onBlur={handleOpen}
    >
      <div className="container_sub">
        {actions.map((action, i) => (
          <div
            className={`bubble ${!open ? "hidden" : ""}`}
            key={i}
            onClick={action.onClick ? action.onClick : () => {}}
            style={{
              transform: open ? `translateY(-${(i + 1) * 120}%)` : "none",
              "--y": `-${(i + 1) * 120}%`,
            }}
          >
            {action.icon && <div className="icon"> {action.icon}</div>}
            {action.text && <div className={`text ${action.icon ? "full" : ""}`}>{action.text}</div>}
          </div>
        ))}
        <div className={`bubble_content`} onClick={handleOpen}>
          <div className="text">
            {text ? (
              text
            ) : icon ? (
              <div className={`rotate ${open ? "rotated" : ""}`}>{icon}</div>
            ) : (
              <div className={`rotate ${open ? "rotated" : ""}`}>
                <HiOutlinePlus />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actions;
