import { TFunction } from "react-i18next";
import { useHistory } from "react-router-dom";
export interface ContainerProps {
  border?: boolean;
  children: React.ReactNode;
}

const history = useHistory();

const handleButtonClick = () => {
  history.push('/scan'); 
};

export interface ButtonProps {
  color?: string;
  name?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export interface SvgIconProps {
  src: string;
  width: string;
  height: string;
}

export interface InputProps {
  name: string;
  placeholder: string;
  t: TFunction;
  type?: string;
  value?: string;
  onChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}
export interface validateProps {
  name: string;
  message: string;
  email: string;
}
