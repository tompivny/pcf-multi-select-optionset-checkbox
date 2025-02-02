import { IInputs } from "../generated/ManifestTypes";

export interface ICheckboxProps {
  context: ComponentFramework.Context<IInputs>;
  selectedValues?: number[];
  onChange: (selectedValues: number[]) => void;
  isDisabled: boolean;
}

export interface OptionMetadataExt extends ComponentFramework.PropertyHelper.OptionMetadata {
  Description: string;
  isAvailable?: boolean;
}

export interface ModeExt extends ComponentFramework.Mode {
  contextInfo: {
    entityTypeName: string;
  };
}