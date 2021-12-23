import checkPropTypes from 'check-prop-types';

/**
 * Return node(s) with thte given data-test attribute
 * @param {ShallowWrapper} wrapper - Enzyme Shallow Wrapper
 * @param {string} val - Value of data-test attribute for search
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, value) => {
  return wrapper.find(`[data-test='${value}']`);
};

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(component.propTypes, conformingProps, 'prop', component.name);
  expect(propError).toBeUndefined();
};
