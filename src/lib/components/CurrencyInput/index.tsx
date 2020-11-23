import React, { FC, useState, useEffect, useRef } from "react";
import {
  StyledCurrencyInputField,
  StyledCurrencyInputContainer,
  StyledCurrencyInputLabel,
  StyledCurrencyInputError,
} from "./styled";

import {
  checkIsValidNumber,
  cleanValue,
  formatValue,
  padTrimValue,
} from "./utils/currency";

export type CurrencyInputProps = {
  allowDecimals?: boolean;
  id?: string;
  name: string;
  className?: string;
  decimalsLimit?: number;
  defaultValue?: number;
  disabled?: boolean;
  onChange?: (value: string | undefined, name?: string) => void;
  placeholder?: string;
  precision?: number;
  prefix?: string;
  maxLength?: number;
  hasErrors?: boolean;
  value?: string | number;
  label: string;
  errorMessage?: string;
  handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  register?: any;
};

export const CurrencyInput: FC<CurrencyInputProps> = ({
  allowDecimals = true,
  id,
  name,
  className,
  decimalsLimit = 2,
  defaultValue,
  disabled = false,
  value,
  onChange,
  placeholder,
  precision,
  hasErrors,
  prefix,
  maxLength,
  handleBlur,
  register,
  ...props
}: CurrencyInputProps) => {
  const _defaultValue = defaultValue
    ? formatValue(String(defaultValue), prefix)
    : formatValue("0", prefix);
  const [stateValue, setStateValue] = useState(_defaultValue);
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFocus = (): number => (stateValue ? stateValue.length : 0);

  const processChange = ({ target: { selectionStart, value } }: any): void => {
    const valueOnly = cleanValue(value, allowDecimals, decimalsLimit, prefix);

    if (!valueOnly) {
      onChange && onChange("0", name);
      return setStateValue("");
    }

    if (checkIsValidNumber(valueOnly)) {
      const formattedValue = formatValue(valueOnly, prefix);
      if (selectionStart) {
        const cursor =
          selectionStart + (formattedValue.length - value.length) || 1;
        setCursor(cursor);
      }
      setStateValue(formattedValue);
      //onChange && onChange(formattedValue);
    }

    onChange && onChange(valueOnly, name);
  };

  const handleOnBlur = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const valueOnly = cleanValue(value, allowDecimals, decimalsLimit, prefix);
    const newValue = padTrimValue(valueOnly, precision);
    const formattedValue = formatValue(newValue, prefix);
    setStateValue(formattedValue);
    onChange && onChange(newValue, name);
  };

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.setSelectionRange(cursor, cursor);
    }
  }, [cursor, inputRef, stateValue]);

  const formattedPropsValue = value
    ? formatValue(String(value), prefix)
    : undefined;

  return (
    <StyledCurrencyInputContainer>
      {props.label && (
        <StyledCurrencyInputLabel htmlFor={name}>
          {props.label}{" "}
        </StyledCurrencyInputLabel>
      )}
      <StyledCurrencyInputField
        type="text"
        inputMode="decimal"
        id={id}
        name={name}
        className={className}
        onChange={processChange}
        onBlur={handleOnBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        disabled={disabled}
        value={formattedPropsValue || stateValue}
        ref={register}
        maxLength={maxLength}
        hasErrors={hasErrors ? true : false}
        data-testid="CurrencyInput"
        {...props}
      />
      {hasErrors && (
        <StyledCurrencyInputError data-testid="InputError">
          {props.errorMessage}
        </StyledCurrencyInputError>
      )}
    </StyledCurrencyInputContainer>
  );
};

export default CurrencyInput;
