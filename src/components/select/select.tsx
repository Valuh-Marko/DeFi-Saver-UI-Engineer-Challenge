import { useEffect, useRef, useState } from "react";
import arrowImg from "@assets/arrow.svg";
import { motion } from "motion/react";
import "./select.scss";
import { expandDown, optionVariant } from "./animations";

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  label: string;
  value: string | null;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
};

export const Select = ({
  label,
  value,
  onChange,
  options,
  placeholder = "All",
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onClick={() => setOpen((prev) => !prev)}
      className="c-select"
    >
      <div className="c-select__label">{label}</div>
      <div className="c-select__value">
        {selectedOption?.label || placeholder}
      </div>
      <img
        src={arrowImg}
        alt="Toggle"
        className={`c-select__arrow ${open ? "is-open" : ""}`}
      />

      <motion.div
        className="c-select__menu"
        initial={"hide"}
        variants={expandDown}
        animate={open ? "show" : "hide"}
      >
        {options.map((option) => (
          <motion.div
            variants={optionVariant}
            key={option.value}
            className={`c-select__option ${value === option.value ? "is-selected" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onChange(option.value);
              setOpen(false);
            }}
          >
            {option.label}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
