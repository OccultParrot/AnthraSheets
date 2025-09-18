import CheckIcon from '@mui/icons-material/Check';
import type { ToggleProps } from "../../types.ts";

function Toggle(props: ToggleProps) {
  return (
    <button
      className={ `flex items-center bg-${ props.checked ? "medium" : "darker" }  border-medium border-2 rounded-md transition` }
      onClick={ () => props.onChange(!props.checked) }>
      <CheckIcon opacity={props.checked ? 100 : 0}/>
    </button>
  )
}

export default Toggle;