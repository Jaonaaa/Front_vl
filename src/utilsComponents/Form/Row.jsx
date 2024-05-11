import React from "react";

const Row = ({ children, title = null }) => {
  return (
    <div className="row_form">
      {title && <div className="title_inputs"> {title}</div>}
      <div className="row_inputs">{children}</div>
    </div>
  );
};

export default Row;
