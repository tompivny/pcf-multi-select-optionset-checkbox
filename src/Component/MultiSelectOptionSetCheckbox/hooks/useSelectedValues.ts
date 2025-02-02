import * as React from "react";
import type { OptionMetadataExt } from "../types";

// Custom hook to manage the state of selected values in a multi-select component
export const useSelectedValues = (
    initialValues: number[] = [], // Initial selected values
    options: OptionMetadataExt[], // Available options
    onChange?: (values: number[]) => void // Callback for when selections change
) => {
    // Maintain internal state of selected values
    const [selectedValues, setSelectedValues] = React.useState<number[]>(initialValues);

    // Sync internal state when initialValues prop changes
    React.useEffect(() => {
        setSelectedValues(initialValues);
    }, [initialValues]);

    // Memoized function to toggle a value's selected state
    const toggleValue = React.useCallback((optionValue: number) => {
        setSelectedValues(current => {
            const newValues = current.includes(optionValue)
                ? current.filter(value => value !== optionValue)
                : [...current, optionValue];
            
            onChange?.(newValues);
            return newValues;
        });
    }, [onChange]);

    return {
        selectedValues,
        toggleValue,
    };
};

