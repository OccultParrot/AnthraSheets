import type { ListInputProps } from "../../types.ts";
import type { ChangeEvent } from "react";
import { useState, useEffect } from "react";

function ListInput(props: ListInputProps) {
  const [ inputValue, setInputValue ] = useState('');

  // Update input value when props.value changes (e.g., from import)
  useEffect(() => {
    if (Array.isArray(props.value)) {
      setInputValue(props.value.join(', '));
    }
  }, [ props.value ]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  }

  const onBlur = () => {
    const { name } = props;
    const items = inputValue.split(',').map(item => item.trim()).filter(item => item !== '');

    if (props.maxItems && items.length > props.maxItems) {
      alert(`You can only enter up to ${ props.maxItems } items.`);
      return;
    }

    // Update parent state on blur
    if (props.onChange) {
      props.onChange({ name, value: items });
    }

    // Clean up display
    setInputValue(items.join(', '));
  }

  return (
    <div className="mb-4 flex flex-row items-center">
      <label className="block text-sm font-medium text-1 mb-2">{ props.label ? props.label : props.name }:</label>
      <input
        name={ props.name }
        type="text"
        value={ inputValue }
        required={ props.required }
        placeholder="Seperate items with commas"
        onChange={ onChange }
        onBlur={ onBlur }
        className="h-8 ml-2 w-full p-2 bg-3 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
      />
    </div>
  )
}

export default ListInput;