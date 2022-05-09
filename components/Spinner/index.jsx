import React from "react";
const Spinner = React.forwardRef((props, ref) => (
  <div ref={ref} className="lds-ellipsis">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
));
Spinner.displayName = "Spinner";

export { Spinner };
