import type { ListInputProps } from "../../types.ts";
import type { ChangeEvent } from "react";

function ListInput(props: ListInputProps) {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const items = value.split(',').map(item => item.trim()).filter(item => item !== '');

    if (props.maxItems && items.length > props.maxItems) {
      alert(`You can only enter up to ${ props.maxItems } items.`);
      return;
    }
    
    if (props.onChange) {
      props.onChange({ name, value: items });
    }
  }

  return (
    <div className="mb-4 flex flex-row items-center">
      <label className="block text-sm font-medium text-1 mb-2">{ props.label ? props.label : props.name }:</label>
      <input
        name={ props.name }
        type="text"
        required={ props.required }
        placeholder="Seperate items with commas"
        onChange={ onChange }
        className="h-8 ml-2 w-full p-2 bg-3 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
      />
    </div>
  )
}

export default ListInput;