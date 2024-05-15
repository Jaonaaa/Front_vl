import React from "react";

const Row = ({ children, title = null, className = "" }) => {
  return (
    <div className={`row_form ${className}`}>
      {title && <div className="title_inputs"> {title}</div>}
      <div className="row_inputs">{children}</div>
    </div>
  );
};

export default Row;
