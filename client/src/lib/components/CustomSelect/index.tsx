import { Select } from "react-functional-select";
import React, { useState, useCallback } from "react";
import { StyledSelectContainer } from "./styled";
import {
  CustomSelectTheme,
  StyledSelectLabel,
} from "./helpers/select-theme-config";

type CityOption = {
  readonly id: number;
  readonly city: string;
  readonly state: string;
};

const _cityOptions: CityOption[] = [
  { id: 1, city: "Austin", state: "TX" },
  { id: 2, city: "Denver", state: "CO" },
  { id: 3, city: "Chicago", state: "IL" },
  { id: 4, city: "Phoenix", state: "AZ" },
  { id: 5, city: "Houston", state: "TX" },
];

export const CustomSelect: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<CityOption | null>(null);

  const getOptionValue = useCallback(
    (option: CityOption): number => option.id,
    []
  );
  const onOptionChange = useCallback(
    (option: CityOption | null): void => setSelectedOption(option),
    []
  );
  const getOptionLabel = useCallback(
    (option: CityOption): string => `${option.city}, ${option.state}`,
    []
  );

  return (
    <StyledSelectContainer>
      <StyledSelectLabel>Label</StyledSelectLabel>
      <Select
        isInvalid={false}
        options={_cityOptions}
        isDisabled={false}
        isSearchable={false}
        isClearable={false}
        onOptionChange={onOptionChange}
        getOptionValue={getOptionValue}
        getOptionLabel={getOptionLabel}
        themeConfig={CustomSelectTheme}
      />
    </StyledSelectContainer>
  );
};
