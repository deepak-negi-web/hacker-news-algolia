import styled from "styled-components";

export const StyledWrapper = styled.div`
  min-height: 100px;
  min-width: 680px;
  width: 100%;
  padding: 8px;
  background: #f8f8f8;
  border-radius: 5px;
  margin-bottom: 1rem;
  .post__title {
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
      color: #00a8ff;
    }
  }
`;
