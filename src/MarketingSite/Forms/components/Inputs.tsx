import cn from 'classnames';
import React from 'react';
import { ErrorMessage, Field } from 'formik';

export interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export interface MarketingInputProps extends InputProps {
  labelText: string;
  className: string;
  fieldClass?: string;
  fieldLabelClass?: string;
  textArea?: boolean;
}

export const MarketingInput: React.FC<MarketingInputProps> = ({
  labelText,
  name,
  type,
  textArea,
  placeholder,
  required,
  className,
  fieldClass,
  fieldLabelClass,
}) => {
  return (
    <div className={cn(className, 'flex flex-col')}>
      <label
        htmlFor={name}
        className={cn(fieldLabelClass ? fieldLabelClass : 'text-sm text-blue-900 font-semibold text-opacity-80 ')}
      >
        {labelText}
        {required ? ' *' : ''}
      </label>
      <Field
        as={textArea && 'textarea'}
        name={name}
        type={type}
        placeholder={placeholder}
        className={cn(
          fieldClass
            ? fieldClass
            : 'text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
        )}
        required={required}
      />
      <ErrorMessage name={name} component="div" className="text-sm text-red-500" />
    </div>
  );
};

export default MarketingInput;
