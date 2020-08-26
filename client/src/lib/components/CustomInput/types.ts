export interface CustomInputProps {
  placeholder: string;
  type: string;
  name: string;
  value?: string;
  label?: string;
  hasErrors?: boolean;
  errorMessage?: string | undefined;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  handleBlur?:
    | ((event: React.FocusEvent<HTMLInputElement>) => void)
    | undefined;
}
