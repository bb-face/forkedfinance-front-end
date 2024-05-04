import React from "react";

const TextInput = ({ value, onChange }) => {
  return (
    <div className="relative">
      <div className="flex items-center border-b border-input-outline py-2">
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="w-full bg-transparent border-none outline-none"
        />
      </div>
    </div>
  );
};

export default TextInput;
