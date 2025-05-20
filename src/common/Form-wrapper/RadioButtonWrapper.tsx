import {
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import type { RadioGroupProps } from "@mui/material";
import { Controller } from "react-hook-form";
import type { FieldPath, FieldValues } from "react-hook-form";
import type { optionType } from "../../components/ExpenseTracker";
import type { FieldWrapperProps } from "./Types";

const RadioButtonWrapper = <
  TFieldValues extends FieldValues,
  Tname extends FieldPath<TFieldValues>
>(
  props: FieldWrapperProps<TFieldValues, Tname, optionType, RadioGroupProps>
) => {
  const { control, name, options, ...componentProps } = props;

  return (
    <Controller
      control={control}
      name={name}
      // rules={rules}
      {...componentProps}
      render={({ field: { onChange, value } }) => (
        <RadioGroup value={value} onChange={onChange}>
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      )}
    />
  );
};

export default RadioButtonWrapper;
