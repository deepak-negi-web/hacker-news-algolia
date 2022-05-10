import React from "react";
export const Spinner = React.forwardRef(function SpinnerComp(props, ref) {
  return (
    <div ref={ref} className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
});
