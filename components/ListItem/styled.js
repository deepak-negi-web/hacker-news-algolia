import styled from "styled-components";

export const StyledWrapper = styled.div`
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
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;
