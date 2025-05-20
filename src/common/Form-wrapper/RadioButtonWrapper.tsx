import {
    FormControlLabel,
    Radio,
    RadioGroup,
    RadioGroupProps,
} from "@mui/material";
import { Controller, FieldPath, FieldValues } from "react-hook-form";
import { optionType } from "../../pages/ExpenseTracker";
import { FieldWrapperProps } from "./Types";

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
