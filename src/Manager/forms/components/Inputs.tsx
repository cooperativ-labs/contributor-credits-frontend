import cn from 'classnames';
import React from 'react';
import { ErrorMessage, Field } from 'formik';

export const defaultFieldLabelClass = 'text-sm text-blue-900 font-semibold text-opacity-80';
export const defaultFieldDiv = 'pt-3 bg-opacity-0';

export interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  onBlur?: any;
}

export interface CustomInputProps extends InputProps {
  labelText?: string;
  className: string;
  fieldClass?: string;
  fieldLabelClass?: string;
  fieldHeight?: string;
  textArea?: boolean;
}

export const Input: React.FC<CustomInputProps> = ({
  labelText,
  name,
  type,
  textArea,
  placeholder,
  required,
  className,
  fieldClass,
  fieldHeight,
  fieldLabelClass,
  onBlur,
}) => {
  return (
    <div className={cn(className, 'flex flex-col')}>
      {labelText && (
        <label htmlFor={name} className={cn(fieldLabelClass ? fieldLabelClass : defaultFieldLabelClass)}>
          {labelText}
          {required ? ' *' : ''}
        </label>
      )}
      <Field
        as={textArea && 'textarea'}
        name={name}
        type={type}
        placeholder={placeholder}
        className={cn(
          fieldClass
            ? fieldClass
            : 'text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none',
          fieldHeight
        )}
        required={required}
        onBlur={onBlur}
        onWheel={(e) => type === 'number' && e.target.blur()}
      />
      <ErrorMessage name={name} className="text-sm text-red-500" />
    </div>
  );
};

export default Input;
