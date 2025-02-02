import * as React from "react";
import { Checkbox, Tooltip, FluentProvider } from "@fluentui/react-components";
import { useOptionSetMetadata, useSelectedValues } from "../hooks";
import type { ICheckboxProps, ModeExt } from "../types";

// Component that renders a group of checkboxes for a multi-select option set
export const CheckboxControl: React.FC<ICheckboxProps> =
  React.memo((props) => {
    // Extract props and set default values
    const { context, selectedValues: initialValues = [], onChange, isDisabled } = props;
    
    // Fetch option set metadata from the server and merge with current options
    const options = useOptionSetMetadata(context, context.mode as ModeExt);
    
    // Manage selected values state and handle changes
    const { selectedValues } = useSelectedValues(
        initialValues,
        options,
        onChange
    );

    // Determine how to handle options that have been removed from the option set
    const removedOptionsBehaviour = context.parameters.RemovedOptionsBehaviour.raw || "Hide";

    // Handler for when a checkbox is toggled
    const handleCheckboxChange = (optionValue: number) => {
      if (!onChange) return;

      const newSelectedValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((value) => value !== optionValue)
        : [...selectedValues, optionValue];

      onChange(newSelectedValues);
    };

    // Get theme and tooltip settings from context
    const theme = context.fluentDesignLanguage?.tokenTheme;
    const showTooltip = context.parameters.ShowTooltip.raw ?? false;
    const tooltipAppearance =
      context.parameters.TooltipAppearance.raw || "normal";

    return (
      <FluentProvider theme={theme}>
        {options.map((option) => {
          // Skip rendering if option is not available and behaviour is Hide
          if (!option.isAvailable && removedOptionsBehaviour === "Hide") {
            return null;
          }

          const checkbox = (
            <Checkbox
              key={option.Value}
              label={option.Label}
              checked={selectedValues.includes(option.Value)}
              onChange={() => handleCheckboxChange(option.Value)}
              disabled={isDisabled || (!option.isAvailable && removedOptionsBehaviour === "Disabled")}
            />
          );

          return showTooltip ? (
            <Tooltip
              key={option.Value}
              content={option.Description}
              relationship="description"
              positioning="below-start"
              appearance={
                tooltipAppearance.toLowerCase() as "normal" | "inverted"
              }
              withArrow
            >
              {checkbox}
            </Tooltip>
          ) : (
            checkbox
          );
        })}
      </FluentProvider>
    );
  });
