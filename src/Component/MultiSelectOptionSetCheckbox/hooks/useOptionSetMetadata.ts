import * as React from "react";
import type { OptionMetadataExt, ModeExt } from "../types";
import type { IInputs } from "../generated/ManifestTypes";
import { WEB_API_BASE_URL } from "../utils";

// Custom hook to fetch and manage option set metadata from Dynamics 365
export const useOptionSetMetadata = (
  context: ComponentFramework.Context<IInputs>,
  mode: ModeExt
) => {
  // Store fetched options with availability and description information
  const [options, setOptions] = React.useState<OptionMetadataExt[]>([]);
  
  // Get current options from the PCF context
  const currentOptions = context.parameters.MultiSelectOptionSetAttribute.attributes?.Options ?? [];
  
  // Memoize the fetch promise to prevent unnecessary API calls
  const optionsPromise = React.useMemo(
    () => fetchOptionsMetadata(
      mode.contextInfo.entityTypeName,
      context.parameters.MultiSelectOptionSetAttribute.attributes?.LogicalName ?? "",
      currentOptions as OptionMetadataExt[]
    ),
    [currentOptions] // Add currentOptions as dependency
  );
  
  React.useEffect(() => {
    const fetchOptions = async () => {
      try {
        const result = await optionsPromise;
        setOptions(result);
      } catch (error) {
        console.error('Failed to fetch option set metadata:', error);
        setOptions([]);
      }
    };
    
    fetchOptions();
  }, [optionsPromise]);
  
  return options;
};

// Helper function to fetch option set metadata from Dataverse Web API
const fetchOptionsMetadata = async (
  entityName: string,
  boundFieldName: string,
  currentOptions: OptionMetadataExt[] = []
) => {
  // Construct URL to fetch option set metadata
  const optionSetQueryUrl = `${WEB_API_BASE_URL}EntityDefinitions(LogicalName='${entityName}')/Attributes/Microsoft.Dynamics.CRM.MultiSelectPicklistAttributeMetadata?$select=LogicalName&$filter=LogicalName eq '${boundFieldName}'&$expand=OptionSet`;
  const response = await fetch(optionSetQueryUrl);
  const data = await response.json();
  
  // Map API response to OptionMetadataExt format and merge with current options
  return data.value[0].OptionSet.Options.map((option: any) => {
    // Find matching option in current options to determine whether it's available
    const currentOption = currentOptions.find(
      (co: any) => co.Value === option.Value
    );
    
    return {
      Value: option.Value,
      Label: option.Label.UserLocalizedLabel.Label,
      Description:
        option.Description?.UserLocalizedLabel?.Label ||
        option.Label.UserLocalizedLabel.Label,
      isAvailable: Boolean(currentOption) // Set based on existence in currentOptions
    };
  });
};
