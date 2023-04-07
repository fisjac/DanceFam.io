import React, { useEffect, useRef, useState, useContext } from "react";
import ReactDom from 'react-dom';

import logo from '../../static/DanceFamBrushNoText.svg'


import './Modal.css'

export const ModalContext = React.createContext();

export function ModalProvider({children}) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(()=> {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div id='modal-ref' ref={modalRef}></div>
    </>
  )
}

export default function ModalWrapper(props) {
  const [showModal, setShowModal] = useState(false);
  const {form, children, stopProp, closePrev, bespokeClassName, newProps} = {...props}

  const handleClick = (stopProp, addClickFunc) => {
    return (e)=> {
      setShowModal(true);
      if (stopProp) {
        e.stopPropagation()
      }
      if (addClickFunc) addClickFunc();
    };
  };
  return (
    <>
    {React.cloneElement(
      children,
      { ...newProps,
        onClick: handleClick(stopProp, closePrev? props.closePrev: null),
        style: {'cursor': 'pointer'}
      },
      )}
      {showModal && <Modal {...props} setShowModal={setShowModal}>
        {React.cloneElement(form, props)}
      </Modal>}
    </>
  );
};


export function Modal (props) {
  const modalNode = useContext(ModalContext)
  if (!modalNode) return null;

  return ReactDom.createPortal(
    <div
      id="modal"
      >
      <div id="modal-background" onClick={()=>{
        props.setShowModal(false)}} />
        <div
          className="modal-container"
          id={props.bespokeClassName}>
          <div id='modal-header'>
            {props.showLogo && <img id='modal-logo' alt='logo' src={logo}/>}
            {props.header || 'New Modal'}
            <div
              id='modal-close-button'
              onClick={()=> {
                props.setShowModal(false)
              }}
              >
              <i className="fa-solid fa-x"></i>
            </div>

          </div>
          <div
            className='modal-content'
            id={props.bespokeClassName}
            >
            {React.cloneElement(props.children, {...props})}
          </div>
        </div>
    </div>,
    modalNode
  );
};
