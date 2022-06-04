import cn from 'classnames';
import React from 'react';
import ReactSelect from 'react-select';
import { ErrorMessage, Field } from 'formik';

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    color: state.selectProps.menuColor,
    padding: 5,
  }),
  control: (_, { selectProps: { width, border } }) => ({
    width: width,
    border: border,
    borderRadius: 4,
    display: 'flex',
    padding: 4,
    marginTop: 2,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

interface SelectProps {
  name: string;
  required?: boolean;
}
interface CustomSelectProps extends SelectProps {
  labelText?: string;
  className: string;
  fieldLabelClass?: string;
}
interface SelectFieldProps extends CustomSelectProps {
  options: [{ value: any; label: string }];
  field;
  form: any;
}

const SelectField: React.FC<SelectFieldProps> = ({ options, form, field }) => {
  return (
    <ReactSelect
      options={options}
      name={field.name}
      className="text-sm"
      styles={customStyles}
      border="2px solid #E5E7EB"
      menuColor="black"
      value={options ? options.find((option) => option.value === field.value) : ''}
      onChange={(option) => form.setFieldValue(field.name, option.value)}
      onBlur={field.onBlur}
    />
  );
};

const ReactiveSelect: React.FC<any> = ({ options, name, className, labelText, fieldLabelClass, required }) => {
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
      <Field name={name} component={SelectField} options={options} required={required} />
      <ErrorMessage name={name} className="text-sm text-red-500" />
    </div>
  );
};

export default ReactiveSelect;
