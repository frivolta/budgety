export interface ButtonProps {
  handleClick?: (
    e: React.BaseSyntheticEvent<object, any, any>
  ) => Promise<void> | void;
  text?: string;
  icon?: string;
  disabled?: boolean;
  isLoading?: boolean;
  margin?: string;
}
