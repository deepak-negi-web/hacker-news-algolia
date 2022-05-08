import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 16px;
  .MuiTreeItem-content.Mui-selected,
  .MuiTreeItem-content MuiTreeItem-content Mui-selected {
    background-color: #f5f5f5;
    &:hover {
      background-color: #f5f5f5;
    }
  }
`;
