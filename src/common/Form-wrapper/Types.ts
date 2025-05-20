import type { ControllerProps, FieldValues, FieldPath } from 'react-hook-form';

//Pick<type, keys>
//type -> 
//keys -> keys of type

export type FieldWrapperProps<
    TFieldValues extends FieldValues,
    Tname extends FieldPath<TFieldValues>,
    optionType,
    TComponent
> = Pick<ControllerProps<TFieldValues, Tname>, 'name'|'rules'|'control'> & {options:optionType[]} & TComponent