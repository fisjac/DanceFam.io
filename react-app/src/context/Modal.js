import React, { useEffect, useRef, useState, useContext } from "react";
import ReactDom from 'react-dom';

import logo from '../static/DanceFam_Brush_notext.svg'

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
      <div ref={modalRef}></div>
    </>
  )
}

export default function ModalWrapper(props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
    {React.cloneElement(
      props.children,
      {
        onClick: ()=> {
          if (props.clickEvent) {
          props.clickEvent()};
          setShowModal(true);
        },
        style: {'cursor': 'pointer'}
      },
      )}
    {showModal && (
      <Modal {...props} setShowModal={setShowModal} showModal={showModal}>
        {React.cloneElement(props.form, props)}
      </Modal>
    )}
    </>
  );
};


export function Modal (props) {
  const modalNode = useContext(ModalContext)
  if (!modalNode) return null;

  return ReactDom.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={()=>props.setShowModal(false)} />
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
              x
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
