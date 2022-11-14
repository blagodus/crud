import React from 'react'
import {TextField, TextFieldProps} from '@mui/material'
import {Controller, useFormContext} from 'react-hook-form'

type FormInputProps = TextFieldProps & {
    name: string;
}

const FormInput = ({ name, ...otherProps }: FormInputProps) => {
    const {
        control,
        formState: { errors },
    } = useFormContext()

    return (
        <Controller control={control} name={name} defaultValue="" render={({ field })=> (
            <TextField
                {...otherProps}
                {...field}
                error={!!errors[name]}
                helperText={errors[name] ? errors[name]?.message as string : ''}
            />
        )} />
    )
}

export default FormInput
