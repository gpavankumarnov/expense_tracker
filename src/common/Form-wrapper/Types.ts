import { ControllerProps } from 'react-hook-form';
import { FieldValues } from './../../../node_modules/react-hook-form/dist/types/fields.d';
import { FieldPath } from './../../../node_modules/react-hook-form/dist/types/path/eager.d';

//Pick<type, keys>
//type -> 
//keys -> keys of type

export type FieldWrapperProps<
    TFieldValues extends FieldValues,
    Tname extends FieldPath<TFieldValues>,
    optionType,
    TComponent
> = Pick<ControllerProps<TFieldValues, Tname>, 'name'|'rules'|'control'> & {options:optionType[]} & TComponent