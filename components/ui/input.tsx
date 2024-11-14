import React, { ChangeEvent, ReactNode } from 'react';

export const Input: React.FC<InputProps> = ({
  name,
  children,
  type,
  value,
  handleChange,
  typeSpan,
  disabled = false,
}) => {
  return (
    <div className="input-container">
      <input
        name={name}
        type={type}
        autoComplete="off"
        value={value}
        placeholder=" "
        onChange={handleChange}
        disabled={disabled}
        required
        className="styled-input"
      />
      <span className="input-label">{typeSpan}</span>
      {children}
    </div>

  );
};

interface InputProps {
  name: string;
  children: ReactNode;
  type: string;
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  typeSpan: string;
  disabled?: boolean;
}
