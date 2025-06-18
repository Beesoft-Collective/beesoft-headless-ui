import type { HiddenFieldProps } from './hidden-field.props.ts';

const HiddenField = ({ id, name, value, type, checked, readOnly, onChange }: HiddenFieldProps) => {
  return (
    <input
      id={id}
      name={name}
      value={value}
      type={type}
      checked={checked}
      onChange={onChange}
      readOnly={readOnly}
      disabled={readOnly}
      className="bsh:appearance-none!"
    />
  );
};

export { HiddenField };
