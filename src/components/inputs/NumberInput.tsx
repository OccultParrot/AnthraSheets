import type { NumberInputProps } from "../../types.ts";

function NumberInput(props: NumberInputProps) {
  return (
    <div className="mb-4 flex flex-row items-center">
      <label className="block text-sm font-medium text-1 mb-2">{ props.label ? props.label : props.name }:</label>
      <input
        name={ props.name }
        type="number"
        value={ props.value || 0 }
        min={ props.min }
        max={ props.max }
        step={ props.step }
        required={ props.required }
        placeholder="Enter a number"
        onChange={ (e) => {
          const value = e.target.value ? parseFloat(e.target.value) : 0;
          props.onChange({ name: props.name, value });
        } }
        className="h-8 ml-2 w-full p-2 bg-3 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
      />
    </div>
  );
}

export default NumberInput;
