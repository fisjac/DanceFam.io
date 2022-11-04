import React, { useEffect, useRef, useState, useContext } from "react";
import ReactDom from 'react-dom';

import logo from '../static/DanceFamBrushNoText.svg'


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
  const handleClick = (stopProp, closePrev, addClickFunc) => {
    return (e)=> {
      if (stopProp) e.stopPropagation();
      setShowModal(true);
      if (closePrev) {
        closePrev(false)
      };
      if (addClickFunc) addClickFunc();
    };
  };

  const {form, children, newProps} = {...props}
  return (
    <>
    {React.cloneElement(
      props.children,
      { ...newProps,
        onClick: handleClick(props.stopProp, props.closePrev? props.closePrev: null),
        style: {'cursor': 'pointer'}
      },
      )}
      <Modal {...props} setShowModal={setShowModal} className={`${showModal ? '' : 'hidden' }`}>
        {React.cloneElement(props.form, props)}
      </Modal>
    </>
  );
};


export function Modal (props) {
  const modalNode = useContext(ModalContext)
  if (!modalNode) return null;

  return ReactDom.createPortal(
    <div id="modal" className={props.className}>
      <div id="modal-background" onClick={()=>{
        props.setShowModal(false)}} />
        <div id="modal-container">
          <div id='modal-header'>
            <img id='modal-logo' alt='logo' src={logo}/>
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
          <div id='modal-content'>
            {React.cloneElement(props.children, {...props})}
          </div>
        </div>
    </div>,
    modalNode
  );
};
