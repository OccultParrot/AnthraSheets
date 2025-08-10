import { Children, type MouseEvent } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import type {ModalProps} from "../../types.ts";

function Modal(props: ModalProps) {

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.isOpen = !props.isOpen;

    if (props.onClose) {
      props.onClose();
    }
  }

  return (
    <div className={props.isOpen ? "fixed inset-0 z-50 flex items-center justify-center" : "hidden"}>
      <div className="z-49 fixed top-0 right-0 h-full w-full bg-black opacity-50" />
      <button onClick={onClick} className="bg-dark text-light p-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg z-50 max-w-1/3">
        <div className="flex justify-between mb-4">
          <div className="text-lg font-bold">{props.title}</div>
          <div className="cursor-pointer ">
            <CloseIcon />
          </div>
        </div>
        <div>
          {
            Children.map(props.children, (child) => (
              <>
                {child}
              </>
            ))
          }
        </div>
      </button>
    </div>
)
}

export default Modal;