import React from "react";
import { Wrapper } from "./styled";
import Image from "next/image";
export const Empty = ({
  title = "No results found",
  message = "No results match the filter criteria. Clear all filters and try again.",
  icon,
  clearFilterHandler,
}) => {
  return (
    <Wrapper>
      <Image
        src={icon || "/assets/empty-state.jpg"}
        width="480"
        height="380"
        alt="icon"
      />
      <h1 className="title">{title}</h1>
      <p className="message">{message}</p>
      <button onClick={clearFilterHandler}>Clear Filter</button>
    </Wrapper>
  );
};
