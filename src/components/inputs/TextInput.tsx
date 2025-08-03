import type { TextInputProps } from '../../types.ts';

function TextInput(props: TextInputProps) {
  return (
    <div className="mb-4 flex flex-row items-center">
      <label className="block text-sm font-medium text-1 mb-2">{ props.label ? props.label : props.name }:</label>
      <input
        name={ props.name }
        type="text"
        value={ props.value || '' }
        placeholder={ props.placeholder }
        required={ props.required }
        onChange={ (e) => {
          props.onChange(e.target)
        } }
        className="h-8 ml-2 w-full p-2 bg-3 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
      />
    </div>
  )
}

export default TextInput;