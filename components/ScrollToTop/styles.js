import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  background: rgb(3, 37, 65);
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  bottom: 2rem;
  right: 1rem;
  z-index: 10;
  width: 100px;
  height: 40px;
  cursor: pointer;
  border-radius: 50px;
  text-align: center;
  &:hover {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
    perspective: 1000px;
  }
  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }
    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-2px, 0, 0);
    }
    40%,
    60% {
      transform: translate3d(2px, 0, 0);
    }
  }
  .back_to_top__wrapper {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0.6rem;
    left: 0.6rem;
  }
  .back_to_top__link {
    margin-left: 4px;
    text-decoration: none;
    color: #fff;
    font-size: 12px;
    font-weight: 500;
  }

  @media screen and (min-width: 769px) {
    bottom: 2rem;
    right: 1rem;
  }
`;
