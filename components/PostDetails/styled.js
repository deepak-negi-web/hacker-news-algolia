import styled from "styled-components";

export const StyledWrapper = styled.div`
  padding: 0 16px;
  .heading__title {
    display: flex;
    align-items: center;
    h1 {
      margin: 8px 0;
    }
  }
  svg {
    margin-left: 8px;
    &:hover {
      cursor: pointer;
      color: #00a8ff;
    }
  }
`;
