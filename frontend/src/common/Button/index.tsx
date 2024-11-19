import { StyledButton } from "./styles";
import { ButtonProps } from "../types";

export const Button = ({ color = "#fff", children, onClick }: ButtonProps) => (
  <StyledButton color={color} onClick={onClick}>
    {children}
  </StyledButton>
);
