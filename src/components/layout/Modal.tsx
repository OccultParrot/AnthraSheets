import { Children, type MouseEvent, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import type { ModalProps } from "../../types.ts";

function Modal(props: ModalProps) {

  const [ isOpen, setIsOpen ] = useState(true);

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);

    if (props.onClose) {
      props.onClose();
    }
  }

  return (
    <div
      className={ `${ isOpen ? "fixed inset-0 z-50 flex items-center justify-center opacity-100" : "opacity-0 hidden" } transition-all` }>
      <div className="z-49 fixed top-0 right-0 h-full w-full bg-black opacity-50"/>
      <div
        className="bg-darker text-light p-4 fixed mx-2 sm:m-0 top-1/2 sm:left-1/2 transform sm:-translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg z-50 max-w-fit sm:max-w-3/4">
        <div className="flex justify-between mb-4">
          <div className="text-lg font-bold">{ props.title }</div>
          <button onClick={ onClick }
                  className="cursor-pointer p-2 rounded-lg bg-darker hover:bg-medium transition-all">
            <CloseIcon/>
          </button>
        </div>
        <div>
          {
            Children.map(props.children, (child) => (
              <>
                { child }
              </>
            ))
          }
        </div>
        {/* Button to close modal */ }
        <div className="flex justify-center mt-4">
          <button className="bg-medium hover:bg-lighter p-2 rounded-lg cursor-pointer transition-all"
                  onClick={ onClick }>Cool, Get off my screen
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal;