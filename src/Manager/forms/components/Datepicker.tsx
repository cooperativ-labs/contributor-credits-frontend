import cn from 'classnames';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import React from 'react';
import { ErrorMessage, useField, useFormikContext } from 'formik';

export interface InputProps {
  name: string;
  required?: boolean;
}

export interface CustomDatepickerProps extends InputProps {
  labelText?: string;
  className: string;
  fieldClass?: string;
  fieldLabelClass?: string;
  fieldHeight?: string;
  textArea?: boolean;
}

export const Datepicker: React.FC<CustomDatepickerProps> = ({
  labelText,
  name,
  required,
  className,
  fieldClass,
  fieldHeight,
  fieldLabelClass,
}) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);
  const MyContainer = ({ className, children }) => {
    return (
      <div style={{ padding: '16px', background: '#216ba5', color: '#fff' }}>
        <CalendarContainer className={className}>
          <div style={{ background: '#f0f0f0' }}>What is your favorite day?</div>
          <div style={{ position: 'relative' }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };

  return (
    <div className={cn(className, 'flex flex-col')}>
      {labelText && (
        <label
          htmlFor={name}
          className={cn(fieldLabelClass ? fieldLabelClass : 'text-sm text-blue-900 font-semibold text-opacity-80 ')}
        >
          {labelText}
          {required ? ' *' : ''}
        </label>
      )}
      <DatePicker
        {...field}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
        calendarContainer={MyContainer}
        className={cn(
          fieldClass
            ? fieldClass
            : 'text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none',
          fieldHeight
        )}
      />
      <ErrorMessage name={name} component="div" className="text-sm text-red-500" />
    </div>
  );
};

export default Datepicker;
