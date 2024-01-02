import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const SelectFilter = ({theme, filterHeading, options, placeholder, onChange }) => {
  const colourStyles = {
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "#2e2e38",
      transform: state.selectProps.menuIsOpen && "rotate(180deg)",
      transition: "transform 0.3s ease-in-out",
    }),
    menu: (styles) => ({
      ...styles,
      borderRadius: "0",
      borderTop: "1px solid transparent",
      marginTop: "auto",
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: "#c4c4cd",
      borderRadius: "0",
      border: "none",
      boxShadow: "none",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? "#c4c4cd"
          : isFocused
          ? "#c4c4cd"
          : undefined,
        color: isDisabled ? "#ccc" : isSelected ? "#2e2e38" : "#2e2e38",
        cursor: isDisabled ? "not-allowed" : "pointer",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? "#c4c4cd"
              : "#ffffff"
            : undefined,
        },
      };
    },
    // input: (styles) => ({ ...styles, ...dot() }),
    // placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
    // singleValue: (styles, { data }) => ({ ...styles, ...dot('yellow') }),
  };

  const animatedComponents = makeAnimated();

  return (
    <div className="fsot__select-filter-cont" style={theme === 'light' ? { backgroundColor: '#ffffff'} : theme === 'dark' ? { backgroundColor: '#2e2e38'}: {backgroundColor: 'transparent'} } >
      <h4 className="fsot__select-filter-heading" style={theme === 'light' ? { color: '#2e2e38'} : theme === 'dark' ? { color: '#ffffff'}: {color: '#2e2e38'} }>{filterHeading}</h4>
      <Select
        styles={colourStyles}
        className="fsot__select-filter-select rotate-arrow"
        classNamePrefix="react-select"
        closeMenuOnSelect={true}
        placeholder={placeholder}
        menuPosition="fixed"
        components={animatedComponents}
        //   defaultValue={options[0]}
        isMulti
        options={options}
        onChange={onChange}
      />
    </div>
  );
};

export default SelectFilter;
