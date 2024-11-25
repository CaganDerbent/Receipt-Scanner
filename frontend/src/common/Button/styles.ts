import styled from "styled-components";

export const StyledButton = styled("button")<{ color?: string }>`
  background: ${(p) => p.color || "#0362fc"}; /* Default background mavi */
  color: ${(p) => (p.color ? "#0362fc" : "#fff")}; /* Default text beyaz */
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  border: 1px solid #0362fc; /* Default border mavi */
  border-radius: 4px;
  padding: 13px 0;
  cursor: pointer;
  margin-top: 0.625rem;
  max-width: 180px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 16px 30px rgb(23 31 114 / 20%);

  &:hover,
  &:active,
  &:focus {
    color: #0362fc;  /* Hoverda text mavi olacak */
    background-color: #fff;  /* Hoverda arkaplan beyaz olacak */
    border: 1px solid #fff;  /* Border mavi olacak */
  }
`;

export const StyledButton2 = styled("button")<{ color?: string }>`
  background: ${(p) => p.color || "#0362fc"}; /* Default background mavi */
  color: ${(p) => (p.color ? "#0362fc" : "#fff")}; /* Default text beyaz */
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  border: 1px solid #0362fc; /* Default border mavi */
  border-radius: 4px;
  padding: 13px 0;
  cursor: pointer;
  margin-top: 0.625rem;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 16px 30px rgb(23 31 114 / 20%);

  &:hover,
  &:active,
  &:focus {
    color: #0362fc;  /* Hoverda text mavi olacak */
    background-color: #fff;  /* Hoverda arkaplan beyaz olacak */
    border: 1px solid #fff;  /* Border mavi olacak */
  }
`;

export const StyledButton3 = styled("button")<{ color?: string }>`
  background: ${(p) => p.color || "red"}; /* Default background mavi */
  color: ${(p) => (p.color ? "red" : "#fff")}; /* Default text beyaz */
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  border: 1px solid red; /* Default border mavi */
  border-radius: 4px;
  padding: 13px 0;
  cursor: pointer;
  margin-top: 0.625rem;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 16px 30px rgb(23 31 114 / 20%);
  margin-left: 4px;
  margin-right: 4px;

  &:hover,
  &:active,
  &:focus {
    color: red;  /* Hoverda text mavi olacak */
    background-color: #fff;  /* Hoverda arkaplan beyaz olacak */
    border: 1px solid #fff;  /* Border mavi olacak */
  }
`;

export const StyledButton4 = styled("button")<{ color?: string }>`
  background: ${(p) => p.color || "green"}; /* Default background mavi */
  color: ${(p) => (p.color ? "green" : "#fff")}; /* Default text beyaz */
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  border: 1px solid green; /* Default border mavi */
  border-radius: 4px;
  padding: 13px 0;
  cursor: pointer;
  margin-top: 0.625rem;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 16px 30px rgb(23 31 114 / 20%);
    margin-left: 4px;
  margin-right: 4px;

  &:hover,
  &:active,
  &:focus {
    color: green;  /* Hoverda text mavi olacak */
    background-color: #fff;  /* Hoverda arkaplan beyaz olacak */
    border: 1px solid #fff;  /* Border mavi olacak */
  }
`;
export const StyledButton5 = styled("button")<{ color?: string }>`
  background: ${(p) => p.color || "black"}; /* Default background mavi */
  color: ${(p) => (p.color ? "black" : "#fff")}; /* Default text beyaz */
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  border: 1px solid black; /* Default border mavi */
  border-radius: 4px;
  padding: 13px 0;
  cursor: pointer;
  margin-top: 0.625rem;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 16px 30px rgb(23 31 114 / 20%);
    margin-left: 4px;
  margin-right: 4px;

  &:hover,
  &:active,
  &:focus {
    color: black;  /* Hoverda text mavi olacak */
    background-color: #fff;  /* Hoverda arkaplan beyaz olacak */
    border: 1px solid #fff;  /* Border mavi olacak */
  }
`;


