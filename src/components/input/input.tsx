import { useState } from "react";
import "./input.scss";

type InputProps = {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
};

export const Input = ({
  label,
  value = "",
  onChange,
  placeholder = "",
  type = "number",
  error,
}: InputProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`c-input-wrapper ${focused ? "is-focused" : ""} ${error ? "has-error" : ""}`}
    >
      {label && <label className="c-input__label">{label}</label>}
      <input
        className="c-input__field"
        type={type}
        value={value}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {error && <div className="c-input__error">{error}</div>}
    </div>
  );
};
