import React, { useState, forwardRef } from "react";
import PropTypes from "prop-types";

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVis = { display: visible ? "none" : "" };
  const showWhenVis = { display: visible ? "" : "none" };

  const toggleVis = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVis}>
        <button onClick={toggleVis}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVis}>
        {props.children}
        <button onClick={toggleVis}>cancel</button>
      </div>
    </div>
  );
});

Toggleable.displayName = "Toggleable";

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Toggleable;
