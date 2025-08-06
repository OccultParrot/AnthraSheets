import type { ToggleInputProps } from "../../types.ts";
import Toggle from "./Toggle.tsx"

function ToggleInput(props: ToggleInputProps) {
  return (
    <div className="mb-4 flex flex-row items-center justify-start">
      <label className="block text-sm font-medium text-light mb-2 mr-2">{ props.label ? props.label : props.name }</label>
      <Toggle checked={ props.value } onChange={ () => {
        props.onChange({ name: props.name, value: !props.value })
      } }/>
    </div>
  )
}

export default ToggleInput;