# PCF - Multi Select OptionSet Checkbox

[PCF](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/overview) (Custom front-end control for Dynamics 365 / Microsoft Power Apps) checkbox control for multi select attributes.

![control_image](https://i.imgur.com/2jrZC7E.png)

## Info sheet
- **Supported:** Only for **Model-Driven Apps**
- **Framework:** React (Virtual control), Fluent UI v9
- **Type**: Field (bound to a **MultiSelectOptionSet**)

## Features
- **Tooltip**: Shows tooltip with option description (or option label if description is empty)
- **Removed options**: Can be either hidden or shown as disabled

## Properties
| Property name | Required | Type | Description |
| -------- | -------- | -------- | -------- |
| MultiSelectOptionSetAttribute  | Yes | MultiSelectOptionSet | Bound attribute for Multi Select OptionSet |
| ShowTooltip  | Yes | TwoOptions | Select if you want to show the tooltip. Tooltip text is shown based on the option description. If the option description is empty, the option label is shown in the tooltip. |
| TooltipAppearance  | No | Enum | Select the appearance for the tooltip: Normal or Inverted (Default: Normal) |
| RemovedOptionsBehaviour  | Yes | Enum | Select the behaviour for the removed options: Hide or show as Disabled |

## Client API limitations
Custom controls bound to a MultiSelectOptionSet attribute do not support all of the client API methods triggered in a from context. For more details and a workaround, checkout my [blog article](https://www.tompivny.com/posts/multi-select-option-set-pcfs-and-client-scripts/).
