import cn from 'classnames';
import React from 'react';
import { ErrorMessage, Field } from 'formik';

export type CheckboxProps = {
  id?: any;
  name: string;
  required?: boolean;
  checked: boolean;
};
export type CustomCheckboxProps = CheckboxProps & {
  labelText?: string;
  className?: string;
  fieldClass?: string;
  fieldLabelClass?: string;
  sideLabel?: boolean;
};

const Checkbox: React.FC<CustomCheckboxProps> = ({
  labelText,
  id,
  name,
  required,
  checked,
  className,
  fieldClass,
  fieldLabelClass,
  sideLabel,
}) => {
  return (
    <div className={cn(className, [sideLabel ? 'flex flex-row-reverse justify-end items-center' : 'flex flex-col'])}>
      {labelText && (
        <label
          htmlFor={name}
          className={cn(
            fieldLabelClass ? fieldLabelClass : 'text-sm text-blue-900 font-semibold text-opacity-80',
            sideLabel && 'ml-2 mt-1'
          )}
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
      <ErrorMessage name={name} className="text-sm text-red-500" />
    </div>
  );
};

export default Checkbox;
