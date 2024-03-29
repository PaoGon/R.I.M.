import { FC } from "react";
import { input } from "./models";
import "./style.css";

const InputField: FC<input> = ({
  readonly,
  id,
  label,
  type,
  placeholder,
  auto,
  name,
  forinput,
  required,
  onClick,
  value,
  checked,
  getData,
}) => {
  return (
    <>
      <label htmlFor={forinput}>{label}</label>
      <input
        data-testid={id}
        readOnly={readonly}
        id={id}
        type={type}
        placeholder={placeholder}
        autoFocus={auto}
        onClick={onClick}
        value={value}
        name={name}
        required={required}
        checked={checked}
        onChange={getData}
      />
    </>
  );
};

export default InputField;
