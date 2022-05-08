import React from "react";
import { StyledHeader } from "./style";
import Link from "next/link";
export function Header() {
  return (
    <StyledHeader>
      <Link href="/">
        <h1 className="title">HackerNews</h1>
      </Link>
    </StyledHeader>
  );
}
