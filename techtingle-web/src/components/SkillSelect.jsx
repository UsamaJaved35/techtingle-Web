import React, { useState, useCallback, useMemo } from "react";
import axios from "axios";
import Select from "react-select";
import debounce from "lodash.debounce"; // Import lodash.debounce for debouncing

const SkillSelect = React.memo(({ field, form, prefilledSkills }) => {
  const [options, setOptions] = useState([
    ...prefilledSkills.map((skill) => ({ label: skill, value: skill })),
  ]);

  // Fetch skills with debouncing
  const fetchSkills = useCallback(
    debounce(async (inputValue) => {
      if (!inputValue || typeof inputValue !== "string") return;

      try {
        const response = await axios.get(
          `https://api.apilayer.com/skills?q=${inputValue}`,
          {
            headers: {
              apikey: "lpmysAFvXtFM4R2HxnJ0PkqLZLCqjlSD",
            },
          }
        );

        // Map the response to react-select option format
        const newSkills = (response.data || []).map((skill) => ({
          label: skill,
          value: skill,
        }));

        setOptions((prevOptions) => {
          const existingValues = new Set(prevOptions.map((opt) => opt.value));
          const mergedOptions = [
            ...prevOptions,
            ...newSkills.filter((skill) => !existingValues.has(skill.value)),
          ];
          return mergedOptions;
        });
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    }, 300), // Debounce with 300ms delay
    []
  );

  const handleInputChange = (inputValue) => {
    // Only fetch skills if inputValue is a non-empty string
    if (typeof inputValue === "string") {
      fetchSkills(inputValue);
    }
  };

  const handleSelectChange = (selectedOptions) => {
    form.setFieldValue(
      field.name,
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };
  const selectedSkills = Array.isArray(field.value)
    ? field.value
        .map((val) => options.find((opt) => opt.value === val))
        .filter(Boolean)
    : [];
  return useMemo(
    () => (
      <div className="p-4 w-full max-w-md">
        <Select
          isMulti
          // value={
          //   Array.isArray(field.value)
          //     ? field.value.map((val) => options.find((opt) => opt.value === val))
          //     : []
          // }
          value={selectedSkills}
          options={options}
          onInputChange={handleInputChange} // Pass our debounced input change handler
          onChange={handleSelectChange}
          className="bg-base-200"
          placeholder="Search skills"
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "inherit", // Remove white background
              border: "none",
              boxShadow: "none",
              minHeight: "40px",
            }),
            input: (base) => ({
              ...base,
              color: "white",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "#1f2937",
              borderRadius: "0.375rem", // Tailwind `rounded-md`
              padding: "0.5rem",
              color: "white",
            }),
            menuList: (base) => ({
              ...base,
              padding: 0,
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isSelected ? "#4b5563" : "#1f2937", // Tailwind `bg-gray-700` and `bg-gray-800`
              color: state.isSelected ? "#fff" : "#d1d5db", // Tailwind `text-white` and `text-gray-300`
              // padding: "0.5rem 1rem",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#374151", // Tailwind `hover:bg-gray-700`
              },
            }),
          }}
        />
      </div>
    ),
    [options, field.value, handleInputChange, handleSelectChange]
  );
});

export default SkillSelect;
