import React from "react";

const TextInput = ({ value, onChange }) => {
  return (
    <div className="relative">
      <div class="flex items-center border-b border-info py-2">
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="w-full bg-transparent border-none outline-none border-b-2 border-red-400 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default TextInput;
