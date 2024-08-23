"use client";
import { type FC, useState, useRef, useEffect } from "react";
import { AiOutlineCheck, AiOutlineSearch } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa6";
import { motion } from "framer-motion";

export type SelectElementOption = {
  label: string;
  value: string;
};

export type SelectElementProps = {
  options: SelectElementOption[];
  selected: SelectElementOption | null;
  setSelected: (option: SelectElementOption | null) => void;
  placeholder: string;
};

const SelectElement: FC<SelectElementProps> = ({
  options,
  selected,
  setSelected,
  placeholder,
}) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [searchTerm, options]);

  return (
    <>
      <div
        className="group relative flex w-full items-center rounded-lg border border-secondary-800 bg-secondary-950 p-3 focus-within:outline-secondary-400"
        tabIndex={0}
        ref={selectRef}
      >
        <span className="flex-1">
          {selected ? selected.label : placeholder}
        </span>

        <FaChevronDown
          size={12}
          className="text-text-50 transition-transform group-focus-within:rotate-180"
        />

        <div className="absolute inset-0 top-[calc(100%_+_0.5rem)] z-10 hidden h-fit max-h-[25rem] w-full flex-col overflow-hidden overflow-y-auto rounded-lg border border-secondary-800 group-focus-within:flex group-focus:flex">
          <div className="flex items-center justify-between border-b border-secondary-800 bg-secondary-950 px-1 py-2">
            <input
              type="text"
              className="flex-1 bg-transparent p-2 py-1 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <AiOutlineSearch size={20} className="w-8 text-text-50" />
          </div>

          {filteredOptions.map((option, i) => (
            <div
              className={`unselectable flex cursor-pointer items-center justify-between border-secondary-800 bg-secondary-950 ${
                i !== filteredOptions.length - 1 && "border-b"
              } p-3 hover:bg-secondary-900`}
              key={i}
              onClick={() => {
                setSelected(option);
                selectRef.current?.blur();
              }}
            >
              <span className="unselectable">{option.label}</span>
              {option === selected && <AiOutlineCheck />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectElement;
