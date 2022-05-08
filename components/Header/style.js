import styled from "styled-components";

export const StyledHeader = styled.header`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: -2px;
  left: 0;
  z-index: 10;
  color: #fff;
  background: rgb(3, 37, 65);
  transition: top 0.2s linear;
  padding: 0.5rem;
  .title {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
  }
`;
