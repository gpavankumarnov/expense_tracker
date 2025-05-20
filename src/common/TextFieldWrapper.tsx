import { TextField, type TextFieldProps } from "@mui/material";
import { Controller, type FieldPath, type FieldValues } from "react-hook-form";
import { type FieldWrapperProps } from "./Form-wrapper/Types";

const TextFieldWrapper = <
  TFieldValues extends FieldValues,
  Tname extends FieldPath<TFieldValues>
>(
  props: FieldWrapperProps<TFieldValues, Tname, never, TextFieldProps>
) => {
  const { name, control, ...componentProps } = props;

  return (
    <Controller
      name={name}
      control={control}
      //   rules={rules}
      render={({ field: { onChange, value } }) => (
        <TextField
          {...componentProps}
          value={value}
          onChange={(...params) => {
            if (typeof componentProps.onChange === "function") {
              componentProps.onChange(...params);
            }
            onChange(...params);
          }}
        />
      )}
    />
  );
};

export default TextFieldWrapper;
