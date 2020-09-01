import React, { FC } from "react";

interface Props {
  icon: string;
  onClick: () => void;
  alt: string;
  shadow?: boolean;
  inverted?: boolean;
  disabled?: boolean;
}
export const Icon: FC<Props> = ({
  icon,
  onClick,
  alt,
  shadow,
  disabled,
  inverted,
}) => {
  return (
    <div onClick={onClick} role="button">
      <img src={icon} alt={alt} />
    </div>
  );
};
