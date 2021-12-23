import cn from 'classnames';
import React from 'react';
import { ErrorMessage, Field } from 'formik';

export interface CheckboxProps {
  id?: any;
  name: string;
  required?: boolean;
  checked: boolean;
}
export interface CustomCheckboxProps extends CheckboxProps {
  labelText?: string;
  className: string;
  fieldClass?: string;
  fieldLabelClass?: string;
}

const Checkbox: React.FC<CustomCheckboxProps> = ({
  labelText,
  id,
  name,
  required,
  checked,
  className,
  fieldClass,
  fieldLabelClass,
}) => {
  return (
    <div className={cn(className, 'flex flex-col')}>
      {labelText && (
        <label
          htmlFor={name}
          className={cn(fieldLabelClass ? fieldLabelClass : 'text-sm text-blue-900 font-semibold text-opacity-80')}
        >
          {labelText}
          {required ? ' *' : ''}
        </label>
      )}
      <Field
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        className={cn(
          fieldClass
            ? fieldClass
            : 'text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 mt-3 focus:outline-none'
        )}
        required={required}
      />
      <ErrorMessage name={name} component="div" className="text-sm text-red-500" />
    </div>
  );
};

export default Checkbox;
